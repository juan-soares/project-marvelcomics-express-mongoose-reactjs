var express = require("express");
var router = express.Router();

const {
  getLocationPlane,
  postLocationPlane,
  deleteLocationPlane,
  putLocationPlane,
} = require("../../controllers/location/plane");

router.get("/", getLocationPlane);
router.post("/", postLocationPlane);
router.put("/", putLocationPlane);
router.delete("/", deleteLocationPlane);

module.exports = router;
