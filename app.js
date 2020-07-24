const express = require("express");
const mysql = require("mysql");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud-express",
});

connection.connect((err) => {
  if (err) {
    console.log("error connecting: " + err.stack);
    return;
  }
  console.log("success");
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    res.render("index.ejs", { users: results });
  });
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/create", (req, res) => {
  connection.query(
    "INSERT INTO users (name) VALUES (?)",
    [req.body.name],
    (error, results) => {
      res.redirect("/");
    }
  );
});

app.post("/delete/:id", (req, res) => {
  connection.query(
    "DELETE FROM users WHERE id = ?",
    [req.params.id],
    (error, results) => {
      res.redirect("/");
    }
  );
});

app.get("/edit/:id", (req, res) => {
  connection.query(
    "SELECT * FROM users WHERE id = ?",
    [req.params.id],
    (error, results) => {
      res.render("edit.ejs", { user: results[0] });
    }
  );
});

app.post("/update/:id", (req, res) => {
  // Ketik code untuk memperbarui item yang dipilih
  connection.query(
    "UPDATE users SET name = ? WHERE id = ? ",
    [req.body.name, req.params.id],
    (error, results) => {
      res.redirect("/");
    }
  );
});

app.listen(3000);
