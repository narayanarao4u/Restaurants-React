import mongoose from "mongoose";
import { menuItem as menu } from "./models/menu.model.js";
import {order} from "./models/order.model.js"
import path from "path";

import dotenv from 'dotenv'

let env = dotenv.config().parsed
console.log(env);

// let url = "mongodb://0.tcp.in.ngrok.io:14304/testdb";
// let url =  "mongodb://localhost:27017/restaurant";

let url = env.DB_URL;
let config = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
};

mongoose.connect(url, config);

async function RunQuery() {
    let q1 = {}

    const res = await menu.find(q1);  
    console.log(res);   

  }

//   RunQuery()

  async function OrderQuery() {
    let q1 = {}

    const res = await order.find(q1);  
    console.log(res);   

  }

  OrderQuery()
// console.log(.env);
// const test = process.env.MY_NA

