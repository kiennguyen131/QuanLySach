const express = require("express");
const shortid = require("shortid");

const db = require("../db.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
});

router.get("/:id/delete", (req, res) => {
  let id = req.params.id;

  db.get("users")
    .remove({ id: id })
    .write();

  res.redirect("back");
});

router.get("/:id/update", (req, res) => {
  let id = req.params.id;
  res.render("users/update-name", {
    id: id
  });
});

router.post("/update", (req, res) => {
  db.get("users")
    .find({ id: req.body.id })
    .assign({ name: req.body.name })
    .write();

  res.redirect("/users");
});

router.post("/", (req, res) => {
  req.body.id = shortid.generate();

  db.get("users")
    .push(req.body)
    .write();
  res.redirect("back");
});











module.exports = router;