const express = require("express");
const bodyParser = require("body-parser");
const EmailFactory = require("./EmailFactory");
const TemplateUtils = require("./TemplateUtils");

const app = express();
const port = process.env.PORT || 8888;

require("dotenv").load();

app.set("view engine", "pug");
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/order", (req, res, next) => {
  if (!req.body.user || !req.body.order) {
    res.status(404).send("user and order are required");
    return;
  }

  const Email = EmailFactory.create();
  const templateVars = TemplateUtils.getTemplateVars(req.body);

  Promise.all([
    Email.send({
      template: "order",
      message: { to: process.env.EMAIL_SELF },
      locals: templateVars
    }),
    Email.send({
      template: "confirm",
      message: { to: req.body.user.email },
      locals: templateVars
    })
  ])
    .then(() => {
      const userEmail = req.body.user.email;
      console.log(`Email sent to ${process.env.EMAIL_SELF} and ${userEmail}`);
      res.status(200).send({ message: `Email has been sent to ${userEmail}` });
    })
    .catch(e => {
      console.log(`Sending email failed with error ${e.message}`);
      res.status(500).send({ message: `Failed to send email` });
    });
});

app.listen(port);
console.log(`Next food delivery API started on port ${port}`);
