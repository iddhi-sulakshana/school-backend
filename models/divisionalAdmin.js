const Joi = require("joi");
Joi.objectId = require("joi-objectId")(Joi);
const { model } = require("mongoose");
const dAdminSchema = require("./schemas/divisionalAdmin");

const DivisionalAdmin = model("DivisionalAdmin", dAdminSchema);
function validate(dAdmin) {
  const schema = new Joi.object({
    user: Joi.objectId().required(),
    address: Joi.string().min(5).max(512).required(),
    DOB: Joi.date().required(),
  });
  const result = schema.validate(dAdmin);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.DivisionalAdmin = DivisionalAdmin;
module.exports.validateDAdmin = validate;
