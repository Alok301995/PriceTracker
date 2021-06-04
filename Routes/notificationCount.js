const route = require("express").Router();
const User = require("../Model/User");

route.post("/", async (req, res, next) => {
  const { userId } = req.body;
  try {
    const document = await User.findById(userId);
    if (document) {
      document["notificationCount"] = 0;
      await document.save();
      res.send({ notificationClear: true });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = route;
