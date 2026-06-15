const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const adminController = require("../controllers/adminController");

// Secure all admin endpoints
router.use(authMiddleware);
router.use(adminMiddleware);

// Admin Bookings Management
router.get("/bookings", adminController.getAllBookings);
router.put("/bookings/:id/approve", adminController.approveBooking);
router.put("/bookings/:id/reject", adminController.rejectBooking);

// Admin Tables CRUD
router.get("/tables", adminController.getAllTables);
router.post("/tables", adminController.createTable);
router.put("/tables/:id", adminController.updateTable);
router.delete("/tables/:id", adminController.deleteTable);

module.exports = router;
