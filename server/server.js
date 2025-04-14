const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON requests

// Example route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// MongoDB Connection
connectDB();
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
