var express = require('express');
var db = require('../db');
var shortid = require('shortid');

var router = express.Router();

router.get('/', function(req,res){
	res.render("list", {
		list: db.get("list").value()
	});
})

router.get('/add', function( req, res){
	res.render('add')
})

router.get('/:id/delete', function (req, res) {
  var id = req.params.id;
  db.get('list').remove({ id: id }).write();
  res.redirect('/books');
})

router.get('/:id/update', function( req, res){
	res.render('update');
	var id = req.params.id;

	router.post('/update', function(req, res){
		var newTitle = req.body.update;
 		db.get("list")
      		.find({ id: id })
     		.assign({ title: newTitle })
      		.write();
      	res.redirect("/books");
 	
	})
})

router.post('/add', function(req, res){
	req.body.id = shortid.generate();
 	db.get('list').push(req.body).write();
 	res.redirect("/books");
})

module.exports = router;