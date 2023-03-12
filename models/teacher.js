const Joi = require("joi");
Joi.objectId = require("joi-objectId")(Joi);
const { model } = require("mongoose");
const teacherSchema = require("./schemas/teacher");

const Teacher = model("Teacher", teacherSchema);
function validate(teacher) {
  const schema = new Joi.object({
    user: Joi.objectId().required(),
    major: Joi.string().required(),
    address: Joi.string().min(5).max(20).required(),
    school: Joi.objectId().required(),
    class: Joi.objectId().required(),
    DOB: Joi.date().required(),
  });
  const result = schema.validate(teacher);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.Teacher = Teacher;
module.exports.validateTeacher = validate;
