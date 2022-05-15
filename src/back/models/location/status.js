const mongoose = require("mongoose");

const locationStatusSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "?" },
});

module.exports = mongoose.model(
  "LocationStatus",
  locationStatusSchema,
  "locationStatus"
);