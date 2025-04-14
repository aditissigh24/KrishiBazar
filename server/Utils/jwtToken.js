const sendToken = (user, statusCode, res) => {
  // Generate JWT token using method defined in User model
  const token = user.getJWTToken();

  // Cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 // e.g. 5 days
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // set to true in production
    sameSite: "Strict",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
