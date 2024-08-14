const User = require("../../Models/User");

const getUserData = async (req, res, next) => {
  try {
    const { email, provider, socialId } = req.query || {};

    if (!email || !provider || !socialId) {
      return res
        .status(400)
        .send({ success: false, message: "Required fields missing!" });
    }

    let user;

    if (provider === "email/pass") {
      user = await User.findOne({ email, provider });
    } else {
      user = await User.findOne({ socialId });
    }

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = getUserData;
