const apiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const coustomError = require("../../utils/coustomError");
const subcategoryModel = require("../models/SubCategory.Model");
const { validateSubCategory } = require("../validation/SubCategory.Validation");

// create a subcategory
exports.createSubCategory = asyncHandler(async (req, res) => {
  const value = await validateSubCategory(req);
  const subCategory = await subcategoryModel.create(value)
  if (!subCategory) throw new coustomError(500," subCategory create failed")
    apiResponse.sendSusses(res,200,"subCategory created successfully",subCategory)
});
