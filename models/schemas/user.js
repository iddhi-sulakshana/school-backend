const { Schema } = require("mongoose");

// for User model
module.exports = new Schema({
  name: {
    type: String,
    minlength: 5,
    maxlenth: 20,
    required: true,
  },
  picture: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
    default: "default.png",
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["student", "teacher", "sAdmin", "dAdmin"],
    required: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
});
