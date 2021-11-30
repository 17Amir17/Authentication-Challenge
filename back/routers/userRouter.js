const express = require('express');
const {
  register,
  login,
  tokenValidate,
  token,
  logout,
} = require('../controller/userFunctions');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/tokenValidate', tokenValidate);
router.post('/token', token);
router.post('/logout', logout);
router.module.exports = router;
