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
   "2019-03-13",
   "2019-04-10",
   "2019-05-08",
   "2019-06-12",
   "2019-07-10"
  ]
   
  let n = 1;

  dates.map(async (date) => {
    let c = new Comic({
      vol: "Age of X-Man: Apocalypse & the X-Tracts Vol 1",
      cover: `/images/covers/Age_of_X-Man_Apocalypse_The_X-Tracts_Vol_1_${n}.jpg`,
      //cover: "/images/covers/no_cover.jpg",
      //irrelevant: true,
      downloaded: true,
      translated: true,
      nameBra: "Era do X-Man - Apocalipse & os X-Tratores v1",
      date: date,
      readen: false,
      earths: ["62a5421acc8a92fac50099af"],
      newCharacters: [],
      stories: "?",
      arc: "Age of X-Man",
    });

    c.nameUsa = `${c.vol} #${n}`;

    //if (n === 11) c.arc = "Age of Ultron";
    
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
