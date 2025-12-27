const apiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const coustomError = require("../../utils/coustomError");
const discountModel = require('../models/Discount.model');
const { validateDiscount } = require("../validation/discount.validation");


// create a discount
exports.createDiscount = asyncHandler(async(req ,res)=>{
    const data = await validateDiscount(req)
    console.log(data)
})