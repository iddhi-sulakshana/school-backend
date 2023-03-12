const Joi = require("joi");
Joi.objectId = require("joi.objectId")(Joi);
const { model } = require("mongoose");
const timetableSchema = require("./schemas/timetable");

const Timetable = model("Timetable", timetableSchema);
function validate(timetable) {
  const schema = new Joi.object({
    class: Joi.objectId().required(),
    dates: Joi.array()
      .length(5)
      .items(
        Joi.object({
          periods: Joi.array()
            .length(8)
            .items(
              Joi.object({ subject: Joi.string().min(5).max(20).required() })
            ),
        })
      ),
  });
  const result = schema.validate(timetable);
  if (result.error) return result.error.details[0].message;
  return null;
}

module.exports.Timetable = Timetable;
module.exports.validateTimetable = validate;
