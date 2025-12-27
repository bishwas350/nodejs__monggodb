const express = require("express");
const _ = express.Router();
const discountController = require("../../controller/Discount.controller");

_.route("/create_discount").post(discountController.createDiscount);
module.exports = _;
