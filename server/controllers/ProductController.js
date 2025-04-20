import Product from "../models/ProductModel.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import ErrorHandler from "../Utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import upload from "../middleware/mutlermiddleware.js";
import cloudinary from "../middleware/cloudinary.js";

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

  // Uploading images to Cloudinary
  const imageUploadPromises = req.files.map(async (file) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "products", // Optional: Specify folder to organize images in Cloudinary
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
      );
      stream.end(file.buffer);
    });
  });

  const images = await Promise.all(imageUploadPromises);

  const product = await Product.create({
    name,
    id,
    description,
    category,
    price,
    images,
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
export const uploadImages = upload.array("images");

//get all products
// get all products
//get all products
export const getAllProducts = catchAsyncError(async (req, res) => {
  const resultsPerPage = Number(req.query.limit) || 20;
  const currentPage = Number(req.query.page) || 1;

  // Apply search feature first
  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search() // Add the search method here
    .filter()
    .sort() // Add sorting as well for better user experience
    .pagination(resultsPerPage);

  const products = await apifeature.query;

  // Get total count with the same search and filter criteria (but without pagination)
  const countFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  const filteredProductCount = await Product.countDocuments(
    countFeature.query.getFilter()
  );
  const totalProductCount = await Product.countDocuments();

  res.status(200).json({
    success: true,
    products,
    pagination: {
      totalItems: filteredProductCount,
      totalProducts: totalProductCount,
      totalPages: Math.ceil(filteredProductCount / resultsPerPage),
      currentPage,
      resultsPerPage,
    },
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
