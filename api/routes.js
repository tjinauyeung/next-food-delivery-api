const express = require('express');
const sendMail = require('./mailer');
const router = express.Router();

router.post('/mail', sendMail);

module.exports = router;
