const mongoose = require("mongoose");

const locationPlaneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: mongoose.Schema.Types.ObjectId, ref: "LocationStatus" },
});

module.exports = mongoose.model(
  "LocationPlane",
  locationPlaneSchema,
  "locationPlanes"
);
