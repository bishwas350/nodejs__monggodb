const express = require("express");
const _ = express.Router();
const categoryController = require("../../controller/Category.controller");
const upload = require("../../middlewere/multer");
_.route("/create_category").post(upload.fields([{name:"image",maxCount:1}]),categoryController.createCategory);
module.exports = _;
