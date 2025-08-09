class apiResponse {
  constructor(statusCode, massage, data) {
    this.status = statusCode >= 200 && 300 ? "Ok" : "Client Error";
    this.statusCode = statusCode || 500;
    this.massage = massage || "success";
    this.data = data || null;
  }
  static sendSusses(res, statusCode, massage, data) {
    return res
      .status(statusCode)
      .json(new apiResponse(statusCode, massage, data));
  }
}

module.exports = apiResponse;
