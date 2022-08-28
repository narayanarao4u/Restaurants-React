const express = require("express");
const bodyParser = require("body-parser");
let cors = require("cors");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.set("view engine", "ejs");

const connStr = "mongodb://localhost:27017/restaurant";

//#region Mongo connection

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(connStr, {
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
let apiRouteMenu = require("./routes/api-route-menu");
app.use("/api", apiRouteMenu);

const port = process.env.PORT || 3005;
app.listen(port, () => console.log(`listening port : ${port}`));
