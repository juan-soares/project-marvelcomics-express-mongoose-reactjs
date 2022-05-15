const messages = require("../../messages");
const LocationPlanet = require("../../models/location/planet");

async function getLocationPlanet(req, res) {
  const locationPlanetList = await LocationPlanet.find().populate("status");

  if (locationPlanetList.length === 0) {
    res.status(400).json(messages.notFound);
  } else {
    res.status(200).json(locationPlanetList);
  }
}

async function postLocationPlanet(req, res) {
  const newLocationPlanet = new LocationPlanet({
    name: req.body.name,
    status: req.body.status,
  });

  await newLocationPlanet.save((err) => {
    // eslint-disable-next-line no-undef
    if (err) handleError(err);
  });

  res.status(200).json(messages.sucessSave);
}

async function putLocationPlanet(req, res) {
  await LocationPlanet.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    status: req.body.status,
  });
  res.status(200).json(messages.sucessSave);
}

async function deleteLocationPlanet(req, res) {
  const planetToDelete = await LocationPlanet.findByIdAndDelete(req.body.id)
    .then(() => messages.sucessSave)
    .catch(() => messages.notFound);

  res.status(200).json(planetToDelete);
}

module.exports = {
  getLocationPlanet,
  postLocationPlanet,
  putLocationPlanet,
  deleteLocationPlanet,
};
