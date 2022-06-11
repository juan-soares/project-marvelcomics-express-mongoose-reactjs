const messages = require("../../messages");
const CharacterRace = require("../../models/character/Race");

async function getCharacterRace(req, res) {
  const characterRaceList = await CharacterRace.find();

  if (characterRaceList.length === 0) {
    res.status(400).json(messages.notFound);
  } else {
    res.json(characterRaceList);
  }
}

async function postCharacterRace(req, res) {
  const newCharacterRace = new CharacterRace({
    name: req.body.name,
    description: req.body.description,
  });

  await newCharacterRace.save((err) => {
    // eslint-disable-next-line no-undef
    if (err) handleError(err);
  });

  res.status(200).json(messages.sucessSave);
}

async function putCharacterRace(req, res) {
  await CharacterRace.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
  });
  res.status(200).json(messages.sucessSave);
}

async function deleteCharacterRace(req, res) {
  const statusToDelete = await CharacterRace.findByIdAndDelete(req.body.id)
    .then(() => messages.sucessSave)
    .catch(() => messages.notFound);

  res.status(200).json(statusToDelete);
}

module.exports = {
  getCharacterRace,
  postCharacterRace,
  putCharacterRace,
  deleteCharacterRace,
};
