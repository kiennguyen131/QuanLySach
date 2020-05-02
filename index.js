var express = require('express')
var bodyParser = require('body-parser');
var app = express()
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
var shortid = require('shortid');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const adapter = new FileSync('db.json')
const db = low(adapter)

app.set('view engine', 'pug');
app.set('views', './views');

db.defaults({ list: [] })
  .write() 

app.get('/books/', function(req,res){
	res.render("list", {
		list: db.get("list").value()
	});
})

app.get('/books/add', function( req, res){
	res.render('add')
})

app.get('/books/:id/delete', function (req, res) {
  var id = req.params.id;
  db.get('list').remove({ id: id }).write();
  res.redirect('/books');
})

app.get('/books/:id/update', function( req, res){
	res.render('update');
	var id = req.params.id;

	app.post('/books/update', function(req, res){
		var newTitle = req.body.update;
 		db.get("list")
      		.find({ id: id })
     		.assign({ title: newTitle })
      		.write();
      	res.redirect("/books");
 	
	})

})

app.post('/books/add', function(req, res){
	req.body.id = shortid.generate();
 	db.get('list').push(req.body).write();
 	res.redirect("/books");
})


app.listen(3000, () => console.log(`Example app listening at http://localhost:3000`))

