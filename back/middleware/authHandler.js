const errorCodes = require('./errorHandler/errorCodes');

function authenticate(req, res, next) {}

function requireAuth(req, res, next) {
  if (req.auth) next();
  throw errorCodes.noAuth;
}

module.exports = { authenticate, requireAuth };
