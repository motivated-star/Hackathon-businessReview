const mongoose = require("mongoose");

const BusinessSchema = new mongoose.Schema({
  name: String,
  category: String,
  location: String,
  avgRating: { type: Number, default: 0 }
});

module.exports = mongoose.model("Business", BusinessSchema);
