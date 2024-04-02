const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

//Endpoints
const endpoint_get_all = "/get-all";
const endpoint_get_terms = "/get-terms";
const endpoint_get_courses = "/get-courses";

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Server started - listening on port 3000...");
});

const db = mysql.createConnection({
  user: "////",
  host: "////",
  password: "////",
  database: "////",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

app.get(endpoint_get_all, (req, res) => {
  db.query("SELECT * FROM evals", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get(endpoint_get_terms, (req, res) => {
  db.query("SELECT DISTINCT term_id FROM evals", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get(endpoint_get_courses, (req, res) => {
  db.query("SELECT DISTINCT course_id FROM evals", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
