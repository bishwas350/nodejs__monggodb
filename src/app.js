const cookieParser = require('cookie-parser');
const cors = require('cors')
const express = require('express');
const app = express();
// json  to object
app.use(express.json())
app.use(express.urlencoded({ extends:true}))
app.use(cookieParser())
app.use(cors())


//route
app.use('/api/v1', require('./routes/api/index.api'))


module.exports = { app };