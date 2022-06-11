var express = require("express");
var router = express.Router();

const {
  getCharacterCodename,
  postCharacterCodename,
  deleteCharacterCodename,
  putCharacterCodename,
} = require("../../controllers/character/codename");

router.get("/", getCharacterCodename);
router.post("/", postCharacterCodename);
router.put("/", putCharacterCodename);
router.delete("/", deleteCharacterCodename);

module.exports = router;
