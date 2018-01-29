const express = require('express');
const nodemailer = require('nodemailer');
const Email = require('email-templates');
const _ = require('lodash');
const { renderPrice, getToday } = require('./utils');

const router = express.Router();

const NODEMAILER_SETTINGS = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
};

router.post('/mail', (req, res) => {
  const { user, order, totalPrice } = req.body;

  console.log(process.env.EMAIL_USER);
  console.log(process.env.EMAIL_PASSWORD);

  if (!user) throw new Error('No user has been specified.');
  if (!order) throw new Error('No order has been specified');

  const email = new Email({
    message: {from: process.env.USER},
    transport: nodemailer.createTransport(NODEMAILER_SETTINGS)
  });

  const locals = {
    user,
    order: order.map(item => ({...item, ...{ price: renderPrice(item.price) }})),
    price: renderPrice(totalPrice),
    date: getToday()
  };

  email.send({template: 'confirm', message: {to: user.email}, locals});
  email.send({template: 'order', message: {to: process.env.EMAIL_USER}, locals});

  res.status(200).send({message: 'Email has been sent'});

});

module.exports = router;
