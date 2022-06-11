var express = require("express");
var router = express.Router();

const {
  getCharacterStatus,
  postCharacterStatus,
  deleteCharacterStatus,
  putCharacterStatus,
} = require("../../controllers/character/Status");

router.get("/", getCharacterStatus);
router.post("/", postCharacterStatus);
router.put("/", putCharacterStatus);
router.delete("/", deleteCharacterStatus);

module.exports = router;
