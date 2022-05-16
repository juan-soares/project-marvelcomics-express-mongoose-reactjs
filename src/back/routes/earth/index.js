var express = require("express");
var router = express.Router();
var routesEarth = require("./earth");
var routesEarthStatus = require("./status");
var routesEarthType = require("./type");

router.use("/", routesEarth);
router.use("/status", routesEarthStatus);
router.use("/type", routesEarthType);

module.exports = router;
