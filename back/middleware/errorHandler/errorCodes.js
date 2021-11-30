const errorCodes = {
  noAuth: { message: 'Not Authorized', code: 401 },
  notFound: { message: '404 not found', code: 404 },
  invalidInput: { message: 'Invalid input', code: 400 },
  userExists: { message: 'User Already Exists', code: 409 },
};

module.exports = errorCodes;
