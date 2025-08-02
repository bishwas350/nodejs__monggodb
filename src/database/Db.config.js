require("dotenv").config();
const DBName = require("../constants/constant")
const mongoose = require('mongoose');
exports.ConnectDatabase = async ()=>{
    try {
    const db = await mongoose.connect(`${process.env.MONGODB_URL}`);
    console.log("Database connection Sucessfully ....", db.connection.host);
        
    } catch (error) {
        console.log('error from database connection', error);
        
    }
}