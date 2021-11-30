const { registerToDB, loginCheck } = require('../data/db');

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
function tokenValidate(req, res) {}
function token(req, res) {}
function logout(req, res) {}

module.exports = { register, login, tokenValidate, token, logout };
