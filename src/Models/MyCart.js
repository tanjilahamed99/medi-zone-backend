const mongoose = require("mongoose");

const cartsSchema = mongoose.Schema({
  userName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  myCartsData: {
    type: Array,
  },
});

const Carts = mongoose.model("CartsData", cartsSchema);

module.exports = Carts;
