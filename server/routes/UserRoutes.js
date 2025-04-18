import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  getAllUsers,
} from "../controllers/UserController.js";

import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/status", isAuthenticatedUser, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);

// Protected Route - Authenticated User
router.get("/me", isAuthenticatedUser, getUserProfile);

// Admin Routes
router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAllUsers
);

export default router;
