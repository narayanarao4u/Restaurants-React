const mongoose = require("mongoose");
const User = require("./models/test/User");

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
  try {
    //creating user
    let user1 = await User.create({
      name : "k narayana rao",
      age: 42,
      email: "RAO@gmail.com",
      hobbies: ["Cricket", "Chess"],
      adrress: {
        street: "velampeta",
        city: "Visakapatnam",
      },
      gender: "Female",
    });
    console.log(user1._id, user1.name, user1.createdTime, user1.updatedTime);

    ///updating user after 1sec
    setTimeout(async () => {      
      user1.name = "k rao";   
      await user1.save();
      console.log(user1._id, user1.name, user1.createdTime, user1.updatedTime);
      console.log(user1._id, user1.updatedAt);
    }, 1000);
  } catch (error) {
    console.log(error.message);
  }
}

//CreateandUpdate();

async function createuserMulti() {
  //creating user
  try {
    let users = await User.create([
      {
        name: "K Narayana Rao",
        age: 40,
        hobbies: ["Cricket", "Chess"],
        email: "rao@TestDB.com",
      },
      {
        name: "B surya teja",
        age: 42,
        hobbies: ["Cricket", "Chess"],
        email: "Test@TESTDB.com",
      },
    ]);
    // console.table(users);
    console.log(users);
  } catch (e) {
    console.log("error :", e.message);
  }
}
//createuserMulti();


async function deleteAll() {
 let res = await User.deleteMany();
  console.log(res);
}
//deleteAll();

async function addFriend() {
  const user = await User.findOne({ name: "K NARAYANA RAO" });

  user.bestFriend = '6630d38bc38e2a1a182f852a'
  let res = await user.save();
  console.log(res);
}

//addFriend();

async function fieldPopulate() {  
  const user = await User.where({ name: "K NARAYANA RAO" }).populate("bestFriend");

  
  console.log("name", user[0].name, user[0].salary);
  console.log(user[0].bestFriend.name, user[0].bestFriend.salary);
}
//fieldPopulate();
//createuserMulti();
//addFriend();

async function finduser() {
  const user = await User.findOne({ name: "K NARAYANA RAO" }).populate("bestFriend");
  user.userDetails();
  console.log(user.bestFriend.name);
}

//finduser();

async function findByName() {
const user = await User.UserByName("K NARAYANA RAO").populate("bestFriend");
console.log(user.length);
}

findByName();