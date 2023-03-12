const { Schema } = require("mongoose");

// for Teacher model
module.exports = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  major: {
    type: String,
    minlength: 5,
    maxlenth: 20,
    required: true,
  },
  address: {
    type: String,
    minlength: 5,
    maxlength: 512,
    required: true,
  },
  school: {
    type: Schema.Types.ObjectId,
    ref: "School",
    required: true,
  },
  classe: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
});
