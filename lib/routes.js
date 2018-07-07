const express = require('express');
const mailHandler = require('./mailHandler');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).send({ message: 'App is live' });
});

router.post('/mail', mailHandler);

module.exports = router;
