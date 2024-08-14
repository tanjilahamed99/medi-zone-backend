const randomstring = require("randomstring");
const User = require("../../Models/User");
const sendEmail = require("../../utils/auth/sendMail");

function generateOTP() {
  return randomstring.generate({
    length: 6,
    charset: "numeric",
  });
}

const sendOTP = async (req, res, next) => {
  try {
    const { email, name, provider, type } = req.body || {};
    const otp = generateOTP(); // Generate a 6-digit OTP
    // const newOTP = new User({ email, name, provider, otp });
    // await newOTP.save();

    if (!email || !provider) {
      return res
        .status(400)
        .send({ success: false, message: "Email and Provider is required" });
    }

    const user = await User.findOne({ email, provider });

    if (user?.status === "registered" && type !== "forgot-pass") {
      return res
        .status(400)
        .json({ success: true, message: "User already registered!" });
    }

    const nameForDB = name || user?.name;

    // Update existing document or insert a new one
    await User.findOneAndUpdate(
      { email },
      { $set: { email, name: nameForDB, provider, otp } },
      { upsert: true, new: true }
    );

    // Send OTP via email
    await sendEmail({
      to: email,
      subject: "Your OTP",
      message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    });

    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    next(error);
  }
};

module.exports = sendOTP;
