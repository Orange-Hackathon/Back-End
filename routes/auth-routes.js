const express = require("express");
const authController = require("../controllers/auth-controller");
const authCheck = require("../middlewares/auth-check");

const router = express.Router();

router.get("/username-available", authController.availableUsername);
router.get("/available-phone", authController.availablePhoneNumber);
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/forget", authController.forgotPassword);
router.post(
  "/reset-forgotten-password/:token",
  authController.resetForgottenPassword
);
router.patch(
  "/reset-password",authCheck ,authController.resetUserPassword
);


module.exports = router;
