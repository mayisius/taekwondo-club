const nodemailer = require('nodemailer');
const { smtp } = require('./env');

const isConfigured = Boolean(smtp.host && smtp.port && smtp.user && smtp.pass);

const transporter = isConfigured
  ? nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: false,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    })
  : null;

module.exports = {
  transporter,
  isMailerConfigured: isConfigured,
  smtpFrom: smtp.from,
};