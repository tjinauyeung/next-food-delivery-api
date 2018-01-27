const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');

const routes = require('./api/routes');

app.listen(port);

app.set('views', './api/templates');
app.set('view engine', 'pug');

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use('/', routes);

console.log(`Server started on ${port}`);
