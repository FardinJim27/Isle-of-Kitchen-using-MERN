const Cart = require("../models/cart");

exports.addToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) {
      return res.status(404).json({ msg: "Something Went Wrong!", error });
    }
    if (cart) {
      const item_id = req.body.cartItems.item;
      const item = cart.cartItems.find((c) => c.item === item_id);
      let condition, updated;
      if (item) {
        condition = {
          user: req.user._id,
          "cartItems.item": item_id,
        };
        updated = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              qty: item.qty + +req.body.cartItems.qty,
            },
          },
        };
      } else {
        condition = { user: req.user._id };
        updated = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };
      }
      Cart.findOneAndUpdate(condition, updated, { new: true }).exec(
        (err, cart) => {
          if (err) {
            return res.status(400).json({ msg: "Something Went Wrong!", err });
          }
          if (cart) {
            return res
              .status(201)
              .json({ msg: "Your Cart Has Been Updated!", cart });
          }
        }
      );
    } else {
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });

      cart.save((error, cart) => {
        if (error)
          return res.status(400).json({ error, msg: "Something Went Wrong!" });
        if (cart) {
          return res
            .status(201)
            .json({ cart, msg: "Item Added To Your Cart!" });
        }
      });
    }
  });
};

exports.getCartItems = async (req, res) => {
  await Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (cart) {
      return res.status(200).json({ cartItems: cart.cartItems });
    }
  });
};

exports.removeCart = async (req, res) => {
  await Cart.updateOne(
    { user: req.user._id },
    {
      $pull: {
        cartItems: {
          _id: req.body._id,
        },
      },
    },
    { new: true }
  ).exec((error, result) => {
    if (error) return res.status(400).json({ error });
    if (result) {
      res.status(202).json({ result });
    }
  });
};
