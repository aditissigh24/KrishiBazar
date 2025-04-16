import { ShoppingCart } from "lucide-react";
import { Product } from "../../Store/ProductType"; // Adjust path as needed
import { useCart } from "../../Store/CartStore";
import { CartItem } from "../../Store/ProductType"; // adjust path as needed

interface ProductCardProps {
  product: Product;
  showAddToCart?: boolean;
  showFavorite?: boolean;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showAddToCart = true,

  className = "",
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      image: product.image || "/api/placeholder/300/300", // Ensure image is a string
      quantity: 1,
    } as CartItem;

    addToCart(cartItem);
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow overflow-hidden transition transform hover:shadow-lg ${className}`}
    >
      <div className="relative">
        <img
          src={product.image || "/api/placeholder/300/300"}
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
            className="w-full bg-[#7a9d3c]  hover:opacity-80 cursor-pointer text-white py-2 px-4 rounded-sm flex items-center justify-center transition duration-300"
          >
            <ShoppingCart size={18} className="mr-2 hidden sm:block" />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};
