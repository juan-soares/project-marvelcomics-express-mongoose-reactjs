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
   "2014-10-29",
   "2014-11-26",
   "2014-12-17",
   "2015-01-14",
   "2015-02-18",
   "2015-03-25",
   "2015-04-15",
   "2015-05-20",
   "2015-06-17",
   "2015-07-29"
  ]
   
  let n = 1;

  dates.map(async (date) => {
    let c = new Comic({
      vol: "Deathlok Vol 5",
      cover: `/images/covers/Deathlok_Vol_5_${n}.jpg`,
      //cover: "/images/covers/no_cover.jpg",
      //irrelevant: true,
      downloaded: true,
      translated: false,
      nameBra: "Deathlok v1",
      date: date,
      readen: false,
      earths: ["62a5421acc8a92fac50099af"],
      newCharacters: [],
      stories: "?",
      arc: "?",
    });

    c.nameUsa = `${c.vol} #${n}`;

  // if (n < 11) c.translated = true;
 if (n < 7 ) c.arc = "Avengers NOW!";

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
