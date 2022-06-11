const mongoose = require("mongoose");

const comicSchema = new mongoose.Schema({
  nameUsa: { type: String, required: true },
  nameBra: { type: String, default: "?" },
  vol: { type: String, required: true },
  cover: { type: String, default: "/images/covers/no_cover.jpg" },
  downloaded: { type: Boolean, default: false },
  readen: { type: Boolean, default: false },
  translated: { type: Boolean, default: false },
  irrelevant: { type: Boolean, default: false },
  date: { type: String, required: true },
  earths: [{ type: mongoose.Schema.Types.ObjectId, ref: "Earth" }],
  newCharacters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Character" }],
  stories: { type: String, default: "?" },
});

module.exports = mongoose.model("Comic", comicSchema, "comics");
