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

module.exports = router;
