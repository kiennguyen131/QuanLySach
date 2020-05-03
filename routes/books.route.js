const express = require("express");
const shortid = require("shortid");

const db = require("../db.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
});

router.post("/", (req, res) => {
  req.body.id = shortid.generate();

  db.get("books")
    .push(req.body)
    .write();
  res.redirect("back");
});

router.get("/:id/delete", (req, res) => {
  let id = req.params.id;

  db.get("books")
    .remove({ id: id })
    .write();

  res.redirect("back");
});

router.get("/:id/update", (req, res) => {
  let id = req.params.id;
  res.render("books/update-title", {
    id: id
  });
});

router.post("/update", (req, res) => {
  db.get("books")
    .find({ id: req.body.id })
    .assign({ title: req.body.title })
    .write();

  res.redirect("/books");
});



module.exports = router;