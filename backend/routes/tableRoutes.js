const express = require("express");
const router = express.Router();

const tableController = require("../controllers/tableController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// GET
router.get("/", tableController.getTables);

// POST (admin only)
router.post("/", authMiddleware, adminMiddleware, tableController.createTable);

// PUT (admin only)
router.put("/:id", authMiddleware, adminMiddleware, tableController.updateTable);

// DELETE (admin only)
router.delete("/:id", authMiddleware, adminMiddleware, tableController.deleteTable);

module.exports = router;