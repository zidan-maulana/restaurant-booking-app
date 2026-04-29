require("dotenv").config();
require("./config/db.js");

const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/authRoutes");
const tableRoutes = require("./routes/tableRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/tables", tableRoutes);

// route test
app.get("/", (req, res) => {
  res.send("Backend Restaurant Booking jalan 🚀");
});

// jalankan server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running di http://localhost:${PORT}`);
});