const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant_booking"
});

db.connect((err) => {
  if (err) {
    console.error("Database gagal connect:", err);
  } else {
    console.log("Database connected ✅");
  }
});

module.exports = db;