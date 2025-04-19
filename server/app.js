import express, { json } from "express";
const app = express();
import cors from "cors";
import errorMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";

app.use(json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://krishi-bazar-lime.vercel.app", "http://localhost:5173"],
    credentials: true, // if you're using cookies/auth
  })
);
// // Route Imports
import product_route from "./routes/ProductsRoute.js";
import user_route from "./routes/UserRoutes.js";
import order_route from "./routes/OrdersRoute.js";
import path from "path";
import { fileURLToPath } from "url";
// For __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// this middleware will handle all the operations on products
app.use("/products", product_route);
app.use("/user", user_route);
app.use("/order", order_route);
// Middleware for Errors
app.use(errorMiddleware);
const uploadDir = path.join(__dirname, "./uploads");
console.log("Serving files from:", uploadDir); // Log the computed static file path
app.use("/uploads", express.static(uploadDir));

export default app;
