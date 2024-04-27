const Kitchen = require("../models/kitchen");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1y",
  });
};

exports.kitchenSignUp = (req, res) => {
  console.log(req.body, req.file);
  Kitchen.findOne({ email: req.body.email }).exec(async (error, kitchen) => {
    if (error) {
      return res.status(400).json({ msg: "Bad Request!", error });
    }
    if (kitchen) {
      return res.status(409).json({
        msg: "Email Already In Use. Please Use Another Email To Continue.",
      });
    } else {
      const {
        kitchen_name,
        owner_name,
        email,
        phone,
        password,
        kitchen_address,
      } = req.body;
      let img = {};

      if (req.file) {
        img = req.file.location;
      }
      const hash_password = await bcrypt.hash(password, 10);
      const _kitchen = new Kitchen({
        kitchen_name,
        owner_name,
        email,
        phone,
        hash_password,
        kitchen_address,
        img,
      });
      _kitchen.save((err, kitchen) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ msg: "Something Went Wrong!", err });
        }
        if (kitchen) {
          return res.status(201).json({
            msg: "Registration Successful!",
            kitchen,
          });
        }
      });
    }
  });
};

exports.kitchenSignIn = (req, res) => {
  Kitchen.findOne({ email: req.body.email }).exec(async (error, kitchen) => {
    if (error)
      return res.status(400).json({ msg: "Something Went Wrong!", error });
    if (kitchen) {
      const isPassword = await kitchen.authenticate(req.body.password);
      if (isPassword && kitchen.role === "owner") {
        const token = generateJwtToken(kitchen._id, kitchen.role);
        const {
          _id,
          kitchen_name,
          owner_name,
          email,
          phone,
          role,
          kitchen_address,
          img,
        } = kitchen;
        return res.status(200).json({
          msg: "Login Success",
          token,
          kitchen: {
            _id,
            kitchen_name,
            owner_name,
            email,
            phone,
            role,
            kitchen_address,
            img,
          },
        });
      } else {
        return res.status(401).json({
          msg: "Invalid Credentials!",
        });
      }
    } else {
      return res.status(404).json({
        msg: "Kitchen Not Found",
      });
    }
  });
};

exports.addItem = async (req, res) => {
  const { itemName, itemDesc, itemPrice } = req.body;

  let itemImg = {};
  if (req.file) {
    itemImg = req.file.location;
  }

  await Kitchen.findOneAndUpdate(
    { _id: req.user._id },
    {
      $push: {
        menu: {
          itemName: itemName,
          itemDesc: itemDesc,
          itemPrice: itemPrice,
          itemImg: itemImg,
        },
      },
    },
    { new: true }
  ).exec((error, kitchen) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong!" });
    }
    if (kitchen) {
      return res.status(201).json({ msg: "Item Added!", kitchen });
    }
  });
};

exports.getMenu = (req, res) => {
  Kitchen.findOne({ _id: req.user._id }).exec((error, kitchen) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong!" });
    }
    if (kitchen) {
      return res.status(200).json({ msg: "Success", menu: kitchen.menu });
    }
  });
};

exports.getKitchen = (req, res) => {
  Kitchen.find().exec((error, kitchens) => {
    if (error) {
      return res.status(400).json({ msg: "Something Went Wrong!" });
    }
    if (kitchens) {
      return res.status(200).json({ msg: "Success", kitchens });
    }
  });
};

exports.kitchenSignout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully!",
  });
};
