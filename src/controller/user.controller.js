const { asyncHandler } = require("../../utils/asyncHandler");

exports.Registration = asyncHandler((req,res)=>{
    console.log("hello im backend dev and also devops");
    
})
exports.login = async (req, res )=>{
    try {
        console.log("from login controller");
        
    } catch (error) {
        console.log("error in login controller", error);
        
    }
}