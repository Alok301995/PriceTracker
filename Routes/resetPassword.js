const route = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const bcrypt = require("bcrypt");

route.put("/", async (req, res) => {
  const resetToken = req.headers.cookies;
  const { password } = req.body;
  try {
    const id = await jwt.verify(resetToken, process.env.FORGET_PASSWORD);
    const user = await User.findById(id.userId);
    if (!user) {
      return res.send("user not found  link broken");
    }

    if (req.query["token"] === user["resetLink"]) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      user["password"] = hash;
      await user.save();
      return res.send("Password changed succesfully ");
    } else {
      res.status = 400;
      return res.send("invalid link");
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = route;
