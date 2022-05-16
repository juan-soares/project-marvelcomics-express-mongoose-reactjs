const messages = require("../../messages");
const Earth = require("../../models/earth");

async function getEarth(req, res) {
  const EarthList = await Earth.find().populate("type").populate("status");

  if (EarthList.length === 0) {
    res.status(400).json(messages.notFound);
  } else {
    res.status(200).json(EarthList);
  }
}

async function postEarth(req, res) {
  const newEarth = new Earth({
    identification: req.body.identification,
    nameUsa: req.body.nameUsa,
    nameBra: req.body.nameBra,
    status: req.body.status,
    type: req.body.type,
    description: req.body.description,
  });

  await newEarth.save((err) => {
    // eslint-disable-next-line no-undef
    if (err) handleError(err);
  });

  res.status(200).json(messages.sucessSave);
}

async function putEarth(req, res) {
  await Earth.findByIdAndUpdate(req.body._id, {
    type: req.body.type,
    status: req.body.status,
  });
  res.status(200).json(messages.sucessSave);
}

async function deleteEarth(req, res) {
  const planetToDelete = await Earth.findByIdAndDelete(req.body.id)
    .then(() => messages.sucessSave)
    .catch(() => messages.notFound);

  res.status(200).json(planetToDelete);
}

module.exports = {
  getEarth,
  postEarth,
  putEarth,
  deleteEarth,
};
