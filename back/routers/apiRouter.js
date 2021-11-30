const express = require('express');
const { getInfo, USERS } = require('../data/db');
const { authenticate, adminAuth } = require('../middleware/authHandler');

const router = express.Router();

router.get('/v1/information', authenticate, (req, res) => {
  res.status(200).json(getInfo(req.auth.email));
});

router.get('/v1/users', adminAuth, (req, res) => {
  res.status(200).json(USERS);
});
module.exports = router;
