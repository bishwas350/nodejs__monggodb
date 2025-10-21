const apiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const coustomError = require("../../utils/coustomError");
const { uploadCloudinaryFile } = require("../helpers/Cloudinary");
const CategoryModel = require("../models/Category.model");
const { categoryValidationSchema, validateCategory} = require("../validation/Category.validation");

// create a category
exports.createCategory = asyncHandler(async (req,res)=>{
    const value = await validateCategory(req)
    const imgUrl =await uploadCloudinaryFile(value?.image?.path)
    const category = await new CategoryModel({
        name:value.name,
        image:imgUrl
    }).save()
    if(!category) throw new coustomError(400,"Category create failed")
    apiResponse.sendSusses(res,201,"Category created successfully",category)
})