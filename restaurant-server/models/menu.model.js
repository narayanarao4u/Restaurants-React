import pkg from "mongoose";
const { Schema, model } = pkg;

const menuItemSchema = new Schema(
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

export const menuItem = model("menuItem", menuItemSchema);
