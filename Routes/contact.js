const route = require("express").Router();
const { sendContactInfo } = require("../controller/nodemailer");

route.post("/", async (req, res) => {
  const { email, text } = req.body;
  console.log(email, text);

  // check for null values
  if (email.length === 0 || text.length === 0) {
    res.status = 400;
    return res.send({ success: false, msg: "empty fields" });
  }

  await sendContactInfo(email, text);
  res.status = 200;
  return res.send({ success: true, msg: "Info send successfuly" });
});

module.exports = route;
