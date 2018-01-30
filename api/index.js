module.exports = () => {
  require('dotenv').config();
  const port = process.env.PORT || 8000;
  const express = require('express');
  const bodyParser = require('body-parser');
  const routes = require('./routes');
  const api = express();

  api.listen(port);

  api.set('view engine', 'pug');

  api.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

  api.use(bodyParser.json());

  api.use('/', routes);

  api.use((err, req, res, next) => {
    res.status(500);
    res.json({
      message: err.message
    });
  });

  console.log(`Server started on ${port}`);
};
