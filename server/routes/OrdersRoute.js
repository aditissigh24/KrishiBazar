import express from "express";
const router = express.Router();

import { createOrder } from "../controllers/OrderController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

router.post("/createOrder", isAuthenticatedUser, createOrder);

export default router;
