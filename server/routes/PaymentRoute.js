import express from "express";
const router = express.Router();

import {
  createPaymentOrder,
  verifyPayment,
  getRazorpayKey,
} from "../controllers/Razorpay.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

router.post("/create-order", isAuthenticatedUser, createPaymentOrder);
router.post("/verify", isAuthenticatedUser, verifyPayment);
router.get("/get-key", isAuthenticatedUser, getRazorpayKey);

export default router;
