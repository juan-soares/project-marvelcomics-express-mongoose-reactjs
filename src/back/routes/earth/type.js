var express = require("express");
var router = express.Router();

const {
  getEarthType,
  postEarthType,
  deleteEarthType,
  putEarthType,
} = require("../../controllers/earth/type");

router.get("/", getEarthType);
router.post("/", postEarthType);
router.put("/", putEarthType);
router.delete("/", deleteEarthType);

module.exports = router;
