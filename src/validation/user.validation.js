const joi = require("joi");
const userValidationSchema = joi.object({
    email:joi.string().trim().required().pattern( /^[^\s@]+@[^\s@]+\.[^\s@]+$/).message({
        'string.emtpy': "email faka rakhha jabe na",
        'string.pattern.base': "email format ta thik na",
        'any.required': "email ta dorkar", 
    }),
    password:joi.string().trim().required().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).message({
        'string.emtpy': "password faka rakhha jabe na",
        'string.pattern.base': "password format ta thik na",
        'any.required': "password ta dorkar",
    })
})

exports.userValidation = async(req)=>{
    try {
      const value =  await userValidationSchema.validateAsync(req.body)
      return value
    } catch (error) {
        console.log("error from user validation", error);
        throw new coustomError(401, value)
    }
}