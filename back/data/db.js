const {
  encrypt,
  generateAccessToken,
  generateRefreshToken,
  compare,
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
const INFORMATION = [{ email: 'admin@email.com', info: { name: 'admin' } }];
const REFRESHTOKENS = [];

function userExists(email) {
  for (const user of USERS) {
    if (user.email === email) return true;
  }
  return false;
}

function registerToDB(email, user, password) {
  if (userExists(email)) throw errorCodes.userExists;
  password = encrypt(password);
  USERS.push({
    email,
    name: user,
    password: password,
    isAdmin: false,
  });
  INFORMATION.push({ email, info: `${user} info` });
  return true;
}

function loginCheck(email, password) {
  const user = USERS.find((user) => {
    return user.email === email;
  });
  if (!user) throw errorCodes.userDoesNotExist;
  if (!compare(user.password, password)) throw errorCodes.userOrPasswordWrong;
  const refreshToken = generateRefreshToken(user);
  REFRESHTOKENS.push(refreshToken);
  return {
    accessToken: generateAccessToken(user),
    refreshToken: refreshToken,
    userEmail: user.email,
    name: user.name,
    isAdmin: user.isAdmin,
  };
}

function getInfo(email) {
  const user = INFORMATION.find((user) => {
    return user.email === email;
  });
  if (!user) throw errorCodes.userDoesNotExist;
  return { email: user.email, info: user.info };
}

module.exports = {
  registerToDB,
  loginCheck,
  getInfo,
  USERS,
  INFORMATION,
  REFRESHTOKENS,
};
