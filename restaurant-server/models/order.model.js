import pkg from "mongoose";
const { Schema, model } = pkg;

const orderSchema = new Schema(
  {
    tableNo: String,
    tableSuffix: String,
    invoiceNo: String,
    invoiceDate: Date,
    netAmt: Number,
  },
  {
    timestamps: true,
    strict: false,
  }
);

export const order = model("order", orderSchema);
