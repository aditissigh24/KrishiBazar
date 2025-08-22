import Razorpay from "razorpay";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../Utils/errorHandler.js";
import crypto from "crypto";

// Initialize Razorpay with your key_id and key_secret
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create a new payment order
export const createPaymentOrder = catchAsyncError(async (req, res, next) => {
  const {
    amount,
    currency = "INR",
    receipt = "order_receipt",
    notes = {},
  } = req.body;

  if (!amount) {
    return next(new ErrorHandler("Amount is required", 400));
  }

  try {
    const options = {
      amount: amount * 100, // amount in smallest currency unit (paise for INR)
      currency,
      receipt,
      notes,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Verify payment signature
export const verifyPayment = catchAsyncError(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } else {
    return next(new ErrorHandler("Payment verification failed", 400));
  }
});

// Get Razorpay API key (for frontend)
export const getRazorpayKey = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZORPAY_KEY_ID,
  });
});
