const messages = require("../../messages");
const EarthStatus = require("../../models/earth/status");

async function getEarthStatus(req, res) {
  const earthStatusList = await EarthStatus.find();

  if (earthStatusList.length === 0) {
    res.status(400).json(messages.notFound);
  } else {
    res.json(earthStatusList);
  }
}

async function postEarthStatus(req, res) {
  const newearthStatus = new EarthStatus({
    name: req.body.name,
    description: req.body.description,
  });

  await newearthStatus.save((err) => {
    // eslint-disable-next-line no-undef
    if (err) handleError(err);
  });

  res.status(200).json(messages.sucessSave);
}

async function putEarthStatus(req, res) {
  await EarthStatus.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
  });
  res.status(200).json(messages.sucessSave);
}

async function deleteEarthStatus(req, res) {
  const statusToDelete = await EarthStatus.findByIdAndDelete(req.body.id)
    .then(() => messages.sucessSave)
    .catch(() => messages.notFound);

  res.status(200).json(statusToDelete);
}

module.exports = {
  getEarthStatus,
  postEarthStatus,
  putEarthStatus,
  deleteEarthStatus,
};
