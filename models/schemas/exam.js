const { Schema } = require("mongoose");

// for Exam model
const examSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Student",
  },
  classe: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Class",
  },
  semester: {
    type: Number,
    minlength: 1,
    maxlength: 3,
    required: true,
  },
  results: {
    type: [
      {
        subject: {
          type: String,
          minlength: 5,
          maxlength: 20,
          required: true,
        },
        marks: {
          type: Number,
          minlength: 0,
          maxlength: 100,
          required: true,
        },
      },
    ],
    required: true,
  },
});
