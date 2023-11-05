const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.post("/register", async(req, res) => {
  try {
    const {username, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/login", async(req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});

    if (user) {
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

      if (isPasswordValid) {
        res.status(200).json(user);
      } else {
        res.status(403).send({message: "Invalid password."});
      }
    } else {
      res.status(404).send({message: "User not found."});
    }
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;