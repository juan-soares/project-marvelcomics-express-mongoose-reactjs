var express = require("express");
var router = express.Router();

const {
  getLocationPlanet,
  postLocationPlanet,
  deleteLocationPlanet,
  putLocationPlanet,
} = require("../../controllers/location/planet");

router.get("/", getLocationPlanet);
router.post("/", postLocationPlanet);
router.put("/", putLocationPlanet);
router.delete("/", deleteLocationPlanet);

module.exports = router;
