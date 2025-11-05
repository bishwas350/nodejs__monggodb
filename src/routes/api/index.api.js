const express =require('express')
const _ = express.Router()

_.use("/auth",require('./user.api'))
_.use("/category", require("./category.api"))
_.use("/sub_category", require("./SubCategory.api"))
_.use("/brand", require("./Brand.api"))
_.use("/discount", require("./Discount.api"))
module.exports = _