const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
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
async function sendContactInfo(email, text) {
  console.log("inside mailer", email, text);
  try {
    await transporter.sendMail({
      from: "getalrt.customerservice@gmail.com", // sender address
      to: "rsspyker@gmail.com",
      cc: "rahulprajapati000@gmail.com",
      bcc: "alokdhiman018@gmail.com", // list of receivers
      subject: "User Contact Alert", // Subject line
      text: `Hi, ${email}  is trying to contact you regarding ${text} , kindly reply as soon as possible}`,
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { sendMailAlert, sendResetLink, sendContactInfo };
