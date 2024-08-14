const getAllUsesData = require("../../Controllers/user/getAllUsersData");
const getUserData = require("../../Controllers/user/getUserData");

const router = require("express").Router();

// GET
router.get("/data", getUserData);
router.get("/allUsersData/:adminId/:adminEmail/:role", getAllUsesData);

module.exports = router;
