const express = require("express");
const shortid = require("shortid");

const db = require("../db.js");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("transactions/index", {
  	transactions: db.get("transactions").value(),

    
  });
});

router.get("/:id/delete", (req, res) => {
  let id = req.params.id;
  db.get("transactions")
    .remove({ id: id })
    .write();

  res.redirect("back");
});

router.get("/create", (req, res) => {
  res.render("transactions/create", {
    users: db.get("users").value(),
    books: db.get("books").value()
  });
});

router.post("/create", (req, res) => {
  let user = db
    .get("users")
    .find({ id: req.body.userId })
    .value();
  let book = db
    .get("books")
    .find({ id: req.body.bookId })
    .value();
  let transaction = {
    id: shortid.generate(),
    bookId: book.id,
    userId: user.id,
    content: `${user.name} got ${book.title}.`
  };
  db.get("transactions")
    .push(transaction)
    .write();
  res.redirect("/transactions");
});


























module.exports = router;