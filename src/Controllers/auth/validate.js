const User = require("../../Models/User");


const validate = async (req, res, next) => {
  try {
    const { email, action } = req.query;

    if (!email || !action) {
      return res.status(400).send({
        success: false,
        message: "User ID and Action is required",
        type: "",
      });
    }

    if (!["register", "signin"].includes(action)) {
      return res.status(400).send({
        success: false,
        message: "Invalid action value, Expected register or signin",
        type: "",
      });
    }

    // Find user by userId
    const user = await User.findOne({ email, provider: "email/pass" });

    // If user not found
    if (!user && action === "signin") {
      return res.status(404).send({
        success: false,
        message: "Your email ID not registered.",
        type: "not-found",
      });
    }

    // Handle actions
    if (action === "register" && user?.status === "registered") {
      // If user already registered
      return res.status(400).send({
        success: false,
        message: "You already registered with us, please",
        type: "registered",
      });
    }

    return res.status(200).send({ success: true, message: "No Error" });
  } catch (error) {
    console.error("Error handling user action:", error.message);
    next(error);
  }
};

module.exports = validate;
