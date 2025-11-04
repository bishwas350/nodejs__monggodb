const express = require("express");
const _ = express.Router();
const subCategoryController =require("../../controller/SubCategory.Controller")
_.route("/create_subcategory").post(subCategoryController.createSubCategory)
module.exports = _;
