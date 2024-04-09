import { Router } from "express";
import { endOfDay } from "date-fns";
const router = Router();

import CRUD from "../controller/common.controller.js";

import { order as Document } from "../models/order.model.js";

let crud = new CRUD();

/* /api-order/ */
router
  .route("/")
  .get(crud.index.bind(Document))
  .post(billNo, crud.add.bind(Document))
  .put(billNo, crud.update.bind(Document))
  .delete(crud.delete.bind(Document));

router.post("/find", crud.find.bind(Document));

router.get("/pending", (req, res) => {
  Document.find(
    { billCompleted: false },
    { tableNo: 1, billCompleted: 1 },
    (err, result) => {
      if (!err) res.json({ msg: "Data Retrieve Success", data: result });
      else res.json({ msg: "Data Retrieve failed", err: err });
    }
  );
});

router.get("/bills", (req, res) => {
  let { frmDate, toDate } = req.query;
  frmDate = new Date(frmDate);
  toDate = endOfDay(new Date(toDate));

  let query = {
    billCompleted: true,
    billDate: { $gte: frmDate, $lte: toDate },
  };
  console.log(query);
  Document.find(query, { counters: 0 }, (err, result) => {
    if (!err) res.json({ msg: "Data Retrieve Success", data: result });
    else res.json({ msg: "Data Retrieve failed", err: err });
  });
});

function billNo(req, res, next) {
  Document.aggregate(
    [
      {
        $group: {
          _id: "",
          maxBillNo: { $max: "$billNo" },
        },
      },
    ],
    (err, result) => {
      if (!req.body.billNo && req.body.billCompleted) {
        req.body.billNo = result[0].maxBillNo + 1;
      }
      next();
    }
  );
}

export default router;
