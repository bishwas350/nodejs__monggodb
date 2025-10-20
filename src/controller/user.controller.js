const apiResponse = require("../../utils/apiResponse");
const { asyncHandler } = require("../../utils/asyncHandler");
const coustomError = require("../../utils/coustomError");
const userModel = require("../models/user.model");
const { validateUser } = require("../validation/user.validation");

exports.registration = asyncHandler(async (req, res) => {
  const value = await validateUser(req);
  if (value.err) throw new coustomError(401, value.err);
});

exports.login = asyncHandler(async (req, res) => {
  apiResponse.sendSusses(res, 200, "login successfull");
  throw new coustomError(401, "login failed");
});

exports.logout = asyncHandler(async (req, res) => {
  apiResponse.sendSusses(res, 200, "logout successfull");
});
exports.verification = asyncHandler(async (req, res) => {
  apiResponse.sendSusses(res, 200, "verification successfull");
});
