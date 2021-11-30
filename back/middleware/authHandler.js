const { validateToken } = require('../auth/auth');
const errorCodes = require('./errorHandler/errorCodes');

function authenticate(req, res, next) {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) throw errorCodes.noAccessToken;
  const user = validateToken(token);
  if (!user) throw errorCodes.invalidAccessToken;
  req.auth = validateToken(token);
  next();
}

module.exports = { authenticate };
