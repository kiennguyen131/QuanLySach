const shortid = require("shortid");
const db = require("../db.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

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
  var id = shortid.generate();
  var name = req.body.name;
  var email = req.body.name + '@gmail.com';
  var isAdmin = false;

  bcrypt.hash('123123', saltRounds, function(err, hash) {
    var hash = hash;
    var newUser = {
      name:name,
      id: id,
      email: email,
      password: hash,
      isAdmin: isAdmin
    };
    
    db.get("users")
      .push(newUser)
      .write();

  });

  res.redirect("/users");
};

