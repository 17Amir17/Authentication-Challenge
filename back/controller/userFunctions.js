const { registerToDB } = require('../data/db');

function register(req, res) {
  const { email, user, password } = req.body;
  registerToDB(email, user, password);
  res.status(201).send('Register Success');
}
function login(req, res) {}
function tokenValidate(req, res) {}
function token(req, res) {}
function logout(req, res) {}

module.exports = { register, login, tokenValidate, token, logout };
