const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const UserSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    bestFriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: addressSchema,
  },
  {
    timestamps: true,
    strict: false,
  }
);

module.exports = mongoose.model("User", UserSchema);
