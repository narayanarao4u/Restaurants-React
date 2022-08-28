const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    uid: String,
    category: String,
    itemType: String,
    itemName: String,
    price: Number,
    onlineprice: Number,
  },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports.menuItem = mongoose.model("menuItem", menuItemSchema);
