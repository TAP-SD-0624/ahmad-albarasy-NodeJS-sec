class APIError extends Error {
    constructor(message, statusCode, errCode) {
        super(message);
        this.statusCode = statusCode;
        this.errCode = errCode;
    }
}

module.exports = APIError;
