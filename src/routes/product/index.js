const getMultipleProducts = require("../../Controllers/products/getMultipleProducts");
const getSingleProduct = require("../../Controllers/products/getSingleProduct");

const router = require("express").Router();

// get all products data
router.get("/product/multiple", getMultipleProducts);
router.get("/product/single/:id", getSingleProduct);

module.exports = router;
