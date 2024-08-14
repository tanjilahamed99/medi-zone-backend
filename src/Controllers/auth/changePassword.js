const bcrypt = require("bcrypt");
const User = require("../../Models/User");

const changePassword = async (req, res, next) => {
  const { email, password, provider } = req.body;

  // Check if required parameters are missing
  if (!email || !password || !provider) {
    return res
      .status(400)
      .send({ success: false, message: "Missing parameters" });
  }

  try {
    // Hash the new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Find the user by email and provider and update the password
    const updatedUser = await User.findOneAndUpdate(
      { email, provider },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    // If user not found, return error
    if (!updatedUser) {
      return res
        .status(404)
        .send({ success: false, message: "Your email ID is not registered!" });
    }

    // Return the newly updated user document
    return res.status(200).send({ success: true, user: updatedUser });
  } catch (error) {
    // Handle any errors
    console.log("Error changing password", error.message);
    next(error);
  }
};

module.exports = changePassword;
