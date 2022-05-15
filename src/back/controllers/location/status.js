const messages = require("../../messages");
const LocationStatus = require("../../models/location/status");

async function getLocationStatus(req, res) {
  const locationStatusList = await LocationStatus.find();

  if (locationStatusList.length === 0) {
    res.status(400).json(messages.notFound);
  } else {
    res.json(locationStatusList);
  }
}

async function postLocationStatus(req, res) {
  const newLocationStatus = new LocationStatus({
    name: req.body.name,
    description: req.body.description,
  });

  await newLocationStatus.save((err) => {
    // eslint-disable-next-line no-undef
    if (err) handleError(err);
  });

  res.status(200).json(messages.sucessSave);
}

async function putLocationStatus(req, res) {
  await LocationStatus.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
  });
  res.status(200).json(messages.sucessSave);
}

async function deleteLocationStatus(req, res) {
  const statusToDelete = await LocationStatus.findByIdAndDelete(req.body.id)
    .then(() => messages.sucessSave)
    .catch(() => messages.notFound);

  res.status(200).json(statusToDelete);
}

module.exports = {
  getLocationStatus,
  postLocationStatus,
  putLocationStatus,
  deleteLocationStatus,
};
