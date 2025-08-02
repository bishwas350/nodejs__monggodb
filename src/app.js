const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
// json  to object
app.use(express.json())
app.use(express.urlencoded({ extends:true}))
app.use(cookieParser())
module.exports = { app };