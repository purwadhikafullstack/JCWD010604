const { createTransport } = require("nodemailer");

const transporter = createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: "port 465",
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
