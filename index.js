const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');


require('dotenv').config()

const app = express();
app.use(cors())
const port = process.env.PORT || 5000;

app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.email, 
    pass: process.env.pass 
  }
});

app.post('/sendmail', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.email, // Replace with your email
    to: process.env.email, // Replace with the recipient's email
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`SERVER IS LIVE ON PORT ${port}`);
});
