const port = process.env.PORT || 8888;
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const app = express();

module.exports = () => {
  require('dotenv').load();

  app.listen(port);

  app.set('view engine', 'pug');

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

  app.use(bodyParser.json());

  app.use('/', routes);

  app.use((err, req, res, next) => {
    res.status(500);
    res.json({
      message: err.message
    });
  });

  console.log(`Server started on ${port}`);
};
