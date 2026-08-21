const express = require("express");
const router = express.Router();

const { auth, authorize } = require("../middleware/authMiddleware");

const {
  bookCourier,
  getHistory,
  downloadPDF,
  trackShipment   // ✅ ADD THIS
} = require("../controllers/shipmentController");

// ✅ Book courier
router.post("/book", auth, authorize("customer"), bookCourier);

// ✅ Track shipment (NO AUTH needed)
router.get("/track/:id", trackShipment);

// ✅ Customer history
// router.get("/history", auth, authorize("customer"), getHistory);
router.get("/history/:id", auth, authorize("customer"), getHistory);

// ✅ Download PDF
router.get("/download/:id", auth, downloadPDF);

module.exports = router;