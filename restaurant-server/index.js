import express from "express";
import pkg from "body-parser";
const { urlencoded, json } = pkg;
import cors from "cors";

import apiRouteMenu from "./routes/api-route-menu.js";
import apiRouteOrder from "./routes/api-route-order.js";

const app = express();
app.use(express.static("public"));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.set("view engine", "ejs");

// const connStr = "mongodb://localhost:27017/restaurant";
const connStr = "mongodb://0.tcp.in.ngrok.io:17364/restaurant";

//#region Mongo connection

import pkgMongoose from "mongoose";
const { Promise, connect } = pkgMongoose;

// Connecting to the database
connect(connStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
})
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

//#endregion Mongo Connection
app.get("/ejs", (req, res) => {
  res.render("index", { msg: "World" });
});

// Use Api routes in the App

app.use("/api", apiRouteMenu);

app.use("/api-order", apiRouteOrder);

const port = process.env.PORT || 3005;
app.listen(port, () => console.log(`listening port : ${port}`));
