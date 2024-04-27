const Order = require("../models/order");

exports.placeOrder = (req, res) => {
  const _order = new Order({
    user: req.user._id,
    orderID: `${Math.floor(100000 + Math.random() * 900000)}`,
    orderTotal: req.body.orderTotal,
    orderItems: req.body.orderItems,
  });
  _order.save((error, order) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (order) {
      return res.status(201).json({ msg: "Order Placed!", order });
    }
  });
};

exports.getOrder = (req, res) => {
  Order.find({ user: req.user._id }).exec((error, orders) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (orders) {
      return res.status(200).json({ orders });
    }
  });
};

exports.getAllOrder = (req, res) => {
  Order.find().exec((error, orders) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (orders) {
      return res.status(200).json({ orders });
    }
  });
};

exports.updateOrder = (req, res) => {
  console.log(req.body);
  Order.findOneAndUpdate(
    { _id: req.body._id },
    { orderStatus: req.body.orderStatus },
    { new: true }
  ).exec((error, order) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (order) {
      return res.status(202).json({ msg: "Order Updated", order });
    }
  });
};
