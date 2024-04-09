import { Router } from "express";
const router = Router();

import CRUD from "../controller/common.controller.js";

import { menuItem as Document } from "../models/menu.model.js";

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

export default router;
