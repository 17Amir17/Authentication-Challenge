const errorCodes = {
  noAuth: { message: 'Not Authorized', code: 401 },
  notFound: { message: '404 not found', code: 404 },
  invalidInput: { message: 'Invalid input', code: 400 },
  userExists: { message: 'User Already Exists', code: 409 },
  userDoesNotExist: { message: 'User does not exists', code: 404 },
  userOrPasswordWrong: {
    message: 'Username or password is incorrect',
    code: 403,
  },
  noAccessToken: { message: 'Access Token Required', code: 401 },
  invalidAccessToken: { message: 'Invalid Access Token', code: 403 },
  noRefreshToken: { message: 'Refresh token required', code: 401 },
  invalidRefreshToken: { message: 'Invalid Refresh Token', code: 403 },
  emptyNo: { message: '', code: 403 },
  emptyInvalid: { message: '', code: 401 },
};

module.exports = errorCodes;
