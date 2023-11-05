const router = require("express").Router();
const Product = require("../models/Product");

router.get("/", async(req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/create", async(req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/show", async(req, res) => {
  try {
    const product = await Product.findById(req.body.id);
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put("/update", async(req, res) => {
  try {
    await Product.findByIdAndUpdate(req.body.id, req.body);
    const product = await Product.findById(req.body.id);
    res.status(200).json(product);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete("/delete", async(req, res) => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.status(200).json("Item deleted successfully.");
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;