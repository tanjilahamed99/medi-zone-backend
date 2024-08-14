const Carts = require("../../Models/MyCart");
const User = require("../../Models/User");

const getAllUsesData = async (req, res, next) => {
  try {
    const { adminEmail, adminId, role } = req.params;
    if (!adminEmail || !adminId || !role) {
      return res.status(500).send({
        status: false,
        message: "adminId / adminEmail / role required",
      });
    }

    if (role === "user") {
      return res.send({
        status: false,
        message: "This role is not supported",
      });
    }

    const isAdmin = await User.findOne({
      email: adminEmail,
      _id: adminId,
      role: role,
    });

    if (isAdmin) {
      const result = await User.find();
      console.log(result);
      return res.send({
        status: true,
        data: result,
      });
    } else {
      return res.send({
        status: false,
        message: "This is not t valid admin email and id",
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Unable to get users data",
    });
  }
};

module.exports = getAllUsesData;
