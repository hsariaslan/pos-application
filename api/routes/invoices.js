const router = require("express").Router();
const Invoice = require("../models/Invoice");

router.get("/", async(req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/create", async(req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    await newInvoice.save();
    res.status(200).json(newInvoice);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("/show", async(req, res) => {
  try {
    const invoice = await Invoice.findById(req.body.id);
    res.status(200).json(invoice);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put("/update", async(req, res) => {
  try {
    await Invoice.findByIdAndUpdate(req.body.id, req.body);
    const invoice = await Invoice.findById(req.body.id);
    res.status(200).json(invoice);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete("/delete", async(req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.body.id);
    res.status(200).json("Item deleted successfully.");
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;