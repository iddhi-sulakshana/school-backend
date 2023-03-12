const { Schema } = require("mongoose");

// for SchoolAdmin model
module.exports = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
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
  DOB: {
    type: Date,
    required: true,
  },
});
