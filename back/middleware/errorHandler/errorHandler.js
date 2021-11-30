const errorCodes = require('./errorCodes');

function errorHandler(err, req, res, next) {
  for (const error in errorCodes) {
    if (errorCodes[error].message === err.message)
      return res.status(errorCodes[error].code).send(errorCodes[error].message);
  }
  res.status(500).send(err.message);
}

module.exports = errorHandler;
