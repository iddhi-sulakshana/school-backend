const Joi = require("joi");
Joi.objectId = require("joi-objectId")(Joi);
const { model } = require("mongoose");
const sAdminSchema = require("./schemas/schoolAdmin");

const SchoolAdmin = model("SchoolAdmin", sAdminSchema);
function validate(sAdmin) {
  const schema = new Joi.object({
    user: Joi.objectId().required(),
    address: Joi.string().min(5).max(512).required(),
    school: Joi.objectId().required(),
    DOB: Joi.date().required(),
  });
  const result = schema.validate(sAdmin);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.SchoolAdmin = SchoolAdmin;
module.exports.validateSAdmin = validate;
