const { registerToDB, loginCheck } = require('../data/db');

function register(req, res) {
  const { email, user, password } = req.body;
  registerToDB(email, user, password);
  res.status(201).send('Register Success');
}
function login(req, res) {
  const { mail, password } = req.body;
  const { accessToken, refreshToken, email, name, isAdmin } = loginCheck(
    mail,
    password
  );
  res.status(200).json({ accessToken, refreshToken, email, name, isAdmin });
}
function tokenValidate(req, res) {}
function token(req, res) {}
function logout(req, res) {}

module.exports = { register, login, tokenValidate, token, logout };
