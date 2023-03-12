const Joi = require("joi");
const { model } = require("mongoose");
const classSchema = require("./schemas/classe");
const { Student } = require("./student");

const Class = model("Class", classSchema);
function validate(classe) {
  const schema = new Joi.object({
    grade: Joi.number().min(1).max(20).required(),
    name: Joi.string().min(1).max(20).required(),
    year: Joi.number().min(2000).max(2100).required(),
  });
  const result = schema.validate(classe);
  if (result.error) return result.error.details[0].message;
  return null;
}
async function updateStudentCount(id) {
  studentCount = await Student.find({ classe: id }).count();

  return await Class.findByIdAndUpdate(id, { studentCount }, { new: true });
}

module.exports.Class = Class;
module.exports.validateClass = validate;
module.exports.updateStudentCount = updateStudentCount;
