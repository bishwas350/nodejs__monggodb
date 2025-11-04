const apiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const coustomError = require("../../utils/coustomError");
const subcategoryModel = require("../models/SubCategory.Model");
const { validateSubCategory } = require("../validation/SubCategory.Validation");

// create a subcategory
exports.createSubCategory = asyncHandler(async (req, res) => {
  const value = await validateSubCategory(req);
  const subCategory = await subcategoryModel.create(value);
  if (!subCategory) throw new coustomError(500, " subCategory create failed");
  apiResponse.sendSusses(
    res,
    200,
    "subCategory created successfully",
    subCategory
  );
});

// get all subCategory
exports.getAllSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await subcategoryModel
    .find()
    .populate("category")
    .sort({ createdAt: -1 });
  if (!subCategory) throw new coustomError(500, " subCategory retrive failed");
  apiResponse.sendSusses(
    res,
    200,
    "subCategory retrive successfully",
    subCategory
  );
});

// find single subCategory by slug
exports.getSingleSubCategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  if (!slug) throw new coustomError(400, "slug missing");
  const subCategory = await subcategoryModel
    .find({ slug: slug })
    .populate("category")
    .sort({ createdAt: -1 });
  if (!subCategory) throw new coustomError(500, " subCategory retrive failed");
  apiResponse.sendSusses(
    res,
    200,
    "subCategory retrive successfully",
    subCategory
  );
});

// update subCategory

exports.updateSubCategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  if (!slug) throw new coustomError(400, "slug missing");
  const subCategory = await subcategoryModel.findOneAndUpdate(
    { slug: slug },
    { ...req.body },
    { new: true }
  );

  if (!subCategory) throw new coustomError(500, " subCategory update failed");
  apiResponse.sendSusses(
    res,
    200,
    "subCategory update successfully",
    subCategory
  );
});

// delete subCategory

exports.deleteSubCategory = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  if (!slug) throw new coustomError(400, "slug missing");
  const subCategory = await subcategoryModel.findOneAndDelete(
    { slug: slug }
  );

  if (!subCategory) throw new coustomError(500, " subCategory delete failed");
  apiResponse.sendSusses(
    res,
    200,
    "subCategory delete successfully",
    subCategory
  );
});