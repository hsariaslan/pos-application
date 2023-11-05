const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const port = 5000;

// routes
const authRoute = require("./routes/auth");
const categoryRoute = require("./routes/categories");
const invoiceRoute = require("./routes/invoices");
const productRoute = require("./routes/products");
const userRoute = require("./routes/users");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (e) {
    throw e;
  }
}


// middlewares
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/invoices", invoiceRoute);
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

app.listen(port, () => {
  connect();
});