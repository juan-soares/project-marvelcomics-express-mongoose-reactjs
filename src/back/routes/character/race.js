var express = require("express");
var router = express.Router();

const {
  getCharacterRace,
  postCharacterRace,
  deleteCharacterRace,
  putCharacterRace,
} = require("../../controllers/character/Race");

router.get("/", getCharacterRace);
router.post("/", postCharacterRace);
router.put("/", putCharacterRace);
router.delete("/", deleteCharacterRace);

module.exports = router;
