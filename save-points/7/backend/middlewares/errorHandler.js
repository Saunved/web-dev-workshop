const errorHandler = (err, req, res, next) => {
  console.log(err);
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(errStatus).json({
    message: errMsg
  });
};

module.exports = errorHandler;
