const shortid = require("shortid");
const db = require("../db.js");

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

  var errors = [];
  if(!req.body.name) {
    errors.push('Name is required.')
  }
  var name = req.body.name;
  if(name.length > 30) {
    errors.push('Name is too long.')
  }
  if(errors.length > 0){
    res.render("users/add-user",{
      errors: errors,
      values: req.body
    });
    return;
  }

  db.get("users")
    .push(req.body)
    .write();
  res.redirect("/users");
};

