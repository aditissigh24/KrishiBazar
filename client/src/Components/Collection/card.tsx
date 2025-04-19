import { ShoppingCart } from "lucide-react";
import { Product } from "../../Store/ProductType"; // Adjust path as needed
import { useCart } from "../../Store/CartStore";
import { CartItem } from "../../Store/ProductType"; // adjust path as needed
import { useNavigate } from "react-router-dom"; // Import for navigation

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
  showFavorite?: boolean;
  className?: string;
  onProductClick?: (product: Product) => void; // Optional click handler prop
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showAddToCart = true,
  className = "",
  onProductClick,
}) => {
  const { addToCart } = useCart();
  const navigate = useNavigate(); // For navigation

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when adding to cart

    const cartItem = {
      ...product,
      image: product.images?.[0]?.url || "/api/placeholder/300/300", // Ensure image is a string
      quantity: 1,
    } as CartItem;

    addToCart(cartItem);
    alert(`Added ${product.name} to cart!`);
  };

  const handleCardClick = () => {
    if (onProductClick) {
      // If a click handler is provided, use it
      onProductClick(product);
    } else {
      // Otherwise, navigate to product detail page
      navigate(`/products/${product._id || product.id}`);
    }
  };

  const imageUrl = product.images?.[0]?.url?.startsWith("http")
    ? product.images[0].url
    : `https://krishibazar-sgjm.onrender.com${product.images?.[0]?.url || ""}`;

  return (
    <div
      onClick={handleCardClick}
      className={`bg-white rounded-lg shadow overflow-hidden transition transform hover:shadow-lg cursor-pointer ${className}`}
    >
      <div className="relative">
        <img
          src={imageUrl || "/api/placeholder/300/300"}
          alt={product.name}
          className="w-full h-36 sm:h-48 object-cover"
        />
      </div>

      <div className="p-4">
        {product.category && (
          <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        )}
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mb-4">
          {product.weight && (
            <div className="text-gray-500">{product.weight}</div>
          )}
          <div className="font-bold text-gray-900">
            ₹{product.price.toFixed(2)}
          </div>
        </div>

        {showAddToCart && (
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#7a9d3c] hover:opacity-80 cursor-pointer text-white py-2 px-4 rounded-sm flex items-center justify-center transition duration-300"
          >
            <ShoppingCart size={18} className="mr-2 hidden sm:block" />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};
