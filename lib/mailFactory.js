const nodemailer = require('nodemailer');
const Email = require('email-templates');

const mailFactory = {
  create() {
    return new Email({
      message: { 
        from: process.env.EMAIL_SELF 
      },
      views: { 
        root: 'templates' 
      },
      transport: nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_SELF,
          pass: process.env.EMAIL_PASSWORD
        }
      })
    });
  }
};

module.exports = mailFactory;
