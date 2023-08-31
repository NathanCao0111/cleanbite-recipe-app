const errorHandlerMdw = (err, req, res, next) => {
  const statusCode = err.statusCode ? err.statusCode : 500;

  res.status(statusCode).json({
    message: err.message,
    statusCode,
    stack: err.stack,
  });
};

module.exports = errorHandlerMdw;
