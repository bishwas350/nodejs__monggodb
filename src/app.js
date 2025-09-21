const cookieParser = require('cookie-parser');
const cors = require('cors')
const express = require('express');
const { globalErrorHandler } = require('../utils/globalErrorHandeler');
const app = express();
// json  to object
app.use(express.json())
app.use(express.urlencoded({ extends:true}))
app.use(cookieParser())
app.use(cors())


//route
app.use('/api/v1', require('./routes/api/index.api'))

// global error handler middleware
app.use(globalErrorHandler)


module.exports = { app };