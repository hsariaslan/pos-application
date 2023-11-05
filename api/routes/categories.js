const router = require("express").Router();
const Category = require("../models/Category");

router.get("/", async(req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/create", async(req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).json(newCategory);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/show", async(req, res) => {
  try {
    const category = await Category.findById(req.body.id);
    res.status(200).json(category);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put("/update", async(req, res) => {
  try {
    await Category.findByIdAndUpdate(req.body.id, req.body);
    const category = await Category.findById(req.body.id);
    res.status(200).json(category);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete("/delete", async(req, res) => {
  try {
    await Category.findByIdAndDelete(req.body.id);
    res.status(200).json("Item deleted successfully.");
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;