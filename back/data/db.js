const {
  encrypt,
  generateAccessToken,
  generateRefreshToken,
} = require('../auth/auth');
const errorCodes = require('../middleware/errorHandler/errorCodes');

const USERS = [
  {
    email: 'admin@email.com',
    name: 'admin',
    password: '$2b$10$WplkwH5IIrKId3cVTqkFdOiENW3THB5jn3IJVPT6nQqblKbZETX1C',
    isAdmin: true,
  },
];
const INFORMATION = [];
const REFRESHTOKENS = [];

function userExists(email) {
  for (const user of USERS) {
    if (user.email === email) return true;
  }
  return false;
}

function registerToDB(email, user, password) {
  if (userExists(email)) throw errorCodes.userExists;
  USERS.push({ email, name, password: encrypt(password), isAdmin: false });
  return true;
}

function loginCheck(email, password) {
  const user = USERS.find((user) => {
    return user.email === email;
  });
  if (!user) throw errorCodes.userDoesNotExist;
  if (user.password !== encrypt(password)) throw errorCodes.userOrPasswordWrong;
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user),
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
  };
}

module.exports = {
  registerToDB,
  loginCheck,
  USERS,
  INFORMATION,
  REFRESHTOKENS,
};
