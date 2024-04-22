const mongoose = require("mongoose");
const User = require("./User");

let url = "mongodb://localhost/testdb";
let config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(url, config);

function run0() {
  let user1 = new User({ name: "Rao0", age: 42, email: "rao0@gmail.com" });
  user1.save().then((res) => console.log(res));
}

// run0();

async function run1() {
  let user1 = new User({ name: "Rao1", age: 43, email: "rao1@gmail.com" });
  await user1.save();
  console.log(user1);
}

// run1();

async function CreateandUpdate() {
  //creating user
  let user1 = await User.create({
    name: "Rao",
    age: 42,
    email: "rao1@gmail.com",
    hobbies: ["Cricket", "Chess"],
    adrress: {
      street: "velampeta",
      city: "Visakapatnam",
    },
  });
  console.log(user1);

  ///updating user
  user1.name = "KNR";
  await user1.save();

  console.log(user1);
}
CreateandUpdate();

async function createuserMulti() {
  //creating user
  try {
    let users = await User.save([
      {
        name: "Rao111",
        age: 40,
        hobbies: ["Cricket", "Chess"],
        email: "Test@TETET.com",
      },
      {
        name: "Rao2222",
        age: 40,
        hobbies: ["Cricket", "Chess"],
        email: "Test@TETET.com",
      },
    ]);
    console.log(users);
  } catch (e) {
    console.log("error :", e.message);
  }
}

//createuserMulti();
