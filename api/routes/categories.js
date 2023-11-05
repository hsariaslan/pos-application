const express = require("express");
const Category = require("../models/Category");
const router = express.Router();

router.post("/new", async(req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).json("Category added successfully.");
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;