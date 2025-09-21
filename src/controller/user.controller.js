const apiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const coustomError = require("../../utils/coustomError");

exports.Registration = asyncHandler((req,res)=>{
    apiResponse.sendSusses(res,201, "registration success", { data: "null" });
    throw new coustomError(404, "Email Missisng")
    
})
exports.login = async (req, res )=>{
    try {
        console.log("from login controller");
        
    } catch (error) {
        console.log("error in login controller", error);
        
    }
}