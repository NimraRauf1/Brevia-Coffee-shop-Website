const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  productId: String,
  rating: Number,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Review", ReviewSchema);
