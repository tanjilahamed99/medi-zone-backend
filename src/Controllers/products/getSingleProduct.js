const Product = require("../../Models/Products");

const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    res.send({
      status: true,
      product: product,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Unable to delete products data",
    });
  }
};

module.exports = getSingleProduct;
