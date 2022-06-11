const messages = require("../../messages");
const Character = require("../../models/character");

async function getCharacter(req, res) {
  const characterList = await Character.find()
    .populate("affiliations")
    .populate("codenames")
    .populate("race")
    .populate("status")
    .populate("earth")
    .populate("pictureOne")
    .populate("pictureTwo");

  if (characterList.length === 0) {
    res.status(400).json(messages.notFound);
  } else {
    res.status(200).json(characterList);
  }
}

async function postCharacter(req, res) {
  const newCharacter = new Character({
    affiliations: req.body.affiliations,
    codenames: req.body.codenames,
    race: req.body.race,
    status: req.body.status,
    earth: req.body.earth,
    name: req.body.name,
    occupations: req.body.occupations,
    origin: {
      galaxy: req.body.origin.galaxy,
      location: req.body.origin.location,
      plane: req.body.origin.plane,
      planet: req.body.origin.planet,
    },
  });

  if (req.body.pictureOne === "")
    newCharacter.pictureOne = "/images/characters/no_image.jpg";

  if (req.body.pictureTwo === "")
    newCharacter.pictureTwo = "/images/characters/no_image.jpg";

  await newCharacter.save((err) => {
    // eslint-disable-next-line no-undef
    if (err) handleError(err);
  });

  res.status(200).json(messages.sucessSave);
}

async function putCharacter(req, res) {
  let updatedCharacter = await Character.findById(req.body._id);

  if (typeof req.body.pictureOne === "string") {
    updatedCharacter.pictureOne?.push(
      `/images/characters/${req.body.pictureOne}.jpg`
    );
  }

  if (typeof req.body.pictureTwo === "string") {
    updatedCharacter.pictureTwo.push(
      `/images/characters/${req.body.pictureTwo}.jpg`
    );
  }

  await Character.findByIdAndUpdate(req.body._id, {
    affiliations: req.body.affiliations,
    codenames: req.body.codenames,
    race: req.body.race,
    status: req.body.status,
    earth: req.body.earth,
    name: req.body.name,
    occupations: req.body.occupations,
    pictureOne: updatedCharacter.pictureOne,
    pictureTwo: updatedCharacter.pictureTwo,
  });

  res.status(200).json(messages.sucessSave);
}

async function deleteCharacter(req, res) {
  const characterToDelete = await Character.findByIdAndDelete(req.body.id)
    .then(() => messages.sucessSave)
    .catch(() => messages.notFound);

  res.status(200).json(characterToDelete);
}

module.exports = {
  getCharacter,
  postCharacter,
  putCharacter,
  deleteCharacter,
};
