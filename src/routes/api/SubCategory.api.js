const express = require("express");
const _ = express.Router();
const subCategoryController =require("../../controller/SubCategory.Controller")
_.route("/create_subcategory").post(subCategoryController.createSubCategory)
_.route("/all_subcategory").get(subCategoryController.getAllSubCategory)
_.route("/single_subcategory/:slug").get(subCategoryController.getSingleSubCategory)
_.route("/update_subcategory/:slug").put(subCategoryController.updateSubCategory)
_.route("/delete_subcategory/:slug").delete(subCategoryController.deleteSubCategory)
module.exports = _;
