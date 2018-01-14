const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'fusion2go.utrecht@gmail.com',
         pass: 'fusion2go4sho'
     }
 });

const mailOptions = {
  from: 'fusion2go.utrecht@gmail.com', // sender address
  to: 'fusion2go.utrecht@gmail.com', // list of receivers
  subject: 'Testing', // Subject line
  html: '<p>Test</p>'// plain text body
};

app.listen(port);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/email', (req, res) => {
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
    transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        console.log(err)
      else 
        console.log(info);
    })
  });
  res.send('EMAIL SENT.')
});

console.log(`Server started on ${port}`);
