import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "Please enter product ID"],
    },
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
      maxLength: [100, "Product name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    category: {
      type: String,
      required: [true, "Please enter product category"],
      enum: [
        "Vegetables",
        "Fruits",
        "Herbs & Spices",
        "Roots & Exotics",
        "Fermented Drinks",
        "Honey & Preservatives",
        "Other",
      ],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLength: [8, "Price cannot exceed 8 digits"],
    },
    weight: {
      type: Number,
      required: [true, "Please specify the weight of the product"],
      min: [0.01, "Weight must be greater than zero"],
    },
    weightUnit: {
      type: String,
      required: true,
      enum: ["kg", "g", "litre", "dozen", "unit", "pack"],
      default: "kg",
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    ratings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
