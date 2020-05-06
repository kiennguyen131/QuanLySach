const express = require("express");
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');

const booksRoute = require("./routes/books.route.js");
const usersRoute = require("./routes/users.route.js");
const transactionsRoute = require("./routes/transactions.route.js");

const authMiddlewar = require("./middlewares/auth.midderware");

const authRoute = require("./routes/auth.route.js");


const app = express();

app.use(express.static('public'));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/books", authMiddlewar.requireAuth, booksRoute);
app.use("/users", authMiddlewar.requireAuth, usersRoute);
app.use("/transactions", authMiddlewar.requireAuth, transactionsRoute);
app.use("/auth", authRoute);


app.listen(4000, () => console.log(`Example app listening at http://localhost:4000`))

