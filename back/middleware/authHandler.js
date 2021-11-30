const { validateToken } = require('../auth/auth');
const errorCodes = require('./errorHandler/errorCodes');

function authenticate(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (token) req.auth = validateToken(token);
  next();
}

function requireAuth(req, res, next) {
  if (req.auth) next();
  throw errorCodes.noAuth;
}

module.exports = { authenticate, requireAuth };
