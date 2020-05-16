const shortid = require("shortid");
const db = require("../db.js");
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.index = (req, res) => {
  var page = parseInt(req.query.page) || 1;
  var perPage = 4;

  var drop = (page - 1) * perPage;
  res.render("users/index", {
    users: db.get("users").drop(drop).take(perPage).value(),
    page: page
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
  var avatar = `/uploads/${req.file.filename}`;

  bcrypt.hash('123123', saltRounds, function(err, hash) {
    var hash = hash;
    var newUser = {
      name,
      id,
      email,
      password: hash,
      isAdmin,
      avatar
    };
    
    db.get("users")
      .push(newUser)
      .write();

  });

  res.redirect("/users");
};

