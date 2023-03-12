const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  const databaseString = process.env.NODE_ENV
    ? `${process.env.db}_${process.env.NODE_ENV}`
    : process.env.db;
  winston.info("Connecting to MongoDB at " + databaseString + "...");
  mongoose
    .connect(databaseString)
    .then(() =>
      winston.info("Connected to MongoDB at " + databaseString + " ✔️")
    )
    .catch((ex) => {
      winston.error(
        "Failed to connect to MongoDB at " + databaseString + " ❌"
      );
      process.exit(1);
    });
};
