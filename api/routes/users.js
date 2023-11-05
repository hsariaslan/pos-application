const router = require("express").Router();
const User = require("../models/User");

router.get("/", async(req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/show", async(req, res) => {
  try {
    const user = await User.findById(req.body.id);
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;