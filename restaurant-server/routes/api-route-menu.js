const express = require("express");
const router = express.Router();

const CRUD = require("../controller/common.controller");

const Document = require("../models/menu.model").menuItem;

let crud = new CRUD();

router.get("/", (req, res) => {
  res.render("index", { msg: "This from Api" });
});

/* /api/menu  */
router
  .route("/menu")
  .get(crud.index.bind(Document))
  .post(crud.add.bind(Document))
  .put(crud.update.bind(Document))
  .delete(crud.delete.bind(Document));

router.post("/test", (req, res) => {
  res.json({ msg: "test Fired" });
});

router.get("/menu/category", (req, res) => {
  Document.distinct("category", (err, result) => {
    if (!err) res.json({ msg: "Data Retrieve Success", data: result });
    else res.json({ msg: "Data Retrieve failed", err: err });
  });
});

module.exports = router;
