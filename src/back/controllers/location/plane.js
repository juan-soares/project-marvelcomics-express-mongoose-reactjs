const messages = require("../../messages");
const LocationPlane = require("../../models/location/plane");

async function getLocationPlane(req, res) {
  const locationPlaneList = await LocationPlane.find().populate("status");

  if (locationPlaneList.length === 0) {
    res.status(400).json(messages.notFound);
  } else {
    res.status(200).json(locationPlaneList);
  }
}

async function postLocationPlane(req, res) {
  const newLocationPlane = new LocationPlane({
    name: req.body.name,
    status: req.body.status,
  });

  await newLocationPlane.save((err) => {
    // eslint-disable-next-line no-undef
    if (err) handleError(err);
  });

  res.status(200).json(messages.sucessSave);
}

async function putLocationPlane(req, res) {
  await LocationPlane.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    status: req.body.status,
  });
  res.status(200).json(messages.sucessSave);
}

async function deleteLocationPlane(req, res) {
  const PlaneToDelete = await LocationPlane.findByIdAndDelete(req.body.id)
    .then(() => messages.sucessSave)
    .catch(() => messages.notFound);

  res.status(200).json(PlaneToDelete);
}

module.exports = {
  getLocationPlane,
  postLocationPlane,
  putLocationPlane,
  deleteLocationPlane,
};
