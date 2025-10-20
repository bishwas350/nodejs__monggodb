const apiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const coustomError = require("../../utils/coustomError");
const CategoryModel = require("../models/Category.model");
const { categoryValidationSchema, validateCategory} = require("../validation/Category.validation");

// create a category
exports.createCategory = asyncHandler(async (req,res)=>{
    const value = await validateCategory(req)
    console.log(value)
})