const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: String,
  businessId: String,
  rating: Number,
  comment: String,
  approved: { type: Boolean, default: false }
});

module.exports = mongoose.model("Review", ReviewSchema);
