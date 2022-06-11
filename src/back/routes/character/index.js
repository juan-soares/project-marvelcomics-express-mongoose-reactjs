var express = require("express");
var router = express.Router();
var routesCharacter = require("./character");
var routesCharacterCodename = require("./codename");
var routesCharacterAffiliation = require("./affiliation");
var routesCharacterRace = require("./race");
var routesCharacterStatus = require("./status");

router.use("/", routesCharacter);
router.use("/codename", routesCharacterCodename);
router.use("/affiliation", routesCharacterAffiliation);
router.use("/race", routesCharacterRace);
router.use("/status", routesCharacterStatus);

module.exports = router;
