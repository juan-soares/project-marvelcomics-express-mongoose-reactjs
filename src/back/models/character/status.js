const mongoose = require("mongoose");

const CharacterStatusSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "?" },
});

module.exports = mongoose.model(
  "CharacterStatus",
  CharacterStatusSchema,
  "characterStatus"
);
