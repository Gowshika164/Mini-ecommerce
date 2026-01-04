import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
app.use(cors());

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "appuser",
  password: "app123",
  database: "ecommerce",
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
