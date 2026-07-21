const AppError = require('./../utils/appError');

const handleCastErrorDB = error => {
  const message = `Invalid ${error.path}: ${error.value}.`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = error => {
  const value = Object.values(error.keyValue)[0];
  const message = `Duplicate field value: ${value}. Please use another value.`;

  return new AppError(message, 400);
};

const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    error,
    message: error.message,
    stack: error.stack,
  });
};

const sendErrorProd = (error, res) => {
  // Operational, trusted error: send message to client
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
    // Programming or other unknown error: don't leak error details
  } else {
    console.error('ERROR:', error);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong: an unknown error occurred.',
    });
  }
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else if (process.env.NODE_ENV === 'production') {
    let err = { ...error };
    if (error.name === 'CastError') err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    sendErrorProd(err, res);
  }
}
