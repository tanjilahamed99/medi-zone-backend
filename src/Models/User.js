const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: [true, "Username is required!!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    // unique: [true, "Email already exist"],
  },
  image: {
    type: String,
  },
  socialId: {
    type: String,
  },
  otp: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["registered", "none"],
    default: "none",
  },
  otpExpiredDate: {
    type: Date,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user", "superAdmin"],
    default: "user",
  },
  provider: {
    type: String,
    enum: ["email/pass"],
    required: [true, "Provider required!!"],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isNew && this.password) {
    const saltRounds = 10;
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
  }

  if (this.isNew && this.otp) {
    const oneDayLater = new Date();
    oneDayLater.setDate(oneDayLater.getDate() + 1);
    this.otpExpiredDate = oneDayLater;
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
