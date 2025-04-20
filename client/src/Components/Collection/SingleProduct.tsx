import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "../../Store/CartStore"; // Adjust path as needed
import Loader from "../Loader";
const API_BASE_URL = "https://krishibazar-sgjm.onrender.com";

type Product = {
  id?: number;
  _id?: string;
  name: string;
  description: string;
  detailedDescription?: string;
  category?: string;
  images: { url: string }[] | string[];
  weight?: number;
  weightUnit?: string;
  stock: number;
  ratings?: number;
  reviewCount?: number;
  price: number;
  sale?: {
    active: boolean;
    percentage: number;
    originalPrice: number;
  };
  specifications?: { name: string; value: string }[];
  quantity?: number;
};

export default function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setError("No product ID provided");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${API_BASE_URL}/products/productDetails/${productId}`
        );
        setProduct(response.data.product);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product data");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (product && quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleBuyNow = () => {
    if (product) {
      handleAddToCart();
      navigate("/checkout");
    }
  };

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        ...product,
        id: product._id || String(product.id),
        image: Array.isArray(product.images)
          ? typeof product.images[0] === "string"
            ? product.images[0]
            : (product.images[0] as { url: string }).url
          : "/api/placeholder/300/300",
        quantity: quantity,
      };

      addToCart(cartItem);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index);
  };

  const renderRating = (rating: number = 0) => {
    const stars: React.ReactNode[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="fill-yellow-400 text-yellow-400" size={18} />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="text-gray-300" size={18} />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star className="fill-yellow-400 text-yellow-400" size={18} />
            </div>
          </div>
        );
      } else {
        stars.push(<Star key={i} className="text-gray-300" size={18} />);
      }
    }

    return (
      <div className="flex items-center">
        <div className="flex mr-2">{stars}</div>
        <span className="text-sm text-gray-600">
          {rating || 0} ({product?.reviewCount || 0} reviews)
        </span>
      </div>
    );
  };

  const getImageUrls = (): string[] => {
    if (!product || !product.images) return ["/api/placeholder/500/500"];

    return Array.isArray(product.images)
      ? product.images.map((img) => {
          if (typeof img === "string") {
            return img.startsWith("http") ? img : `${API_BASE_URL}${img}`;
          } else if (img && typeof img === "object" && "url" in img) {
            return (img.url as string).startsWith("http")
              ? (img.url as string)
              : `${API_BASE_URL}${img.url}`;
          }
          return "/api/placeholder/500/500";
        })
      : ["/api/placeholder/500/500"];
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {error || "Product not found"}
          </h2>
          <p className="mt-2 text-gray-600">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={goBack}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const imageUrls = getImageUrls();
  const discountedPrice = product.sale?.active ? product.price : null;
  const originalPrice = product.sale?.active
    ? product.sale.originalPrice
    : product.price;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation */}
        <button
          onClick={goBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Products
        </button>

        <div className="md:flex gap-12">
          {/* Product Images Section */}
          <div className="md:w-1/2">
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden">
              {product.sale?.active && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
                  {product.sale.percentage}% OFF
                </div>
              )}
              <img
                src={
                  imageUrls[selectedImageIndex] || "/api/placeholder/500/500"
                }
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Thumbnail Images */}
            {imageUrls.length > 1 && (
              <div className="flex mt-4 gap-3 overflow-x-auto">
                {imageUrls.map((img, index) => (
                  <div
                    key={index}
                    onClick={() => handleImageSelect(index)}
                    className={`h-20 w-20 bg-white cursor-pointer flex-shrink-0 border-2 ${
                      index === selectedImageIndex
                        ? "border-green-600"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - view ${index + 1}`}
                      className="h-full w-full object-contain p-1"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            {product.category && (
              <div className="mb-2">
                <span className="text-lg text-[#517514] font-medium">
                  {product.category}
                </span>
              </div>
            )}

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>

            {product.ratings && (
              <div className="mb-4">{renderRating(product.ratings)}</div>
            )}

            <div className="mb-6 flex items-center">
              <div className="text-3xl font-bold text-gray-900">
                ₹{discountedPrice?.toFixed(2) || product.price.toFixed(2)}
              </div>

              {product.sale?.active && (
                <div className="ml-3 text-xl text-gray-500 line-through">
                  ₹{originalPrice.toFixed(2)}
                </div>
              )}
            </div>

            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-700 font-medium">Quantity</span>
                <span className="text-gray-500 font-medium text-lg">
                  {product.stock} available
                </span>
              </div>

              <div className="flex items-center">
                <div className="flex items-center border-2 border-[#7a9d3c] rounded">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="p-4 text-white bg-[#7a9d3c] hover:bg-[#7a9d3c] disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-8 py-2 text-center text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    className="p-4 bg-[#7a9d3c] text-white hover:bg-[#7a9d3c] disabled:opacity-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {product.weight && product.weightUnit && (
                  <div className="ml-4 text-lg font-semibold text-gray-500">
                    {product.weight} {product.weightUnit}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 border-2 border-[#7a9d3c] hover:bg-[#7a9d3c] cursor-pointer text-[#7a9d3c] hover:text-white font-semibold py-4 rounded flex items-center justify-center transition duration-300"
              >
                <ShoppingCart size={20} className="mr-2" />
                Add to Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 bg-[#7a9d3c] hover:bg-[#799d3cbd] cursor-pointer text-white font-semibold py-4 rounded flex items-center justify-center transition duration-300"
              >
                Buy Now
              </button>
            </div>

            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mt-8 border-t pt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex">
                      <span className="text-gray-500 mr-2 font-medium">
                        {spec.name}:
                      </span>
                      <span className="text-gray-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Description */}
        {product.detailedDescription && (
          <div className="mt-12 pt-8 border-t">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Product Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {product.detailedDescription}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
