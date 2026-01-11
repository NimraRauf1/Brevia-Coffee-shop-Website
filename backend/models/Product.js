const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  customization: {
    milk: [String],
    sugar: [String],
    size: [String]
  }
});

module.exports = mongoose.model("Product", ProductSchema);
