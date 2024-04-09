class CRUD {
  index(req, res) {
    this.find({ status: { $ne: "DELETE" } }, (err, result) => {
      if (!err) res.json({ msg: "Data Retrieve Success", data: result });
      else res.json({ msg: "Data Retrieve failed", err: err });
    });
  }

  findid(req, res) {
    this.findOne({ _id: req.params.id }, (err, result) => {
      if (!err) res.json({ msg: "Data Retrieve Success", data: result });
      else res.json({ msg: "Data Retrieve failed", err: err });
    });
  }

  find(req, res) {
    this.find(req.body, (err, result) => {
      if (!err) res.json({ msg: "Data Retrieve Success", data: result });
      else res.json({ msg: "Data Retrieve failed", err: err });
    });
  }

  add(req, res) {
    var doc = new this(req.body);

    doc.save((err, result) => {
      if (!err) res.json({ msg: "Insert Success...", data: result });
      else res.json({ msg: "Error during record insertion ", err: err });
    });
  }

  update(req, res) {
    this.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
      (err, result) => {
        if (!err) {
          res.json({ msg: "Update Success", data: result });
        } else {
          res.json({ msg: "failed to update : ", err: err });
        }
      }
    );
  }

  delete(req, res) {
    console.log(req.body);
    this.remove({ _id: req.body._id }, (err, result) => {
      if (!err) {
        res.json({ msg: "Delete Success" });
      } else {
        res.json({ msg: "failed to Delete : ", err: err });
      }
    });
  }
}

export default CRUD;
