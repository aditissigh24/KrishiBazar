import Order from "../models/OrderModel.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../Utils/errorHandler.js";

// Create new order
export const createOrder = catchAsyncError(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return next(new ErrorHandler("No order items provided", 400));
  }

  const order = await Order.create({
    orderItems,
    shippingInfo,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id, // comes from isAuthenticatedUser middleware
    paidAt: Date.now(),
  });

  res.status(201).json({
    success: true,
    order,
  });
});
//get previous orders
export const viewOrder = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  if (!orders || orders.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No orders found",
      orders: [],
    });
  }

  res.status(200).json({
    success: true,
    count: orders.length,
    orders,
  });
});
