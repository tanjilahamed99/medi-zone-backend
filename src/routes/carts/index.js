const getCartsData = require("../../Controllers/carts/getAllCartsData");
const postCartsData = require("../../Controllers/carts/postCartsData");

const router = require("express").Router();

// get all products data
router.post("/carts", postCartsData);
router.get("/orders/:adminId/:adminEmail/:role",getCartsData);

module.exports = router;
