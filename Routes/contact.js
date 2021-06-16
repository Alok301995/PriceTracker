const route = require("express").Router();
const nodemailer = require("nodemailer");

route.post("/", async (req, res) => {
  const { email, text } = req.body;
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "getalrt.customerservice@gmail.com",
      clientId:
        "42717882496-bviuiudktv2jcolc4rq5a16cn0reurs7.apps.googleusercontent.com",
      clientSecret: "aFxq3EAN949KD0cAWstoSuhm",
    },
  });

  // check for null values
  if (email.length === 0 || text.length === 0) {
    res.status = 400;
    return res.send({ success: false, msg: "empty fields" });
  }
  transporter.sendMail(
    {
      from: "getalrt.customerservice@gmail.com", // sender address
      to: "rsspyker@gmail.com",
      cc: "rahulprajapati000@gmail.com",
      bcc: "alokdhiman018@gmail.com", // list of receivers
      subject: "User Contact Alert", // Subject line
      text: `Hi, ${email}  is trying to contact you regarding ${text} , kindly reply as soon as possible}`,
    },
    (err, info) => {
      if (err) {
        console.log(err);
        return res.send({ success: false, msg: "Unable to send Mail" });
      } else {
        return res.send({ success: true, msg: "Message sent succesfully" });
      }
    }
  );
});

module.exports = route;
