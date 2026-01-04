const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ Serve images from backend/images folder
app.use("/images", express.static(path.join(__dirname, "images")));

// ✅ MySQL connection
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "appuser",
  password: "app123",
  database: "ecommerce",
});


db.connect((err) => {
  if (err) {
    console.error("MySQL error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

// ✅ API: Get all products
app.get("/products", (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
