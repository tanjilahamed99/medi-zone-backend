const router = require("express").Router();
const authorizeUser = require("../../Controllers/auth/authorizeUser");
const changePassword = require("../../Controllers/auth/changePassword");
const register = require("../../Controllers/auth/register");
const sendOTP = require("../../Controllers/auth/sendOTP");
const validate = require("../../Controllers/auth/validate");
const verifyOTP = require("../../Controllers/auth/verifyOTP");
// GET
router.get("/validate", validate);

// POST
router.post("/authorize-user", authorizeUser);
router.post("/register", register);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/change-password", changePassword);

module.exports = router;
