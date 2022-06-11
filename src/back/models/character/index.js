const mongoose = require("mongoose");

const characterSchema = new mongoose.Schema({
  origin: {
    plane: { type: mongoose.Schema.Types.ObjectId, ref: "LocationPlane" },
    galaxy: { type: mongoose.Schema.Types.ObjectId, ref: "LocationGalaxy" },
    planet: { type: mongoose.Schema.Types.ObjectId, ref: "LocationPlanet" },
    locality: { type: mongoose.Schema.Types.ObjectId, ref: "LocationLocality" },
  },
  affiliations: [
    { type: mongoose.Schema.Types.ObjectId, ref: "CharacterAffiliation" },
  ],
  codenames: [
    { type: mongoose.Schema.Types.ObjectId, ref: "CharacterCodename" },
  ],
  race: { type: mongoose.Schema.Types.ObjectId, ref: "CharacterRace" },
  status: { type: mongoose.Schema.Types.ObjectId, ref: "CharacterStatus" },
  earth: { type: mongoose.Schema.Types.ObjectId, ref: "Earth" },
  name: { type: String, required: true },
  pictureOne: [{ type: String, default: "/images/characters/no_image.jpg" }],
  pictureTwo: [{ type: String, default: "/images/characters/no_image.jpg" }],
  occupations: { type: String, default: "?" },
});

module.exports = mongoose.model("Character", characterSchema, "characters");
