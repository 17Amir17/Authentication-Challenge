const SECRET =
  'cf43b59e80ab5176d3559c3e2a38f4ec8204dfd16976b698247aa270a679bccb2ca1e40e95bbfb0230f6f887686d456f2f7ee0482b3854be951fef37746adf9d';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function encrypt(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function compare(hash, password) {
  return bcrypt.compareSync(password, hash);
}

function generateAccessToken(data) {
  return generateToken(data, '10s');
}

function generateRefreshToken(data) {
  return generateToken(data, '1h');
}

function generateToken(data, exp) {
  return jwt.sign(data, SECRET, {
    expiresIn: exp,
  });
}

module.exports = {
  encrypt,
  generateAccessToken,
  generateRefreshToken,
  compare,
};
