const express = require("express");
const router = express.Router();

const CRUD = require("../controller/common.controller");

const Document = require("../models/order.model").order;

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
  Document.find({ billCompleted: true }, { counters: 0 }, (err, result) => {
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

module.exports = router;
