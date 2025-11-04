const Joi = require("joi");
const coustomError = require("../../utils/coustomError");

// ✅ Create SubCategory validation schema
const subCategoryValidationSchema = Joi.object(
  {
    name: Joi.string()
      .trim()
      .required()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-Z0-9\s\u0980-\u09FF\-&]+$/)
      .messages({
        "string.empty": "SubCategory name faka rakhha jabe na",
        "string.min": "SubCategory name at least 2 character hote hobe",
        "string.max": "SubCategory name maximum 50 character hote hobe",
        "string.pattern.base":
          "SubCategory name e only letters, numbers, bangla characters, spaces, hyphen (&) thakte pare",
        "any.required": "SubCategory name ta dorkar",
      }),

    category: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "string.empty": "Category id faka rakhha jabe na",
        "string.pattern.base": "Category id valid ObjectId hote hobe",
        "any.required": "Category id ta dorkar",
      }),

    isActive: Joi.boolean().optional().default(true).messages({
      "boolean.base": "isActive must be true or false",
    }),
  },
  {
    allowUnknown: true,
  }
);

// ✅ Update validation schema (for PATCH/PUT)
const subCategoryUpdateValidationSchema = Joi.object(
  {
    name: Joi.string()
      .trim()
      .optional()
      .min(2)
      .max(50)
      .pattern(/^[a-zA-Z0-9\s\u0980-\u09FF\-&]+$/)
      .messages({
        "string.min": "SubCategory name at least 2 character hote hobe",
        "string.max": "SubCategory name maximum 50 character hote hobe",
        "string.pattern.base":
          "SubCategory name e only letters, numbers, bangla characters, spaces, hyphen (&) thakte pare",
      }),

    category: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .optional()
      .messages({
        "string.pattern.base": "Category id valid ObjectId hote hobe",
      }),

    isActive: Joi.boolean().optional().messages({
      "boolean.base": "isActive must be true or false",
    }),
  },
  {
    allowUnknown: true,
  }
);

// ✅ Create validator function (for create)
exports.validateSubCategory = async (req) => {
  try {
    const value = await subCategoryValidationSchema.validateAsync(req.body);
    return value;
  } catch (error) {
    console.log("Error from SubCategory validation", error);
    throw new coustomError(401, error.message);
  }
};

// ✅ Update validator function (for update)
exports.validateSubCategoryUpdate = async (req) => {
  try {
    const value = await subCategoryUpdateValidationSchema.validateAsync(req.body);
    return value;
  } catch (error) {
    console.log("Error from SubCategory update validation", error);
    throw new coustomError(401, error.message);
  }
};
