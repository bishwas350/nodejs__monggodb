const apiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const coustomError = require("../../utils/coustomError");
const BrandModel = require("../models/Brand.model");
const { validateBrand } = require("../validation/Brand.validation");
const { uploadCloudinaryFile, deleteCloudinaryFile } = require("../helpers/Cloudinary");
const brandModel = require("../models/Brand.model");


// create a brand
exports.createBrand = asyncHandler(async(req,res)=>{
    const data = await validateBrand(req)
    const imgUrl = await uploadCloudinaryFile(data?.image?.path);
    if(!imgUrl) throw new coustomError(500,"Image upload failed")

        // save the database
        const brand = await brandModel.create({
            ...data,
            image: imgUrl,

        })
        if(!brand) throw new coustomError(500,"Brand create failed")
            apiResponse.sendSusses(res,201,"Brand created successfully",brand)
})

// get all brand


exports.getAllBrand = asyncHandler(async(req,res)=>{
    const allbrand = await brandModel.find({}).sort({createdAt:-1})
        if(!allbrand) throw new coustomError(500,"Brand found failed")
            apiResponse.sendSusses(res,201,"Brand found  successfully",allbrand)
})

// find single brand by slug

exports.singleBrand = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const singlebrand = await brandModel.findOne({ slug });
  if (!singlebrand) throw new coustomError(404, "singlebrand not found");
  apiResponse.sendSusses(res, 200, "singlebrand fetch successfully", singlebrand);
});
