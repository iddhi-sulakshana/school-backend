const { Schema } = require("mongoose");

// for DivisionalAdmin model
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
  DOB: {
    type: Date,
    required: true,
  },
});
