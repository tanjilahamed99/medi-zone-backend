const User = require("../../Models/User");


const verifyOTP = async (req, res, next) => {
  try {
    const { email, otp, provider } = req.body;

    if (!email || !otp || !provider) {
      return res
        .status(400)
        .send({ message: "Email and OTP and Provider is required!!" });
    }

    const user = await User.findOne({ email, provider });

    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }

    // Check if OTP is correct
    if (+user.otp === +otp) {
      // Check if OTP is expired
      if (user.otpExpiredDate && user.otpExpiredDate < new Date()) {
        return res
          .status(400)
          .send({ success: false, message: "OTP has expired" });
      }

      // OTP is valid
      res
        .status(200)
        .send({ success: true, message: "OTP verification successful" });
    } else {
      // OTP is incorrect
      res.status(400).send({ success: false, message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    next(error);
  }
};

module.exports = verifyOTP;
