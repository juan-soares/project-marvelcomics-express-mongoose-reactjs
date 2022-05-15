const mongoose = require("mongoose");

const locationLocalitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: mongoose.Schema.Types.ObjectId, ref: "LocationStatus" },
});

module.exports = mongoose.model(
  "LocationLocality",
  locationLocalitySchema,
  "locationLocalities"
);
