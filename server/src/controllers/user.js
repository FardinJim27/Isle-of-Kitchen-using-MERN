const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJwtToken = (_id, role) => {
  return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
    expiresIn: "1y",
  });
};

exports.signUp = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) {
      return res.status(400).json({ msg: "Bad Request!", error });
    }
    if (user) {
      return res.status(409).json({
        msg: "Email Already In Use. Please Use Another Email To Continue.",
      });
    } else {
      const { firstName, lastName, email, phone, password, address, role } =
        req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
        firstName,
        lastName,
        email,
        phone,
        hash_password,
        address,
        role,
      });
      _user.save((err, user) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ msg: "Something Went Wrong!", err });
        }
        if (user) {
          return res.status(201).json({
            msg: "Registration Successful!",
            user,
          });
        }
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error)
      return res.status(400).json({ msg: "Something Went Wrong!", error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword) {
        const token = generateJwtToken(user._id, user.role);
        const { firstName, lastName, fullName, email, phone, role, address } =
          user;
        return res.status(200).json({
          msg: "Login Success",
          token,
          user: {
            firstName,
            lastName,
            fullName,
            email,
            phone,
            role,
            address,
          },
        });
      } else {
        return res.status(401).json({
          msg: "Invalid Credentials!",
        });
      }
    } else {
      return res.status(404).json({
        msg: "User Not Found",
      });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully!",
  });
};

exports.getAllUser = (req, res) => {
  User.find().exec((error, users) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (users) {
      return res.status(200).json({ users });
    }
  });
};
