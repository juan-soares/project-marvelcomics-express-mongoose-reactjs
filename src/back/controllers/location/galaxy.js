const messages = require("../../messages");
const LocationGalaxy = require("../../models/location/galaxy");

async function getLocationGalaxy(req, res) {
  const locationGalaxyList = await LocationGalaxy.find().populate('status');

  if (locationGalaxyList.length === 0) {
    res.status(400).json(messages.notFound);
  } else {
    res.status(200).json(locationGalaxyList);
  }
}

async function postLocationGalaxy(req, res) {
  const newLocationGalaxy = new LocationGalaxy({
    name: req.body.name,
    status: req.body.status,
  });

  await newLocationGalaxy.save((err) => {
    // eslint-disable-next-line no-undef
    if (err) handleError(err);
  });

  res.status(200).json(messages.sucessSave);
}

async function putLocationGalaxy(req, res) {
  await LocationGalaxy.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    status: req.body.status,
  });
  res.status(200).json(messages.sucessSave);
}

async function deleteLocationGalaxy(req, res) {
  const galaxyToDelete = await LocationGalaxy.findByIdAndDelete(req.body.id)
    .then(() => messages.sucessSave)
    .catch(() => messages.notFound);

  res.status(200).json(galaxyToDelete);
}

module.exports = {
  getLocationGalaxy,
  postLocationGalaxy,
  putLocationGalaxy,
  deleteLocationGalaxy,
};
