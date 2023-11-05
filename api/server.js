const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const port = 5000;

// routes
const categoryRoute = require("./routes/categories");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB");
  } catch (e) {
    throw e;
  }
}


// middlewares
app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoute);

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});