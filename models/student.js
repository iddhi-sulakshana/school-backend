const Joi = require("joi");
Joi.objectId = require("joi-objectId")(Joi);
const { model } = require("mongoose");
const studentSchema = require("./schemas/student");

const Student = model("Student", studentSchema);
function validate(student) {
  const schema = new Joi.object({
    user: Joi.objectId().required(),
    parent: Joi.object({
      name: Joi.string().min(5).max(255).required(),
      phone: Joi.string().min(5).max(20).required(),
    }).required(),
    address: Joi.string().min(5).max(20).required(),
    school: Joi.objectId().required(),
    classe: Joi.objectId().required(),
    DOB: Joi.date().required(),
    isAlumni: Joi.boolean(),
  });
  const result = schema.validate(student);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.Student = Student;
module.exports.validateStudent = validate;
