const messages = require("../../messages");
const EarthType = require("../../models/earth/type");

async function getEarthType(req, res) {
  const EarthTypeList = await EarthType.find();

  if (EarthTypeList.length === 0) {
    res.status(400).json(messages.notFound);
  } else {
    res.json(EarthTypeList);
  }
}

async function postEarthType(req, res) {
  const newEarthType = new EarthType({
    name: req.body.name,
    description: req.body.description,
  });

  await newEarthType.save((err) => {
    // eslint-disable-next-line no-undef
    if (err) handleError(err);
  });

  res.status(200).json(messages.sucessSave);
}

async function putEarthType(req, res) {
  await EarthType.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
  });
  res.status(200).json(messages.sucessSave);
}

async function deleteEarthType(req, res) {
  const statusToDelete = await EarthType.findByIdAndDelete(req.body.id)
    .then(() => messages.sucessSave)
    .catch(() => messages.notFound);

  res.status(200).json(statusToDelete);
}

module.exports = {
  getEarthType,
  postEarthType,
  putEarthType,
  deleteEarthType,
};
