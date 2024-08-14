const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "User ID is required"],
  },
  description: {
    type: String,
  },
  image: {
    type: Array,
  },
  discount: {
    type: Number,
  },
  review: {
    type: Array,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
  ratings: {
    type: String,
  },
  company: {
    typr: String,
  },
  type: {
    typr: String,
  },
  metaKey: {
    typr: String,
  },
  stack: {
    typr: Boolean,
  },
  status: {
    typr: Boolean,
  },
  category: {
    typr: String,
  },
});

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;
