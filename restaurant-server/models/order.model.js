const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    tableNo: String,
    tableSuffix: String,
    invoiceNo: String,
    invoiceDate: Date,
    netAmt: Number
  },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports.order = mongoose.model("order", orderSchema);