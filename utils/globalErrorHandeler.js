const developerError = (err, res) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    message: err.message,
    statusCode: err.statusCode,
    status: err.status,
    data: err.data,
    stack: err.stack,
    isOperationalError: err.isOperationalError,
  });
};
const productionError = (err, res) => {
  const statusCode = err.statusCode || 500;
  const isOperationalError = err.isOperationalError;
  if (isOperationalError) {
     return res.status(statusCode).json({
      message: err.message,
      statusCode: statusCode,
    });
  } else {
    return res.status(statusCode).json({
      message: "Internal server error",
      statusCode: statusCode,
    });
  }
};
exports.globalErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV == "development") {
    developerError(err, res);
  } else {
    productionError(err, res);
  }
};
