const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("../../config/mongo");
const routesLocation = require("./routes/location");
const routesEarth = require("./routes/earth");
const routesCharacter = require("./routes/character");
const routesComic = require("./routes/comic");
const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

app.use("/location", routesLocation);
app.use("/earth", routesEarth);
app.use("/character", routesCharacter);
app.use("/comic", routesComic);

module.exports = app;
