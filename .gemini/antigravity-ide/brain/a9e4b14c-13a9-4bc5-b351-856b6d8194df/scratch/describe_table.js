const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restaurant_booking"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  
  db.query("DESCRIBE bookings", (err, results) => {
    if (err) {
      console.error("Error describing bookings table:", err);
    } else {
      console.log("Bookings table schema:", results);
    }
    db.end();
  });
});
