class coustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.status =
      statusCode >= 400 && statusCode < 500 ? "client error" : "server error";
    this.data = null;
    this.stack;
    this.isOperationalError = true;
  }
}

module.exports = coustomError;
