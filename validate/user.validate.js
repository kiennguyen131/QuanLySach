module.exports.postAddUser = (req, res) => {

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
  next();
};