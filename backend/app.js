require("dotenv").config();
const db = require("./config/db");

const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const tableRoutes = require("./routes/tableRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

// route test
app.get("/", (req, res) => {
  res.send("Backend Restaurant Booking jalan 🚀");
});

// jalankan server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running di http://localhost:${PORT}`);
});

// AUTO EXPIRE SYSTEM
setInterval(() => {
  const query = `
    UPDATE bookings
    SET status = 'expired'
    WHERE status = 'pending'
    AND created_at < NOW() - INTERVAL 30 MINUTE
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Auto expire error:", err);
    } else {
      console.log(`Auto expire berjalan... ${result.affectedRows} booking diupdate`);
    }
  });
}, 500000); // Cek setiap 5 menit