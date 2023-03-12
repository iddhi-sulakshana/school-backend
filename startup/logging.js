const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  if (process.env.NODE_ENV === "development") {
    winston.add(
      new winston.transports.Console({
        format: winston.format.printf((log) => log.message),
      })
    );
  }

  // exception logging for file
  if (process.env.NODE_ENV !== "development") {
    winston.exceptions.handle(
      new winston.transports.File({ filename: "./logs/exceptions.log" })
    );

    winston.add(
      new winston.transports.File({ filename: "./logs/logfile.log" })
    );
    require("winston-mongodb");
    winston.add(
      new winston.transports.MongoDB({
        db: process.env.NODE_ENV
          ? `${process.env.db}_${process.env.NODE_ENV}`
          : process.env.db,
        level: "error",
      })
    );
  }
  return winston;
};
