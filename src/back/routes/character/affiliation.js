var express = require("express");
var router = express.Router();

const {
  getCharacterAffiliation,
  postCharacterAffiliation,
  deleteCharacterAffiliation,
  putCharacterAffiliation,
} = require("../../controllers/character/Affiliation");

router.get("/", getCharacterAffiliation);
router.post("/", postCharacterAffiliation);
router.put("/", putCharacterAffiliation);
router.delete("/", deleteCharacterAffiliation);

module.exports = router;
