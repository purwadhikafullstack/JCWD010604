const { createTransport } = require("nodemailer");
const nodemailer = require("nodemailer");

const transporter = createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: "port 465",
  auth: {
    user: "phonehub3434@gmail.com",
    pass: "ijcytnkpzxybfozf",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
