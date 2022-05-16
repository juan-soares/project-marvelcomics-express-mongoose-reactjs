var express = require("express");
var router = express.Router();

const {
  getEarth,
  postEarth,
  deleteEarth,
  putEarth,
} = require("../../controllers/earth");

router.get("/", getEarth);
router.post("/", postEarth);
router.put("/", putEarth);
router.delete("/", deleteEarth);

module.exports = router;
