const MailService = require('../services/MailService');

const service = new MailService();

const mailController = {

  mail (req, res, next) {
    const data = req.body;
    service.send(data);
  }

}

module.exports = mailController;
