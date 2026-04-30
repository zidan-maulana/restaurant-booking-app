const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/", authMiddleware, createBooking);
router.get("/my", authMiddleware, getMyBookings);
router.get("/", authMiddleware, adminMiddleware, getAllBookings);
router.put("/:id/status", authMiddleware, adminMiddleware, updateBookingStatus);
router.put("/:id/cancel", authMiddleware, cancelBooking);

module.exports = router;