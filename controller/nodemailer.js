const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true,
  auth: {
    user: "getalrt.customerservice@gmail.com",
    pass: "getalrtarr",
  },
});

async function sendMailAlert(email, title) {
  try {
    await transporter.sendMail({
      from: "getalrt.customerservice@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Price Drop Alert!", // Subject line
      text: `Hello User ,Price Has been dropped on the Flipkart for ${title} .Thank you, Get Alrt`,
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function sendResetLink(email, token) {
  try {
    await transporter.sendMail({
      from: "getalrt.customerservice@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Reset Password Link", // Subject line
      text: `Hello User ,Click on the given link --> http://localhost:3000/auth/reset-password/${token}`,
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { sendMailAlert, sendResetLink };
