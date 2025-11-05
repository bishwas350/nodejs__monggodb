const Joi = require("joi");
const coustomError = require("../../utils/coustomError");

// ✅ Create Brand validation schema
const brandValidationSchema = Joi.object(
  {
    name: Joi.string().trim().required().messages({
      "string.empty": "Brand name cannot be empty.",
      "any.required": "Brand name ta dorkar",
    }),
    since: Joi.number().integer().required().messages({
      "number.base": "Since must be a number",
      "any.required": "Brand since year ta dorkar",
    }),

    isActive: Joi.boolean().optional().default(true),
  },
  { allowUnknown: true }
);

//  Create validation function
exports.validateBrand = async (req) => {
  try {
    const value = await brandValidationSchema.validateAsync(req.body);
    const acceptType = ["image/jpeg", "image/jpg", "image/png"];
    if (!req?.files?.image || req.files.image.length === 0) {
      throw new coustomError(400, "Brand image is required");
    }
    if (!acceptType.includes(req.files.image[0].minetype)) {
      throw new coustomError(400, "Invalid image type for Brand");
    }
    if (req.files.image[0].size > 10485760) {
      throw new coustomError(400, "Image size too large");
    }
    if (req.files.image?.length > 1) {
      throw new coustomError(400, "Only one image allowed");
    }
    return { 
        name: value.name, 
        since: value.since,
        isActive: value.isActive,
        image: req?.files?.image[0] 
        
    };
  } catch (error) {
    console.log("Error from Brand validation", error);
    throw new coustomError(401, error.message);
  }
};

