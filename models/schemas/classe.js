const { Schema } = require("mongoose");

// for Classe model
module.exports = new Schema({
  grade: {
    type: Number,
    minlength: 1,
    maxlength: 20,
    required: true,
  },
  name: {
    type: String,
    minlength: 1,
    maxlenth: 20,
    required: true,
  },
  year: {
    type: Number,
    minlength: 2000,
    maxlength: 2100,
    required: true,
  },
  studentCount: {
    type: Number,
    minlength: 0,
    default: 0,
  },
});
