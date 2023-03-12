const Joi = require("joi");
const { model } = require("mongoose");
const userSchema = require("./schemas/user");

const User = model("User", userSchema);

function validate(user) {
  const schema = new Joi.object({
    name: Joi.string().min(5).max(20).required(),
    picture: Joi.string(),
    email: Joi.string().min(5).max(255).required(),
    role: Joi.string()
      .min(5)
      .max(20)
      .required()
      .valid("student", "teacher", "sAdmin", "dAdmin"),
    password: Joi.string().min(5).max(1024).required(),
  });
  const result = schema.validate(user);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.User = User;
module.exports.validateUser = validate;
