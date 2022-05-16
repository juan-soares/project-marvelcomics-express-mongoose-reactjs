const mongoose = require("mongoose");

const CharacterCodenameSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

module.exports = mongoose.model(
  "CharacterCodename",
  CharacterCodenameSchema,
  "characterCodenames"
);
