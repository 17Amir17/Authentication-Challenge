const express = require('express');
const morgan = require('morgan');

const errorCodes = require('./back/middleware/errorHandler/errorCodes');
const errorHandler = require('./back/middleware/errorHandler/errorHandler');
const userRouter = require('./back/routers/userRouter');
const apiRouter = require('./back/routers/apiRouter');
const endPointRouter = require('./back/routers/endpointRouter');
const server = express();
// Middleware
server.use(express.json());
//Morgan
//Log with tiny config every request other than POST
server.use(
  morgan('tiny', {
    skip: function (req, res) {
      return req.method === 'POST';
    },
  })
);
// Log with custom config every request that is POST
morgan.token('body', (req, res) => JSON.stringify(req.body));
server.use(
  morgan(
    ':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]',
    {
      skip: function (req, res) {
        return req.method != 'POST';
      },
    }
  )
);

//Routers
server.use('/users', userRouter);
server.use('/api', apiRouter);
server.use('/', endPointRouter);
server.get('*', (req, res) => {
  throw errorCodes.notFound;
});
server.use(errorHandler);
module.exports = server;
