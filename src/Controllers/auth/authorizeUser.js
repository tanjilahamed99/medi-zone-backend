const bcrypt = require("bcrypt");
const User = require("../../Models/User");

const authorizeUser = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).send({ status: false, data: [] });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ status: false, data: [1] });
    }
    const passwordMatched = bcrypt.compare(password || "", user.password);

    if (!passwordMatched) {
      return res.send({ status: false, data: [2] });
    }

    // if (user.role !== role) {
    //   return res.send({ status: false, data: [] });
    // }

    const data = {
      id: user?._id?.toString(),
      email: user?.email,
      image: user?.image,
      name: user?.userName,
      role: user?.role,
    };

    return res.send({ status: true, data });

    // use appropriate status code to send data
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = authorizeUser;
