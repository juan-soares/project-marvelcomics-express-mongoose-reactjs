var express = require("express");
var router = express.Router();

const {
  getLocationStatus,
  postLocationStatus,
  deleteLocationStatus,
  putLocationStatus,
} = require("../../controllers/location/status");

router.get("/", getLocationStatus);
router.post("/", postLocationStatus);
router.put("/", putLocationStatus);
router.delete("/", deleteLocationStatus);

module.exports = router;