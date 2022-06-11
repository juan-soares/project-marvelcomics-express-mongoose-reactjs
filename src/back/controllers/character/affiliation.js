const messages = require("../../messages");
const CharacterAffiliation = require("../../models/character/Affiliation");

async function getCharacterAffiliation(req, res) {
  const characterAffiliationList = await CharacterAffiliation.find();

  if (characterAffiliationList.length === 0) {
    res.status(400).json(messages.notFound);
  } else {
    res.json(characterAffiliationList);
  }
}

async function postCharacterAffiliation(req, res) {
  const newCharacterAffiliation = new CharacterAffiliation({
    name: req.body.name,
    description: req.body.description,
  });

  await newCharacterAffiliation.save((err) => {
    // eslint-disable-next-line no-undef
    if (err) handleError(err);
  });

  res.status(200).json(messages.sucessSave);
}

async function putCharacterAffiliation(req, res) {
  await CharacterAffiliation.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
    description: req.body.description,
  });
  res.status(200).json(messages.sucessSave);
}

async function deleteCharacterAffiliation(req, res) {
  const statusToDelete = await CharacterAffiliation.findByIdAndDelete(
    req.body.id
  )
    .then(() => messages.sucessSave)
    .catch(() => messages.notFound);

  res.status(200).json(statusToDelete);
}

module.exports = {
  getCharacterAffiliation,
  postCharacterAffiliation,
  putCharacterAffiliation,
  deleteCharacterAffiliation,
};
