const { Schema } = require("mongoose");

// for School model
module.exports = new Schema({
  name: {
    type: String,
    minlength: 5,
    maxlenth: 255,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  studentCount: {
    type: Number,
    minlength: 0,
    default: 0,
  },
  teacherCount: {
    type: Number,
    minlength: 0,
    default: 0,
  },
});
