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

exports.getAllCategory = asyncHandler(async(req,res)=>{
    const category =await CategoryModel.find(). sort({createdAt:-1})
    if(!category) throw new coustomError(500,"Category not found")
        apiResponse.sendSusses(res,200,"Category fetch successfully",category)
})

//find a single category by slug
exports.singleCategory =asyncHandler(async(req,res)=>{
    const {slug} = req.params;
    const category = await CategoryModel.findOne({slug})
    if(!category) throw new coustomError(404,"Category not found")
    apiResponse.sendSusses(res,200,"Category fetch successfully",category)
})
//update category
const {slug}= req.params
if(!slug) throw new coustomError(400,"slug missing")
    // find category
const category = await CategoryModel.findOne({slug:slug})
if(!category) throw new coustomError(500 ,  "category not found")
category.name = req.body?.name || category.name