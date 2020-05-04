const debug = require("debug")("app:database");
const chalk = require("chalk");
const mongoose = require("mongoose");
const { database } = require("./keys");

mongoose
  .connect(database.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(db => debug(chalk.green("DB connected!!")))
  .catch(error => debug(chalk.red(error)));
