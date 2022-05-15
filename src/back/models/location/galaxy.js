const mongoose = require("mongoose");

const locationGalaxySchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: mongoose.Schema.Types.ObjectId, ref: "LocationStatus" },
});

module.exports = mongoose.model(
  "LocationGalaxy",
  locationGalaxySchema,
  "locationGalaxies"
);
