const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],      
      uppercase: true,
      minLength: 3,
    },
    age: {
      type: Number,
      min: 18,
      max: 60,
      validate: {
        validator: (value) => {
          return value % 2 === 0;
        },
        message: (props) => `${props.value} is not an even number`,
      },
    },
    email: {
      type: String,
      required: [true,"Email is required"],
      lowercase: true,
      minLength: 3,
    },
    bestFriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: addressSchema,
    gender : {
      type: String,
      enum:["Male","Female"],
      default: "Male"
    },
    createdTime: {
      type: Date,
      immutable: true, //defafult value cannot be changed
      default: Date.now,
    },
    updatedTime: {
      type: Date,
      default: () => Date.now(),
    },
    salary: {
      type: Number,
      default :0
    }

  },
  {
    timestamps: true,
    strict: false,
  }
);

UserSchema.methods.userDetails = function () {
  console.log(`${this.name} age is ${this.age}`);
}


UserSchema.statics.UserByName  = function (name) {
  // return this.find({ name: { $regex: name, $options: "i" } });
  return this.where({name: new RegExp(name, "i")});
}
module.exports = mongoose.model("User", UserSchema);
