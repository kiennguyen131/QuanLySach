const shortid = require("shortid");
const db = require("../db.js");

module.exports.index = (req, res) => {
  res.render("transactions/index", {
  	transactions: db.get("transactions").value(),    
  });
};

module.exports.delete = (req, res) => {
  let id = req.params.id;
  db.get("transactions")
    .remove({ id: id })
    .write();

  res.redirect("back");
};

module.exports.isComplete = (req, res) => {
  let id = req.params.id;
  db.get("transactions")
    .find({ id: id })
    .assign({ isComplete: true })
    .write();
  res.redirect("back");
}

module.exports.create = (req, res) => {
  res.render("transactions/create", {
    users: db.get("users").value(),
    books: db.get("books").value()
  });
}

module.exports.postCreate = (req, res) => {
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
    isComplete: false,
    bookId: book.id,
    userId: user.id,
    content: `${user.name} got ${book.title}.`
  };
  db.get("transactions")
    .push(transaction)
    .write();
  res.redirect("/transactions");
};