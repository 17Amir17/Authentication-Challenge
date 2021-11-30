const bcrypt = require('bcrypt');
const errorCodes = require('../middleware/errorHandler/errorCodes');

const USERS = [
  {
    email: 'admin@email.com',
    name: 'admin',
    password: '**hashed password**',
    isAdmin: true,
  },
];
const INFORMATION = [];
const REFRESHTOKENS = [];

function userExists(email, name) {
  for (const user of USERS) {
    if (user.email === email || user.name === name) return true;
  }
  return false;
}

function encrypt(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

function registerToDB(email, user, password) {
  if (userExists(email, user)) throw errorCodes.userExists;
  USERS.push({ email, name, password: encrypt(password) });
  return true;
}

module.exports = { registerToDB, USERS, INFORMATION, REFRESHTOKENS };
