const express = require("express");
const morgan = require("morgan");
const path = require("path");

// middlewares
const error = require("../middlewares/error");
const fileUpload = require("express-fileupload");

// routes
const home = require("../routes/home");
const users = require("../routes/users");
const students = require("../routes/students");
const classes = require("../routes/classes");

module.exports = function (app) {
  // middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    fileUpload({
      limits: {
        fileSize: 10000000, // Around 10MB
      },
      abortOnLimit: true,
    })
  );
  if (process.env.NODE_ENV === "development") app.use(morgan("tiny"));
  // assign public folder
  app.use(express.static("public"));

  // assign route paths
  app.use("/", home);
  app.use("/users", users);
  app.use("/students", students);
  app.use("/classes", classes);

  app.use(error);
};
