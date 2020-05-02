var express = require('express');
var db = require('../db');
var shortid = require('shortid');

var router = express.Router();

router.get('/', function(req,res){
	res.render("list-users", {
		users: db.get("users").value()
	});
})

router.get('/add-user', function( req, res){
	res.render('add-user')
})

router.get('/:id/delete', function (req, res) {
  var id = req.params.id;
  db.get('users').remove({ id: id }).write();
  res.redirect('/users');
})




router.post('/add-user', function(req, res){
	req.body.id = shortid.generate();
 	db.get('users').push(req.body).write();
 	res.redirect("/users");
})































module.exports = router;