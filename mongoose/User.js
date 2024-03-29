const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  createdAt: Date,
  updatedAt: Date,
  bestFriend: mongoose.SchemaTypes.ObjectId,
  hobbies: [String],
  address: {
    street: String,
    city: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
