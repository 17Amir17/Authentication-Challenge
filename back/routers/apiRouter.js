const express = require('express');
const { getInfo } = require('../data/db');
const { authenticate } = require('../middleware/authHandler');

const router = express.Router();

router.get('/v1/information', authenticate, (req, res) => {
  console.log(req.auth);
  res.json(getInfo(req.auth.email));
});

module.exports = router;
