const path = require('path');
const _ = require('lodash');
const factory = require('./mailFactory');
const service = require('./localsService');

function mailHandler(req, res, next) {
  const { user, order, totalPrice } = req.body;

  if (!user) throw new Error('No user has been specified.');
  if (!order) throw new Error('No order has been specified');

  const email = factory.create();

  Promise.all([
    email.send({
      template: 'order',
      message: { to: process.env.EMAIL_SELF },
      locals: service.getLocals({ user, order, totalPrice })
    }),
    email.send({
      template: 'confirm',
      message: { to: user.email },
      locals: service.getLocals({ user, order, totalPrice })
    })
  ])
    .then(() => res.status(200).send({ message: 'Email has been sent.' }))
    .catch(next);
}

module.exports = mailHandler;
