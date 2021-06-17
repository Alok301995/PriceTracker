const route = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../Model/User");
const bcrypt = require("bcrypt");

route.put("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (user === null) {
      return res.send({ success: false, msg: "User does not exist" });
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    user["password"] = hash;
    await user.save();
    res.send({ success: true, msg: "Password Changed successfuly" });
  } catch (error) {
    return res.send({ success: false, msg: "error resetting password" });
  }
});

module.exports = route;
