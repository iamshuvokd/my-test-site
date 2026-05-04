const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "app_db"
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  db.query(
    "INSERT INTO contacts (name,email,message) VALUES (?,?,?)",
    [name, email, message],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Saved");
    }
  );
});

app.get("/api/contacts", (req, res) => {
  db.query("SELECT * FROM contacts", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

app.listen(5000, () => console.log("Server running"));