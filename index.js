var express = require('express')
var bodyParser = require('body-parser');
var booksRoute = require('./routes/books.route');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/books', booksRoute);

app.set('view engine', 'pug');
app.set('views', './views');

app.listen(3000, () => console.log(`Example app listening at http://localhost:3000`))

