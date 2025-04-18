import express from "express";
const router = express.Router();

import { createOrder, viewOrder } from "../controllers/OrderController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

router.post("/createOrder", isAuthenticatedUser, createOrder);
router.get("/viewOrders", isAuthenticatedUser, viewOrder);
export default router;
