// adminCreate.js (Run this once using `node adminCreate.js`)
import mongoose from "mongoose";
import User from "../models/UserModel.js"; // adjust path accordingly
import dotenv from "dotenv";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  try {
    const admin = await User.create({
      name: "Admin",
      email: "aditissigh24@gmail.com",
      password: "Admin@123", // this will be hashed
      role: "admin",
    });

    console.log("✅ Admin created:", admin);
    process.exit();
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
};

createAdmin();
