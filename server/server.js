const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.log("MongoDB Error ❌", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});