const route = require("express").Router();
const User = require("../Model/User");
const jwt = require("jsonwebtoken");
const { sendResetLink } = require("../controller/nodemailer");
route.put("/", (req, res) => {
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.status = 400;
      return res.send("Error Finding User");
    } else {
      if (!user) {
        res.status = 400;
        return res.json({ msg: "User deos not exists" });
      } else {
        jwt.sign(
          { userId: user["_id"] },
          process.env.FORGET_PASSWORD,
          (err, encode) => {
            if (err) {
              console.log(err);
              res.status = 400;
              return res.json({ error: "Reset password link Error" });
            }
            return User.updateOne(
              { email: email },
              { resetLink: encode },
              (err, success) => {
                if (err) {
                  res.status = 400;
                  res.send("Error upading reset link");
                }
                sendResetLink(email, encode);
                res.cookie("reset", encode, {
                  maxAge: 9000000,
                  httpOnly: true,
                  sameSite: true,
                });
                res.status = 200;
                res.json({ msg: "Reset Link sent successfuly" });
              }
            );
          }
        );
      }
    }
  });
});

module.exports = route;
