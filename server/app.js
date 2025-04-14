import express, { json } from "express";
const app = express();
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";

app.use(json());
app.use(cookieParser());

// // Route Imports
import product_route from "./routes/ProductsRoute.js";
import user_route from "./routes/UserRoutes.js";
import order_route from "./routes/OrdersRoute.js";
// this middleware will handle all the operations on products
app.use("/products", product_route);
app.use("/user", user_route);
app.use("/order", order_route);
// Middleware for Errors
app.use(errorMiddleware);

export default app;
