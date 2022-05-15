var express = require("express");
var router = express.Router();
var routesLocationStatus = require("./status");
var routesLocationPlane = require("./plane");
var routesLocationGalaxy = require("./galaxy");
var routesLocationPlanet = require("./planet");
var routesLocationLocality = require("./locality");

router.use("/status", routesLocationStatus);
router.use("/plane", routesLocationPlane);
router.use("/galaxy", routesLocationGalaxy);
router.use("/planet", routesLocationPlanet);
router.use("/locality", routesLocationLocality);

module.exports = router;
