const express = require("express");
const router = express.Router();
const { auth, authorize } = require("../middleware/authMiddleware");
const { login, getAssigned, updateStatus, getDailySchedule } = require("../controllers/staffController");

// PUBLIC LOGIN
router.post("/login", login);

// PROTECTED ROUTES
router.get("/assigned", auth, authorize("staff"), getAssigned);          // view all assigned deliveries
router.get("/schedule", auth, authorize("staff"), getDailySchedule);    // view daily schedule
router.put("/status/:id", auth, authorize("staff"), updateStatus);      // update status

module.exports = router;