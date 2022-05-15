const mongoose = require("mongoose");

const locationPlanetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  status: { type: mongoose.Schema.Types.ObjectId, ref: "LocationStatus" },
});

module.exports = mongoose.model(
  "LocationPlanet",
  locationPlanetSchema,
  "locationPlanets"
);
