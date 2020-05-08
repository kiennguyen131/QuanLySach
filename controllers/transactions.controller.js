const shortid = require("shortid");
const db = require("../db.js");

module.exports.index = (req, res) => {
  var userId = req.signedCookies.userId;
  var user = db.get('users').find( {id: req.signedCookies.userId}).value();

//hiển thị tất cả với vai trò admin nhưng chỉ hiện thị sách của nguwoif dùng với vai trò người dùng 
  if(user.isAdmin){
    res.render("transactions/index", {
    transactions: db.get("transactions").value(),    
    });
    return;
  }
  else {
    var dataTransUser = db.get('transactions').filter({userId:userId}).value();
    res.render('transactions/index',{
      transactions : dataTransUser,
      userId: userId
    })
  }

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