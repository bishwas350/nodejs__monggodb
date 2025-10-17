const joi = require("joi");
const coustomError = require("../../utils/coustomError");

const userValidationSchema = joi.object(
  {
    email: joi
      .string()
      .trim()
      .required()
      .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .messages({
        "string.empty": "email faka rakhha jabe na",
        "string.pattern.base": "email format ta thik na",
        "any.required": "email ta dorkar",
      }),
    password: joi
      .string()
      .trim()
      .required()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/)
      .messages({
        "string.empty": "password faka rakhha jabe na",
        "string.pattern.base": "password format ta thik na",
        "any.required": "password ta dorkar",
      }),
    phoneNumber: joi
  .string()
  .empty()
  .trim()
  .pattern(/^01[3-9]\d{8}$/, "Bangladesh phone number")
  .messages({
    "string.empty": "phone number faka rakhha jabe na",
    "string.pattern.base": "phone number format ta thik na",
  }),

  },
  {
    allowUnknown: true,
  }
);

exports.validateUser = async (req) => {
  try {
    const value = await userValidationSchema.validateAsync(req.body);
    return value;
  } catch (error) {
    console.log("error from user validation", error);
    throw new coustomError(401, error.message);
  }
};
