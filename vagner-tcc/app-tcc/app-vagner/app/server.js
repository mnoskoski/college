const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

require('./src/validateVars')();

const router = require('./src/routes');
const { startServer } = require('./src/bin/worker');
const { handleError , ErrorHandler} = require('./src/middleware/handleError');

const app = express();

const limit = '5mb';

app.use(
  morgan('tiny'),
  helmet(),
  bodyParser.json({ limit, verify: (req, res, buf) => { req.rawBody = buf; } }),
  cors(),
  router,
);
//criando retorno de erros personalizados
app.use((err, req, res, next) => {
  handleError(err, res);
});
//erro no route to route
router.use(function(req, res, next) {
  if (!req.route ) {
    return res.status(400).send({
      success: false,
      data: null,
      error: 'Invalid Route'
    })
  }
      
  next();
});


const normalizeParams = () => ({
  app,
  port: process.env.PORT || 80,
  applyCluster: process.env.CLUSTER || false,
});

startServer(normalizeParams());

module.exports = app;
