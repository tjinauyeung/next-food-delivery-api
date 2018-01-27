const nodemailer = require('nodemailer');
const Email = require('email-templates');
const _ = require('lodash');
const { DateTime } = require('luxon');

const NODEMAILER_SETTINGS = {
  service: 'gmail',
  auth: {
    user: 'fusion2go.utrecht@gmail.com', //replace with .env vars
    pass: 'fusion2go4sho' //replace with .env vars
  }
};

class MailService {
  constructor (options = {}) {
    this.transporter = options.mailConfig || nodemailer.createTransport(NODEMAILER_SETTINGS);
  }

  send ({user, order, totalPrice}) {
    if (!user) {
      throw new Error('No user has been specified.');
    }

    if (!order) {
      throw new Error('No order has been specified');
    }

    console.log('An order has been placed through website.', user);
    console.log('user info:', user);
    console.log('order info', order);

    const email = new Email({
      message: { from: 'fusion2go.utrecht@gmail.com' },
      transport: this.transporter,
      send: true
    });

    const formattedOrder = order.map(item => Object.assign(item, { price: renderPrice(item.price) }));
    const formattedTotalPrice = renderPrice(totalPrice);

    email
      .send({
        template: 'confirm',
        message: { to: user.email},
        locals: {
          user,
          order: formattedOrder,
          totalPrice: formattedTotalPrice
        }
      })
      .then(console.log)
      .catch(console.error);

    email
      .send({
        template: 'order',
        message: { to: 'fusion2go.utrecht@gmail.com'},
        locals: {
          user,
          order: formattedOrder,
          totalPrice: formattedTotalPrice,
          date: getToday()
        }
      })
      .then(console.log)
      .catch(console.error);

    return;
  }
}

function renderPrice (price) {
  const rendered = price.toString();
  return `${rendered.slice(0, -2)}.${rendered.slice(-2)}`;
};

const weekdays = [
  'Maandag',
  'Dinsdag',
  'Woensdag',
  'Donderdag',
  'Vrijdag',
  'Zaterdag',
  'Zondag'
];

function getToday () {
  const date = new Date();
  let days = date.getDate();
  let months = date.getMonth() + 1; // January is 0
  let weekday = weekdays[date.getDay()];

  if (days < 10) {
    days = '0' + days
  }

  if (months < 10) {
    months = '0' + months
  }

  return `${weekday} ${days}-${months}`;
}

module.exports = MailService;
