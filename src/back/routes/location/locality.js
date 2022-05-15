var express = require("express");
var router = express.Router();

const {
  getLocationLocality,
  postLocationLocality,
  deleteLocationLocality,
  putLocationLocality,
} = require("../../controllers/location/locality");

router.get("/", getLocationLocality);
router.post("/", postLocationLocality);
router.put("/", putLocationLocality);
router.delete("/", deleteLocationLocality);

module.exports = router;
