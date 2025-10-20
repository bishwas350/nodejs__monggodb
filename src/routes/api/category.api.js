const express = require ("express")
const _ = express.Router()
_.route("/create_category",categoryController.createCategory)
const categoryController = require("../../controller/Category.controller")
module.exports = _