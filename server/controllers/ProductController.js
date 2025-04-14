import Product from "../models/ProductModel.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import ErrorHandler from "../Utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import upload from "../middleware/mutlermiddleware.js";

export const createProduct = catchAsyncError(async (req, res) => {
  req.body.user = req.user.id;
  const {
    name,
    id,
    description,
    category,
    price,
    weight,
    weightUnit,
    stock,
    ratings,
  } = req.body;
  const image = req.files.map((file) => file.path);
  const product = await Product.create({
    name,
    id,
    description,
    category,
    price,
    image,
    weight,
    weightUnit,
    stock,
    ratings,
    user: req.user.id,
  });
  res.status(201).json({
    success: true,
    product,
  });
});

// Uploading images
export const uploadImages = upload.array("image");

//get all products
export const getAllProducts = catchAsyncError(async (req, res) => {
  const resultsPerPage = 20;
  const apifeature = new ApiFeatures(Product.find(), req.query)
    .filter()
    .pagination(resultsPerPage);
  const products = await apifeature.query;
  res.status(201).json({
    success: true,
    products,
  });
});

//get all product --admin dashboard
export const allProducts = catchAsyncError(async (req, res) => {
  const product = await Product.find();

  res.status(200).json({
    success: true,
    product,
  });
});

// get product details
export const productDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//update product --admin dashboard
export const updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 500));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//Delete product --admin dashboard
export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 500));
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
