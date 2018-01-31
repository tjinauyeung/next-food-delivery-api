const express = require('express');
const mailHandler = require('./mailHandler');
const router = express.Router();

router.post('/mail', mailHandler);

module.exports = router;
