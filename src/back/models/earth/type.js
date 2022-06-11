const mongoose = require("mongoose");

const EarthTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "?" },
});

module.exports = mongoose.model("EarthType", EarthTypeSchema, "earthTypes");
