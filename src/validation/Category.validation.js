const Joi = require("joi");
const coustomError = require("../../utils/coustomError");

const categoryValidationSchema = Joi.object(
  {
    name: Joi.string()
      .trim()
      .required()
      // .min(2)
      // .max(50)
      // .pattern(/^[a-zA-Z0-9\s\u0980-\u09FF\-&]+$/)
      .messages({
        "string.empty": "Category name faka rakhha jabe na",
        "string.min": "Category name at least 2 character hote hobe",
        "string.max": "Category name maximum 50 character hote hobe",
        "string.pattern.base":
          "Category name e only letters, numbers, bangla characters, spaces, hyphen (&) thakte pare",
        "any.required": "Category name ta dorkar",
      }),

    image: Joi.string().trim().uri().messages({
      "string.empty": "Image URL faka rakhha jabe na",
      "string.uri": "Valid image URL hote hobe",
      
    }),

    subCategory: Joi.array()
      .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
      .optional()
      .messages({
        "array.base": "SubCategory must be an array",
        "string.pattern.base": "Each subCategory must be valid ObjectId",
      }),

    isActive: Joi.boolean().optional().default(true).messages({
      "boolean.base": "isActive must be true or false",
    }),
  },
  {
    allowUnknown: true,
  }
);

// Update validation schema (slug optional for update)
const categoryUpdateValidationSchema = Joi.object(
  {
    name: Joi.string()
      .trim()
      .optional()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-Z0-9\s\u0980-\u09FF\-&]+$/)
      .messages({
        "string.min": "Category name at least 2 character hote hobe",
        "string.max": "Category name maximum 50 character hote hobe",
        "string.pattern.base":
          "Category name e only letters, numbers, bangla characters, spaces, hyphen (&) thakte pare",
      }),
  
  },
  {
    allowUnknown: true,
  }
);

// exports.validateCategory = async (req, isUpdate = false) => {
//   try {
//     const schema = isUpdate
//       ? categoryUpdateValidationSchema
//       : categoryValidationSchema;
//     const value = await schema.validateAsync(req.body);
//     return value;
//   } catch (error) {
//     console.log("Error from category validation", error);
//     throw new coustomError(401, error.message);
//   }
// };

// exports.validateCategoryUpdate = async (req) => {
//   try {
//     const value = await categoryUpdateValidationSchema.validateAsync(req.body);
//     return value;
//   } catch (error) {
//     console.log("Error from category update validation", error);
//     throw new coustomError(401, error.message);
//   }
// };

exports.validateCategory = async (req) => {
  try {
    const value = await categoryValidationSchema.validateAsync(req.body);
    return value;
  } catch (error) {
    console.log("error from user validation", error);
    throw new coustomError(401, error.message);
  }
};
