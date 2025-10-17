const express = require("express");
const _ = express.Router();
const { registration, login,logout , verification } = require("../../controller/user.controller");

_.route("/registration").post(registration);
_.route("/login").post(login);
_.route("/logout").post(logout)
_.route("/verification").post(verification)


module.exports = _;
