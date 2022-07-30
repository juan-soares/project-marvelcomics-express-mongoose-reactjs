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
   "2004-05-26",
   "2004-06-23",
   "2004-07-28",
   "2004-08-25",
   "2004-09-22",
   "2004-11-03",
   "2004-12-22",
   "2005-02-16",
   "2005-03-30",
   "2005-05-11",
   "2005-07-20",
   "2005-08-31",
   "2006-02-22",
   "2006-04-26",
   "2006-06-21",
   "2006-08-23",
   "2006-09-20",
   "2006-11-15",
   "2006-12-28",
   "2007-02-14",
   "2007-05-02",
   "2007-08-22",
   "2007-11-07",
   "2008-01-23",
   "2008-07-02",
   "2008-08-13",
   "2008-10-15",
   "2009-01-21",
   "2009-04-22",
   "2009-06-24",
   "2009-10-07",
   "2009-11-04",
   "2009-12-16",
   "2010-06-30",
   "2010-08-25",
   "2011-02-23",
   "2011-05-11",
   "2011-05-18",
   "2011-06-01",
   "2011-07-27",
   "2011-08-24",
   "2011-09-28",
   "2011-10-26",
   "2011-11-23",
   "2011-12-28",
   "2012-01-25",
   "2012-02-29",
   "2012-03-28",
   "2012-04-25",
   "2012-05-23",
   "2012-06-20",
   "2012-07-25",
   "2012-08-22",
   "2012-09-26",
   "2012-10-24",
   "2012-11-21",
   "2012-12-19",
   "2013-01-23",
   "2013-02-27",
   "2013-03-27",
   "2013-04-17",
   "2013-05-08",
   "2013-06-12",
   "2013-07-10",
   "2013-08-14",
   "2013-08-28",
   "2013-09-11",
   "2013-10-09"
  ];

  let n = 1;

  dates.map(async (date) => {
    let c = new Comic({
      vol: "Astonishing X-Men Vol 3",
      cover: `/images/covers/Astonishing_X-Men_Vol_3_${n}.jpg`,
      //cover: "/images/covers/no_cover.jpg",
      //irrelevant: true,
      downloaded: true,
      translated: true,
      nameBra: "Surpreendentes X-Men v3",
      date: date,
      readen: false,
      earths: ["62a5421acc8a92fac50099af"],
      newCharacters: [],
      stories: "?",
      arc: "?",
    });

    c.nameUsa = `${c.vol} #${n}`;

    //if (n === 1) c.translated = true;
    if (n === 61) c.arc = "X-Termination";
    if (n === 60) c.arc = "X-Termination";
    if (n === 45) c.arc = "Regenesis";
    if (n === 44) c.arc = "Regenesis";
    if (n === 35) c.arc = "eXogenetic";
    if (n === 34) c.arc = "eXogenetic";
    if (n === 33) c.arc = "eXogenetic";
    if (n === 32) c.arc = "eXogenetic";
    if (n === 31) c.arc = "eXogenetic";
    if (n === 30) c.arc = "Manifest Destiny / Ghost Box";
    if (n === 29) c.arc = "Manifest Destiny / Ghost Box";
    if (n === 28) c.arc = "Manifest Destiny / Ghost Box";
    if (n === 27) c.arc = "Manifest Destiny / Ghost Box";
    if (n === 26) c.arc = "Manifest Destiny / Ghost Box";
    if (n === 25) c.arc = "Manifest Destiny / Ghost Box";
    if (n < 7) c.arc = "Gifted";
    
    
    
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
