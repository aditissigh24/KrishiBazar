import express from "express";
import {
  createProduct,
  getAllProducts,
  allProducts,
  productDetails,
  deleteProduct,
  uploadImages,
  updateProduct,
} from "../controllers/ProductController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
const router = express.Router();

//Public Routes
router.get("/", getAllProducts);

// Route for getting Product details
router.get("/productDetails/:id", productDetails);

// Route for getting all products --admin  (opens in admin dashboard)
router.get(
  "/allproducts",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  allProducts
);
// Route for adding new Product --admin
router.post(
  "/createProduct",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  uploadImages,
  createProduct
);

// Route for updating a Product --admin
router.put(
  "/updateProduct/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  updateProduct
);

// Route for deleting a Product --admin
router.delete(
  "/deleteProduct/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteProduct
);

export default router;
