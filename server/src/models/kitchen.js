const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const kitchenSchema = new mongoose.Schema(
  {
    kitchen_name: {
      type: String,
      required: true,
    },
    owner_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    kitchen_address: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    menu: [
      {
        itemImg: {
          type: String,
        },
        itemName: {
          type: String,
        },
        itemPrice: {
          type: Number,
        },
        itemDesc: {
          type: String,
        },
      },
    ],
    role: {
      type: String,
      default: "owner",
    },
  },
  { timestamps: true }
);

kitchenSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

module.exports = mongoose.model("Kitchen", kitchenSchema);
