var express = require("express");
var router = express.Router();

const {
  getComic,
  postComic,
  deleteComic,
  putComic,
} = require("../../controllers/comic");

router.get("/", getComic);
router.post("/", postComic);
router.put("/", putComic);
router.delete("/", deleteComic);

module.exports = router;
