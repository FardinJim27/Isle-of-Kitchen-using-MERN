const express = require("express");
const {
  kitchenSignUp,
  kitchenSignIn,
  kitchenSignout,
  addItem,
  getMenu,
  getKitchen,
} = require("../controllers/kitchen");
const {
  uploadS3,
  requireSignIn,
  ownerMiddleware,
  userMiddleware,
} = require("../middleware");
const router = express.Router();

router.post("/kitchen/signup", uploadS3.single("img"), kitchenSignUp);
router.post("/kitchen/signin", kitchenSignIn);
router.post("/kitchen/signout", requireSignIn, kitchenSignout);
router.post(
  "/kitchen/add-item",
  requireSignIn,
  ownerMiddleware,
  uploadS3.single("itemImg"),
  addItem
);
router.get("/kitchen/get-menu", requireSignIn, getMenu);
router.get("/kitchen/get-all", requireSignIn, getKitchen);

module.exports = router;
