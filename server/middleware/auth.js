import jwt from "jsonwebtoken";
import User from "../models/UserModel.js"; // Import with ES Module syntax
import ErrorHandler from "../Utils/errorHandler.js"; // Import with ES Module syntax
import catchAsyncError from "./catchAsyncError.js"; // Import with ES Module syntax

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  // Logging the token for testing -- REMOVE before deployment

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  // Verifying token and checking for expiry
  const decodedData = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return next(new ErrorHandler("Token is expired or invalid", 401));
      }
      return decoded;
    }
  );

  // Fetch user from database
  req.user = await User.findById(decodedData.id);

  if (!req.user) {
    return next(new ErrorHandler("User not found", 404));
  }

  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${
            req.user.role
          } is not allowed to access this resource. Allowed roles: ${roles.join(
            ", "
          )}`,
          403
        )
      );
    }

    next();
  };
};
