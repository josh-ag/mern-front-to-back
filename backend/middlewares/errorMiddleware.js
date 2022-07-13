const errorHandler = (err, req, res, next) => {
  // const statusCode = res.statusCode ? res.statusCode : 500;
  const statusCode = res.statusCode || 500;

  res.status(statusCode);

  res.json({
    error: err.message,
    stacktrace: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
