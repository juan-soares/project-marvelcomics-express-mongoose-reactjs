const messages = require("../../messages");
const CharacterCodename = require("../../models/character/codename");

async function getCharacterCodename(req, res) {
  const characterCodenameList = await CharacterCodename.find();

  if (characterCodenameList.length === 0) {
    res.status(400).json(messages.notFound);
  } else {
    res.json(characterCodenameList);
  }
}

async function postCharacterCodename(req, res) {
  const newCharacterCodename = new CharacterCodename({
    name: req.body.name,
  });

  await newCharacterCodename.save((err) => {
    // eslint-disable-next-line no-undef
    if (err) handleError(err);
  });

  res.status(200).json(messages.sucessSave);
}

async function putCharacterCodename(req, res) {
  await CharacterCodename.findByIdAndUpdate(req.body._id, {
    name: req.body.name,
  });
  res.status(200).json(messages.sucessSave);
}

async function deleteCharacterCodename(req, res) {
  const statusToDelete = await CharacterCodename.findByIdAndDelete(req.body.id)
    .then(() => messages.sucessSave)
    .catch(() => messages.notFound);

  res.status(200).json(statusToDelete);
}

module.exports = {
  getCharacterCodename,
  postCharacterCodename,
  putCharacterCodename,
  deleteCharacterCodename,
};
