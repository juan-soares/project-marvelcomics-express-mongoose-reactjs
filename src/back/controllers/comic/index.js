const messages = require("../../messages");
const Comic = require("../../models/Comic");

async function getComic(req, res) {
  const comicList = await Comic.find()
    .populate("earths")
    .populate({ path: "newCharacters", populate: "status" });

  if (comicList.length === 0) {
    res.status(400).json(messages.notFound);
  } else {
    res.status(200).json(comicList);
  }
}

async function postComic(req, res) {
  
  
  // ADD-BY-LOTS
  const dates = [
    "1979-10-16",
    "1979-11-20",
    "1979-12-18",
    "1980-01-15",
    "1980-02-19",
    "1980-03-18",
    "1980-04-15",
    "1980-05-20",
    "1980-06-17",
    "1980-07-15",
    "1980-08-19",
    "1980-09-16",
    "1980-10-21",
    "1980-11-18",
    "1980-16-12",
    "1981-01-13",
    "1981-02-17",
    "1981-03-17",
    "1981-04-14",
    "1981-05-12",
    "1981-06-09",
    "1981-07-14",
    "1981-08-11",
    "1981-09-08",
    "1981-10-13",
    "1981-11-10",
    "1981-08-12",
    "1982-01-12",
    "1982-02-09",
    "1982-03-09",
    "1982-04-06",
    "1982-05-04",
    "1982-06-08",
    "1982-07-06",
    "1982-08-10",
    "1982-09-07",
    "1982-10-12",
    "1982-11-09",
    "1982-12-07",
    "1983-01-11",
    "1983-02-08",
    "1983-03-08",
    "1983-04-05"

  ];
  let n = "243";

  dates.map(async (date) => {
    let c = new Comic({
      date: date,
      nameUsa: `Incredible Hulk Vol 1 #${n}`,
      nameBra: "?",
      vol: "Incredible Hulk Vol 1",
      downloaded: false,
      readen: false,
      translated: false,
      earths: ["62a5421acc8a92fac50099af"],
      newCharacters: [],
      stories: "?",
      arc: "?",
      cover: `/images/covers/Incredible_Hulk_Vol_1_${n}.jpg`,
    });

    n++;

    await c.save((err) => {
      // eslint-disable-next-line no-undef
      if (err) handleError(err);
    });
  });


  // ADD-BY-ONE
  /* const newComic = new Comic({
    date: req.body.date,
    nameUsa: req.body.nameUsa,
    nameBra: req.body.nameBra,
    vol: req.body.vol,
    downloaded: false,
    readen: false,
    translated: false,
    earths: req.body.earths,
    newCharacters: req.body.newCharacters,
    stories: req.body.stories,
    arc: req.body.arc,
  });

  if (req.body.cover === "") {
    newComic.cover = "/images/covers/no_cover.jpg";
    newComic.irrelevant = true;
  } else {
    newComic.cover = "/images/covers/" + req.body.cover;
  }

  await newComic.save((err) => {
    // eslint-disable-next-line no-undef
    if (err) handleError(err);
  }); */

  res.status(200).json(messages.sucessSave);
}

async function putComic(req, res) {
  let updatedComic = {
    nameUsa: req.body.nameUsa,
    nameBra: req.body.nameBra,
    vol: req.body.vol,
    downloaded: req.body.downloaded,
    irrelevant: req.body.irrelevant,
    readen: req.body.readen,
    translated: req.body.translated,
    date: req.body.date,
    earths: req.body.earths,
    newCharacters: req.body.newCharacters,
    stories: req.body.stories,
    arc: req.body.arc,
  };

  if (req.body.cover !== "")
    updatedComic.cover = "/images/covers/" + req.body.cover;

  await Comic.findByIdAndUpdate(req.body._id, updatedComic);

  res.status(200).json(messages.sucessSave);
}

async function deleteComic(req, res) {
  const ComicToDelete = await Comic.findByIdAndDelete(req.body.id)
    .then(() => messages.sucessSave)
    .catch(() => messages.notFound);

  res.status(200).json(ComicToDelete);
}

module.exports = {
  getComic,
  postComic,
  putComic,
  deleteComic,
};
