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
  
  db.query("SELECT * FROM bookings", (err, results) => {
    if (err) {
      console.error("Error reading bookings:", err);
    } else {
      console.log("All bookings:", results);
    }
    
    // Test the admin query
    const adminQuery = `
      SELECT 
        bookings.id,
        bookings.booking_date,
        bookings.booking_time,
        bookings.guest_count,
        bookings.status,
        bookings.created_at,
        users.nama AS user_name,
        users.email AS user_email,
        tables.table_number,
        tables.capacity
      FROM bookings
      JOIN users ON bookings.user_id = users.id
      JOIN tables ON bookings.table_id = tables.id
    `;
    db.query(adminQuery, (err, results2) => {
      if (err) {
        console.error("Error running admin query:", err);
      } else {
        console.log("Admin query results (INNER JOIN):", results2);
      }
      db.end();
    });
  });
});
