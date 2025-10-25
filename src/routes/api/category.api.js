const express = require("express");
const _ = express.Router();
const categoryController = require("../../controller/Category.controller");
const upload = require("../../middlewere/multer");
_.route("/create_category").post(
  upload.fields([{ name: "image", maxCount: 1 }]),
  categoryController.createCategory
);
_.route("/get_all_category").get(categoryController.getAllCategory);
_.route("/singleCategory/:slug").get(categoryController.singleCategory);
_.route("/updateCategory/:slug").put(upload.fields([{ name: "image", maxCount: 1 }]),categoryController.updateCategory);
module.exports = _;
