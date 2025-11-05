const express = require("express");
const _ = express.Router();
const brandController = require("../../controller/Brand.controller");
const upload = require("../../middlewere/multer");

_.route("/create_brand").post( upload.fields([{ name: "image", maxCount: 1 }]),brandController.createBrand);
_.route("/all_brand").get(brandController.getAllBrand);
_.route("/single_brand/:slug").get(brandController.singleBrand);
module.exports = _;
