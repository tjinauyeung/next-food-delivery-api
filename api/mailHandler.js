const path = require('path');
const nodemailer = require('nodemailer');
const Email = require('email-templates');
const { renderPrice, getToday } = require('./utils');
const { EMAIL_SELF, EMAIL_PASSWORD } = process.env;

const NODEMAILER_SETTINGS = {
  service: 'gmail',
  auth: {
    user: EMAIL_SELF,
    pass: EMAIL_PASSWORD
  }
};

const email = new Email({
  message: { from: EMAIL_SELF },
  views: {
    root: path.resolve(__dirname, 'templates')
  },
  transport: nodemailer.createTransport(NODEMAILER_SETTINGS)
});

function getLocals({ user, order, totalPrice }) {
  return {
    user,
    order: order.map(item => ({
      ...item,
      ...{ price: renderPrice(item.price) }
    })),
    price: renderPrice(totalPrice),
    date: getToday()
  };
}

function mailHandler(req, res, next) {
  const { user, order, totalPrice } = req.body;

  if (!user) throw new Error('No user has been specified.');
  if (!order) throw new Error('No order has been specified');

  Promise.all([
    email.send({
      template: 'order',
      message: { to: EMAIL_SELF },
      locals: getLocals({ user, order, totalPrice })
    }),
    email.send({
      template: 'confirm',
      message: { to: user.email },
      locals: getLocals({ user, order, totalPrice })
    })
  ])
    .then(() => res.status(200).send({ message: 'Email has been sent.' }))
    .catch(next);
}

module.exports = mailHandler;
