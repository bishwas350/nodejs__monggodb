const apiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");

exports.Registration = asyncHandler((req,res)=>{
    apiResponse.sendSusses(res,201, "registration success", { data: "null" });
    
})
exports.login = async (req, res )=>{
    try {
        console.log("from login controller");
        
    } catch (error) {
        console.log("error in login controller", error);
        
    }
}