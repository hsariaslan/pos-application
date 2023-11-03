const mongoose = require("mongoose");

const InvoiceSchema = mongoose.Schema(
  {
    customerName: {type: String, require: true},
    customerPhoneNumber: {type: String, require: true},
    paymentMethod: {type: Number, require: true},
    cartItems: {type: Array, require: true},
    subTotal: {type: Number, require: true},
    tax: {type: Number, require: true},
    total: {type: Number, require: true},
  },
  {timestamps: true}
);

const Invoice = mongoose.model("invoices", InvoiceSchema);

module.exports = Invoice;