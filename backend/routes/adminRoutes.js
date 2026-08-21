// const express = require("express");
// const router = express.Router();
// const {
//   adminLogin,
//   getAllShipments,
//   getCustomers,
//   getStaff,
//   addStaff,
//   deleteShipment,
//   assignStaff,
//   getReports
// } = require("../controllers/adminController");

// const { auth, authorize } = require("../middleware/authMiddleware");

// // ✅ PUBLIC: LOGIN
// router.post("/login", adminLogin);

// // ✅ PROTECTED ROUTES
// router.get("/shipments", auth, authorize("admin"), getAllShipments);
// router.get("/customers", auth, authorize("admin"), getCustomers);
// router.get("/staff", auth, authorize("admin"), getStaff);
// router.post("/staff", auth, authorize("admin"), addStaff);
// router.delete("/shipment/:id", auth, authorize("admin"), deleteShipment);
// router.post("/assign", auth, authorize("admin"), assignStaff);
// router.get("/reports", auth, authorize("admin"), getReports);

// module.exports = router;



const express = require("express");
const router = express.Router();
const { adminLogin, getAllShipments, getStaff, assignStaff,getCustomers,deleteStaff,getReports,deleteCustomer,addStaff,deleteShipment,updateShipment } = require("../controllers/adminController");
const { auth, authorize } = require("../middleware/authMiddleware");

// PUBLIC
router.post("/login", adminLogin);

// PROTECTED
router.get("/shipments", auth, authorize("admin"), getAllShipments);
router.get("/staff", auth, authorize("admin"), getStaff);
router.post("/assign", auth, authorize("admin"), assignStaff);
router.get("/customers", auth, authorize("admin"), getCustomers);
router.delete("/staff/:id", auth, authorize("admin"), deleteStaff);
router.get("/reports", auth, authorize("admin"), getReports);
router.delete("/customer/:id", auth, authorize("admin"), deleteCustomer);
router.post("/staff", auth, authorize("admin"), addStaff);
router.delete("/shipment/:id", auth, authorize("admin"), deleteShipment);
router.put("/shipment/:id", auth, authorize("admin"), updateShipment);

module.exports = router;