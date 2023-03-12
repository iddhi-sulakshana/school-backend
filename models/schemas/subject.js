const { Schema } = require("mongoose");

// for Subject model
module.exports = new Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 20,
    required: true,
  },
});
