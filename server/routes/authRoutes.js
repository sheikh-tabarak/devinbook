const express = require("express");
const { register, login } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", require("../controllers/authController").forgotPassword);
router.post("/reset-password", require("../controllers/authController").resetPassword);

module.exports = router;
