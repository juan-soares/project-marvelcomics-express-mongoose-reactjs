const mongoose = require("mongoose");

const CharacterRaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "?" },
});

module.exports = mongoose.model(
  "CharacterRace",
  CharacterRaceSchema,
  "characterRaces"
);
