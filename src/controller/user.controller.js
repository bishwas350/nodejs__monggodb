const apiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const coustomError = require("../../utils/coustomError");
const userModel = require("../models/user.model")
exports.Registration = asyncHandler((req,res)=>{
    // apiResponse.sendSusses(res,201, "registration success", { data: "null" });
    // throw new coustomError(404, "Email Missisng")
    const {email, password}= req.body
    console.log(email, password);
        
})
// exports.login = async (req, res )=>{
//     try {
//         console.log("from login controller");
        
//     } catch (error) {
//         console.log("error in login controller", error);
        
//     }
// }