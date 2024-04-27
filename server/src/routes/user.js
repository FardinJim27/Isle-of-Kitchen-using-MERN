const express = require("express");
const { signUp, signin, signout, getAllUser } = require("../controllers/user");
const { requireSignIn } = require("../middleware");
const router = express.Router();

router.post("/user/signup", signUp);
router.post("/user/signin", signin);
router.post("/user/signout", requireSignIn, signout);
router.get("/user/get", requireSignIn, getAllUser);

module.exports = router;
