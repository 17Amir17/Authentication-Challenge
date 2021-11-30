const { validateToken, generateAccessToken } = require('../auth/auth');
const { registerToDB, loginCheck, REFRESHTOKENS } = require('../data/db');
const errorCodes = require('../middleware/errorHandler/errorCodes');

function register(req, res) {
  const { email, name, password } = req.body;
  registerToDB(email, name, password);
  res.status(201).send('Register Success');
}

function login(req, res) {
  const { email, password } = req.body;
  const { accessToken, refreshToken, userEmail, name, isAdmin } = loginCheck(
    email,
    password
  );
  res
    .status(200)
    .json({ accessToken, refreshToken, email: userEmail, name, isAdmin });
}

function tokenValidate(req, res) {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) throw errorCodes.noAccessToken;
  const user = validateToken(token);
  if (!user) throw errorCodes.invalidAccessToken;
  res.status(200).json({ valid: true });
}

function token(req, res) {
  const { token } = req.body;
  if (!token) throw errorCodes.noRefreshToken;
  const user = validateToken(token);
  if (!REFRESHTOKENS.find((t) => t === token) || !user)
    throw errorCodes.invalidRefreshToken;
  res.status(200).json({
    accessToken: generateAccessToken({
      email: user.email,
      name: user.name,
      password: user.password,
      isAdmin: user.isAdmin,
    }),
  });
}

function logout(req, res) {
  const { token } = req.body;
  if (!token) throw errorCodes.noRefreshToken;
  const user = validateToken(token);
  if (!REFRESHTOKENS.find((t) => t === token) || !user)
    throw errorCodes.invalidRefreshToken;
  REFRESHTOKENS.splice(REFRESHTOKENS.indexOf(token), 1);
  res.status(200).send('User Logged Out Successfully');
}

module.exports = { register, login, tokenValidate, token, logout };
