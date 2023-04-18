class AppError extends Error {
    constructor(message, statusCode, stack) {
        super(message);
        this.statusCode = statusCode;
        this.name = this.constructor.name;
        this.stack = stack;
    }
}

module.exports = AppError;