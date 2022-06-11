const messages = require("../../messages");
const CharacterStatus = require("../../models/character/Status");

async function getCharacterStatus(req, res) {
  const characterStatusList = await CharacterStatus.find();

  if (characterStatusList.length === 0) {
    res.status(400).json(messages.notFound);
  } else {
    res.json(characterStatusList);
  }
}

async function postCharacterStatus(req, res) {
  const newCharacterStatus = new CharacterStatus({
    name: req.body.name,
    description: req.body.description,
  });

  await newCharacterStatus.save((err) => {
    // eslint-disable-next-line no-undef
    if (err) handleError(err);
  });

  res.status(200).json(messages.sucessSave);
}

async function putCharacterStatus(req, res) {
  await CharacterStatus.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
  });
  res.status(200).json(messages.sucessSave);
}

async function deleteCharacterStatus(req, res) {
  const statusToDelete = await CharacterStatus.findByIdAndDelete(req.body.id)
    .then(() => messages.sucessSave)
    .catch(() => messages.notFound);

  res.status(200).json(statusToDelete);
}

module.exports = {
  getCharacterStatus,
  postCharacterStatus,
  putCharacterStatus,
  deleteCharacterStatus,
};
