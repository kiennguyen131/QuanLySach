const shortid = require("shortid");
const db = require("../db.js");

module.exports.index = (req, res) => {
  res.render("books/index", {
    books: db.get("books").value()
  });
};

module.exports.delete = (req, res) => {
  let id = req.params.id;

  db.get("books")
    .remove({ id: id })
    .write();

  res.redirect("back");
};

module.exports.update = (req, res) => {
  let id = req.params.id;
  res.render("books/update-title", {
    id: id
  });
};

module.exports.addBook = (req, res) => {
  res.render("books/add-book");
};


module.exports.postUpdate = (req, res) => {
  db.get("books")
    .find({ id: req.body.id })
    .assign({ title: req.body.title })
    .write();

  res.redirect("/books");
};

module.exports.postAddBook = (req, res) => {
  req.body.id = shortid.generate();

  db.get("books")
    .push(req.body)
    .write();
  res.redirect("/books");
};