const messages = require("../../messages");
const LocationLocality = require("../../models/location/locality");

async function getLocationLocality(req, res) {
  const locationLocalityList = await LocationLocality.find().populate("status");

  if (locationLocalityList.length === 0) {
    res.status(400).json(messages.notFound);
  } else {
    res.status(200).json(locationLocalityList);
  }
}

async function postLocationLocality(req, res) {
  const newLocationLocality = new LocationLocality({
    name: req.body.name,
    status: req.body.status,
  });

  await newLocationLocality.save((err) => {
    // eslint-disable-next-line no-undef
    if (err) handleError(err);
  });

  res.status(200).json(messages.sucessSave);
}

async function putLocationLocality(req, res) {
  await LocationLocality.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    status: req.body.status,
  });
  res.status(200).json(messages.sucessSave);
}

async function deleteLocationLocality(req, res) {
  const localityToDelete = await LocationLocality.findByIdAndDelete(req.body.id)
    .then(() => messages.sucessSave)
    .catch(() => messages.notFound);

  res.status(200).json(localityToDelete);
}

module.exports = {
  getLocationLocality,
  postLocationLocality,
  putLocationLocality,
  deleteLocationLocality,
};
