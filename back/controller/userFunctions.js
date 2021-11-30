const { validateToken } = require('../auth/auth');
const { registerToDB, loginCheck } = require('../data/db');
const errorCodes = require('../middleware/errorHandler/errorCodes');

function register(req, res) {
  const { email, user, password } = req.body;
  registerToDB(email, user, password);
  res.status(201).send('Register Success');
}

function login(req, res) {
  const { email, password } = req.body;
  const { accessToken, refreshToken, userMail, name, isAdmin } = loginCheck(
    email,
    password
  );
  res
    .status(200)
    .json({ accessToken, refreshToken, email: userMail, name, isAdmin });
}

function tokenValidate(req, res) {
  console.log(req.headers);
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) throw errorCodes.noAccessToken;
  const user = validateToken(token);
  if (!user) throw errorCodes.invalidAccessToken;
  res.status(200).json({ valid: true });
}
function token(req, res) {}
function logout(req, res) {}

module.exports = { register, login, tokenValidate, token, logout };
