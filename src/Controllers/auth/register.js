const { ROLES } = require("../../config/default");
const User = require("../../Models/User");

const register = async (req, res, next) => {
  const { name, email, password, role, provider, socialId, image } =
    req.body || {};

  // Basic validation
  if (!name || !email || !provider) {
    return res
      .status(400)
      .send({ message: "Please provide all required fields" });
  }

  if (provider === "email/pass" && !password) {
    return res.status(400).send({ message: "Password required!" });
  }

  try {
    // Check for existing email with the same role
    const existingUser = await User.findOne({ email, provider });

    if (existingUser) {
      if (provider !== "email/pass") {
        const updatedUser = await User.findOneAndUpdate(
          { email, provider },
          {
            $set: {
              name,
              email,
              password,
              role,
              provider,
              socialId,
              image,
            },
          }
        );

        return res.status(201).send({
          status: true,
          message: `user of  ${provider} login already registered!`,
          data: updatedUser,
        });
      }

      await User.findOneAndDelete({ email, provider });

      // return res
      //   .status(409)
      //   .send({ message: "Email already exists with this role" });
    }

    // Check for role validity
    if (role && !ROLES.includes(role)) {
      return res.status(400).send({ message: "Invalid role provided" });
    }

    // Hash password and create user

    const newUser = new User({
      name,
      email,
      password,
      role: role || "user",
      provider,
      status: "registered",
      socialId: socialId || "",
      image,
    });
    const savedUser = await newUser.save();

    res.status(201).send({
      status: true,
      message: "User registered successfully!",
      data: savedUser,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = register;
