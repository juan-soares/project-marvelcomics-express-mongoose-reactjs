const messages = require("../../messages");
const Comic = require("../../models/Comic");

async function getComic(req, res) {
  const comicList = await Comic.find()
    .populate("earths")
    .populate({ path: "newCharacters", populate: "status" });

  if (comicList.length === 0) {
    res.status(400).json(messages.notFound);
  } else {
    res.status(200).json(comicList.reverse());
  }
}

async function postComic(req, res) {
  // ADD-BY-LOTS
  const dates = [
    "2019-11-06",
    "2019-11-27",
    "2019-12-11",
    "2019-12-18",
    "2020-01-08",
    "2020-01-29",
    "2020-02-19",
    "2020-02-26",
    "2020-03-11",
    "2020-06-10",
    "2020-07-22",
    "2020-09-02",
    "2020-10-14",
    "2020-12-16",
    "2021-01-27",
    "2021-02-24",
    "2021-04-28",
    "2021-05-26",
    "2021-06-16",
    "2021-07-21",
    "2021-09-01",
    "2021-10-06",
    "2021-12-01",
    "2022-02-09",
    "2022-05-18",
    "2022-06-22",
    "2022-07-13"
  ]
   
  let n = 1;

  dates.map(async (date) => {
    let c = new Comic({
      vol: "New Mutants Vol 4",
      cover: `/images/covers/New_Mutants_Vol_4_${n}.jpg`,
      //cover: "/images/covers/no_cover.jpg",
      //irrelevant: true,
      downloaded: true,
      translated: false,
      nameBra: "Novos Mutantes v4",
      date: date,
      readen: false,
      earths: ["62a5421acc8a92fac50099af"],
      newCharacters: [],
      stories: "?",
      arc: "?",
    });

    c.nameUsa = `${c.vol} #${n}`;

    if (n < 16) c.translated = true;
    if (n === 25) c.arc = "Destiny of X";
    if (n === 20) c.arc = "Hellfire Gala";
    if (n === 19) c.arc = "Hellfire Gala";
    if (n === 14) c.arc = "Reign of X";
    if (n === 13) c.arc = "X of Swords";
    if (n === 6) c.arc = "Dawn of X";
    if (n === 5) c.arc = "Dawn of X";
    if (n === 4) c.arc = "Dawn of X";
    if (n === 3) c.arc = "Dawn of X";
    if (n === 2) c.arc = "Dawn of X";
    if (n === 1) c.arc = "Dawn of X";

    
    console.log(c);
    n++;

    await c.save((err) => {
      // eslint-disable-next-line no-undef
      if (err) handleError(err);
    });
  });

  /*   // ADD-BY-ONE
  const newComic = new Comic({
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
