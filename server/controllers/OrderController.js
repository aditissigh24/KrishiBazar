import Order from "../models/OrderModel.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHandler from "../Utils/errorHandler.js";
import sendEmail from "../Utils/sendEmail.js";
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
    paymentInfo,
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
    paymentInfo,
    user: req.user._id, // comes from isAuthenticatedUser middleware
    paidAt:
      paymentInfo && paymentInfo.status === "Completed"
        ? Date.now()
        : undefined,
  });
  // Generate order confirmation email
  const message = generateOrderConfirmationEmail(order, req.user.name);

  try {
    await sendEmail({
      email: req.user.email,
      subject: "Your Krishi-Bazar Order Confirmation",
      message: message,
    });
  } catch (error) {
    console.log("Email could not be sent", error);
    // Don't return an error, as the order has been placed successfully
  }

  res.status(201).json({
    success: true,
    order,
  });
});
// Function to generate email content
function generateOrderConfirmationEmail(order, userName) {
  // Get the order items formatted for email
  const itemsList = order.orderItems
    .map(
      (item) =>
        `- ${item.name} (Qty: ${item.quantity}) - ₹${item.price.toFixed(2)}`
    )
    .join("\n");

  return `
Dear ${userName},

Thank you for your order at Krishi-Bazar!

Order ID: ${order.id}
Date: ${new Date(order.createdAt).toLocaleDateString()}

Order Summary:
${itemsList}

Subtotal: ₹${order.itemsPrice.toFixed(2)}
Tax: ₹${order.taxPrice.toFixed(2)}
Shipping: ₹${order.shippingPrice.toFixed(2)}
Total: ₹${order.totalPrice.toFixed(2)}

Shipping Information:
${order.shippingInfo.address}
${order.shippingInfo.city}, ${order.shippingInfo.state} ${
    order.shippingInfo.postalCode
  }
${order.shippingInfo.country}
Phone: ${order.shippingInfo.phone}

Payment Method: ${order.paymentMethod}
Your order is being processed and will be shipped soon.

Thank you for shopping with us!

Best regards,
The Krishi-Bazar Team
`;
}
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
