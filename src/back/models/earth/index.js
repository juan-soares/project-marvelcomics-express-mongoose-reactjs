const mongoose = require("mongoose");

const earthSchema = new mongoose.Schema({
  identification: { type: String, required: true },
  nameUsa: { type: String, required: true },
  nameBra: { type: String, default: "?" },
  description: { type: String, default: "?" },
  status: { type: mongoose.Schema.Types.ObjectId, ref: "EarthStatus" },
  type: { type: mongoose.Schema.Types.ObjectId, ref: "EarthType" },
});

module.exports = mongoose.model("Earth", earthSchema, "earths");
