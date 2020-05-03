const express = require("express");
const bodyParser = require("body-parser");

const booksRoute = require("./routes/books.route.js");
const usersRoute = require("./routes/users.route.js");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.use("/books", booksRoute);
app.use("/users", usersRoute);

app.listen(3000, () => console.log(`Example app listening at http://localhost:3000`))

