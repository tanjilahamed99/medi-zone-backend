require("dotenv").config();

const config = {
  LOCAL_CLIENT: process.env.LOCAL_CLIENT,
  CLIENT: process.env.CLIENT,
  ROLES: ["admin", "user", "superAdmin"],
};

module.exports = Object.freeze(config);
