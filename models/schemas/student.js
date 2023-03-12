const { Schema } = require("mongoose");

const parentSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 255,
      required: true,
    },
    phone: {
      type: String,
      minlength: 5,
      maxlength: 20,
      required: true,
    },
  },
  { _id: false }
);

// for Student model
module.exports = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  parent: {
    type: parentSchema,
    required: true,
  },
  address: {
    type: String,
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
  isAlumni: {
    type: Boolean,
  },
});
