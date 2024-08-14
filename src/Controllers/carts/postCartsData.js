const Carts = require("../../Models/MyCart");
const Product = require("../../Models/Products");

const postCartsData = async (req, res, next) => {
  try {
    const { userEmail, userName, myCartsData } = req.body;
    if (!userEmail || !userName) {
      return res.status(500).send({
        status: false,
      });
    }

    const data = {
      userName,
      userEmail,
      myCartsData,
    };

    const result = await Carts.create(data);

    return res.send({
      status: true,
      data: result.myCartsData,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Unable to delete products data",
    });
  }
};

module.exports = postCartsData;
