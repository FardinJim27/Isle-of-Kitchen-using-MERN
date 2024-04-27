const express = require("express");
const {
  placeOrder,
  getOrder,
  getAllOrder,
  updateOrder,
} = require("../controllers/order");
const {
  requireSignIn,
  userMiddleware,
  adminMiddleware,
} = require("../middleware");
const router = express.Router();

router.post("/order/create", requireSignIn, placeOrder);
router.get("/order/get", requireSignIn, getOrder);
router.get("/order/get/all", requireSignIn, getAllOrder);
router.post("/order/update", updateOrder);

module.exports = router;
