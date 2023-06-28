const errorHandler = (err, req, res, next) => {
  console.error("An error occurred:", err);

  // Set an appropriate status code for the error
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: "error",
    message: err.message,
  });
};

module.exports = {
  errorHandler,
};
