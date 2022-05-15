require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database Ok!"))
  .catch((e) => console.log(e));

module.exports = mongoose;
