var express = require("express");
var router = express.Router();

const {
  getCharacter,
  postCharacter,
  deleteCharacter,
  putCharacter,
} = require("../../controllers/character");

router.get("/", getCharacter);
router.post("/", postCharacter);
router.put("/", putCharacter);
router.delete("/", deleteCharacter);

module.exports = router;
