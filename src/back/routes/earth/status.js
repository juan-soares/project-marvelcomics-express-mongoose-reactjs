var express = require("express");
var router = express.Router();

const {
  getEarthStatus,
  postEarthStatus,
  deleteEarthStatus,
  putEarthStatus,
} = require("../../controllers/earth/status");

router.get("/", getEarthStatus);
router.post("/", postEarthStatus);
router.put("/", putEarthStatus);
router.delete("/", deleteEarthStatus);

module.exports = router;
