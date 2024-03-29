const mongoose = require("mongoose");
const User = require("./User");

let url = "mongodb://localhost/testdb";
let config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(url, config);

/*

let user1 = new User({ name: "Rao", age: 42 });
user1.save().then((res) => {
  console.log(res);
});

*/

/*
async function run() {
  let user1 = new User({ name: "Rao", age: 42 });
  await user1.save();
  console.log(user1);
}
*/

/*
async function run() {
  //creating user
  let user1 = await User.create({
    name: "Rao",
    age: 42,
    hobbies: ["Cricket", "Chess"],
  });
  console.log(user1);

  //updating user
  //user1.name = "KNR";
  //await user1.save();

  console.log(user1);
}
*/

async function run() {
  //creating user
  try {
    let user1 = await User.create([
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
    console.log(user1);
  } catch (e) {
    console.log(e.message);
  }
}
run();
