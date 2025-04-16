import { config } from "dotenv";

import app from "./app.js";
import connectDB from "./config/db.js";
config();

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
