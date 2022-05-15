var express = require("express");
var router = express.Router();

const {
  getLocationGalaxy,
  postLocationGalaxy,
  deleteLocationGalaxy,
  putLocationGalaxy,
} = require("../../controllers/location/galaxy");

router.get("/", getLocationGalaxy);
router.post("/", postLocationGalaxy);
router.put("/", putLocationGalaxy);
router.delete("/", deleteLocationGalaxy);

module.exports = router;
