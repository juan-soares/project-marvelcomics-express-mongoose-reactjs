const mongoose = require("mongoose");

const CharacterAffiliationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: "?" },
});

module.exports = mongoose.model(
  "CharacterAffiliaton",
  CharacterAffiliationSchema,
  "characterAffiliatons"
);
