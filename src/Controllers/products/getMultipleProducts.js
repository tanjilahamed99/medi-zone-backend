const Product = require("../../Models/Products");

const getMultipleProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    console.log('products');
    res.send({
      status: true,
      products: products,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Unable to delete products data",
    });
  }
};

module.exports = getMultipleProducts;
