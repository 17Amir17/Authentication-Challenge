const express = require('express');
const errorHandler = require('./middleware/errorHandler/errorHandler');

const server = express();
// Middleware
server.use(express.json());

server.use(errorHandler);
module.exports = server;
