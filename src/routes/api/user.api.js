const express = require('express');
const _ = express.Router()
_.route('/registration').get((req,res)=>{
    console.log('hello banchod');
    
})
module.exports = _