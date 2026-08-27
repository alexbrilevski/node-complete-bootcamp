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

const handleValidationErrorDB = error => {
  const errors = Object.values(error.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;

  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token. Please log in again.', 401);

const handleJWTExpiredError = () => new AppError('Your token has expired token. Please log in again.', 401);

const sendErrorDev = (error, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(error.statusCode).json({
      status: error.status,
      error,
      message: error.message,
      stack: error.stack,
    });
  }

  console.error('ERROR:', error);
  return res.status(error.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: error.message,
  });
};

const sendErrorProd = (error, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error: send message to client
    if (error.isOperational) {
      return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
      });
    }

    // Programming or other unknown error: don't leak error details
    console.error('ERROR:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong: an unknown error occurred.',
    });
  }

  if (error.isOperational) {
    return res.status(error.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: error.message,
    });
  }

  // Programming or other unknown error: don't leak error details
  console.error('ERROR:', error);
  return res.status(error.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.',
  });
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let err = { ...error };
    err.message = error.message;

    if (error.name === 'CastError') err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (error.name === 'ValidationError') err = handleValidationErrorDB(err);
    if (error.name === 'JsonWebTokenError') err = handleJWTError();
    if (error.name === 'TokenExpiredError') err = handleJWTExpiredError();

    sendErrorProd(err, req, res);
  }
}
