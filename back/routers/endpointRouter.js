const express = require('express');
const { validateToken } = require('../auth/auth');
const errorCodes = require('../middleware/errorHandler/errorCodes');
const router = express.Router();

const options = [
  {
    method: 'post',
    path: '/users/register',
    description: 'Register, Required: email, name, password',
    example: {
      body: { email: 'user@email.com', name: 'user', password: 'password' },
    },
  },
  {
    method: 'post',
    path: '/users/login',
    description: 'Login, Required: valid email and password',
    example: { body: { email: 'user@email.com', password: 'password' } },
  },
  {
    method: 'post',
    path: '/users/token',
    description: 'Renew access token, Required: valid refresh token',
    example: { headers: { token: '*Refresh Token*' } },
  },
  {
    method: 'post',
    path: '/users/tokenValidate',
    description: 'Access Token Validation, Required: valid access token',
    example: { headers: { Authorization: 'Bearer *Access Token*' } },
  },
  {
    method: 'get',
    path: '/api/v1/information',
    description: "Access user's information, Required: valid access token",
    example: { headers: { Authorization: 'Bearer *Access Token*' } },
  },
  {
    method: 'post',
    path: '/users/logout',
    description: 'Logout, Required: access token',
    example: { body: { token: '*Refresh Token*' } },
  },
  {
    method: 'get',
    path: 'api/v1/users',
    description: 'Get users DB, Required: Valid access token of admin user',
    example: { headers: { authorization: 'Bearer *Access Token*' } },
  },
];

const userTypes = {
  anon: 2,
  reg: 6,
  admin: 7,
};
router.get('', (req, res) => {
  let userType = userTypes.anon;
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (token) {
    const user = validateToken(token);
    if (user) {
      userType = user.isAdmin ? userTypes.admin : userTypes.reg;
    }
  }
  res.json(options.slice(0, userType));
});

module.exports = router;
