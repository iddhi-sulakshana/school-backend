require("dotenv").config();

module.exports = function () {
  process.env.NODE_ENV = process.env.NODE_ENV
    ? process.env.NODE_ENV
    : "development";

  process.env.JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY
    ? process.env.JWT_PRIVATE_KEY
    : "ExampleKey";

  process.env.DB = process.env.DB
    ? process.env.DB
    : "mongodb://127.0.0.1/SchoolSystem";
};
