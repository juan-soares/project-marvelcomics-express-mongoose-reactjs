const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("../../config/mongo");
const routesLocation = require("./routes/location");
const routesEarth = require("./routes/earth/index");
const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

app.use("/location", routesLocation);
app.use("/earth", routesEarth);


module.exports = app;
