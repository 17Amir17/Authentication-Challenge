const express = require('express');
const errorCodes = require('./back/middleware/errorHandler/errorCodes');
const errorHandler = require('./back/middleware/errorHandler/errorHandler');

const server = express();
// Middleware
server.use(express.json());

server.get('*', (req, res) => {
  throw errorCodes.notFound;
});
server.use(errorHandler);
module.exports = server;
