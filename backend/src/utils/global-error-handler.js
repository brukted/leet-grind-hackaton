// Global Error Handler

// Config
const configs = require("../../configs");

// App Error
const AppError = require("./app-error");

// Send Dev Error
const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    errorStack: err.stack,
  });
};

// Send Prod Error
const sendProdError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "ERROR",
      message: "Opps!! Unknown Error. Please try again",
    });
  }
};

// Global Error Handler
const geh = (err, req, res, next) => {
  err.status = err.status || "ERROR";
  err.statusCode = err.statusCode || 500;

  // Duplicate data error
  if (err.code === 11000) {
      err = new AppError((err.message + "Email is already used", 400))
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(" || ");
    err = new AppError(message, 400);
  }

  // Casting error
  if (err.name === "CastError") {
    const message = `Resource not found`;
    err = new AppError(message, 404);
  }

  // JWT token error
  if (err.name === "JsonWebTokenError") {
    err = new AppError("Please login", 401);
  }

  // JWT expired
  if (err.name === "TokenExpiredError") {
    err = new AppError("Please login", 401);
  }

  // Send error for Dev Environment
  if (configs.env === "development") {
    sendDevError(err, res);
  }

  // Send error for Prod Environment
  if (configs.env === "production" || configs.env === "qa") {
    sendProdError(err, res);
  }
};

// Export GEH
module.exports = geh;
