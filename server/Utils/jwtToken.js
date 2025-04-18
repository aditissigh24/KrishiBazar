const sendToken = (user, statusCode, res) => {
  // Generate JWT token using method defined in User model
  const token = user.getJWTToken();

  // Cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true on Vercel/Render
    sameSite: "None", // ❗ Required for cross-origin cookie sharing
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

export default sendToken;
