const shortid = require("shortid");
const db = require("../db.js");
var md5 = require('md5');

module.exports.index = (req, res) => {
  res.render("users/index", {
    users: db.get("users").value()
  });
};
module.exports.delete = (req, res) => {
  let id = req.params.id;

  db.get("users")
    .remove({ id: id })
    .write();

  res.redirect("back");
};

module.exports.update = (req, res) => {
  let id = req.params.id;
  res.render("users/update-name", {
    id: id
  });
};

module.exports.addUser = (req, res) => {
  res.render("users/add-user");
};

module.exports.postUpdate = (req, res) => {
  db.get("users")
    .find({ id: req.body.id })
    .assign({ name: req.body.name })
    .write();

  res.redirect("/users");
};

module.exports.postAddUser = (req, res) => {
  req.body.id = shortid.generate();
  req.body.email = req.body.name + '@gmail.com';
  req.body.password = md5('123123');
  req.body.isAdmin = false;

  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
};

