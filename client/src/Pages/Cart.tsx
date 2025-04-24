import { useState } from "react";
import { ShoppingBag, ChevronLeft, Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "../Store/CartStore"; // Adjust the import path as needed
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Store/AuthContext";
export default function ShoppingCart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [note, setNote] = useState<string>("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleCheckout = () => {
    if (currentUser) {
      navigate("/checkout");
    } else {
      navigate("/auth", { state: { from: "/checkout" } });
    }
  };
  // Force render using counter if needed

  const handleUpdateQuantity = (id: string, change: number) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + change);
      updateQuantity(id, newQuantity);
      // Force re-render if needed
    }
  };

  console.log("Rendering cart with items:", cart); // Debug logging

  return (
    <div className="p-2">
      <div className="max-w-3xl mx-auto mb-12 mt-12 bg-white rounded-lg shadow-md p-6">
        <div className="mb-6 flex items-center">
          <Link
            to="/"
            className="flex items-center cursor-pointer text-[#0f440b] hover:text-gray-500"
          >
            <ChevronLeft size={20} />
            <span className="ml-1 font-medium">Continue Shopping</span>
          </Link>
        </div>

        <h2 className="text-2xl font-bold mb-4">
          Your Order ({cart.length} items)
        </h2>

        <div className="hidden md:grid md:grid-cols-12 text-sm font-medium text-gray-500 mb-3 pb-2 border-b">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Quantity</div>
          <div className="col-span-2 text-right">Total</div>
        </div>

        {cart.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link
              to="/products"
              className="text-[#176112] hover:underline font-medium"
            >
              Browse our products
            </Link>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 items-center py-4 border-b"
              >
                <div className="col-span-12 md:col-span-6 flex items-center mb-3 md:mb-0">
                  <img
                    src={item.image || "/api/placeholder/80/80"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="ml-4 flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        // Force re-render if needed
                      }}
                      className="text-red-500 text-sm flex items-center mt-1"
                    >
                      <Trash2 size={14} className="mr-1" /> Remove
                    </button>
                  </div>
                </div>

                <div className="col-span-4 md:col-span-2 text-center">
                  <div className="md:hidden text-xs text-gray-500 mb-1">
                    Price:
                  </div>
                  ₹
                  {typeof item.price === "number"
                    ? item.price.toFixed(2)
                    : "0.00"}
                </div>

                <div className="col-span-4 md:col-span-2 flex justify-center items-center">
                  <div className="md:hidden text-xs text-gray-500 mb-1 mr-2">
                    Qty:
                  </div>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, -1)}
                    className="w-8 h-8 bg-[#7a9d3c] hover:bg-[#799d3c92] disabled:opacity-50 flex items-center justify-center border rounded-l"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="w-10  h-8 flex items-center justify-center border-t border-b">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, 1)}
                    className="w-8 h-8 bg-[#7a9d3c] hover:bg-[#799d3c92] disabled:opacity-50 flex items-center justify-center border rounded-r"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="col-span-4 md:col-span-2 text-right font-medium">
                  <div className="md:hidden text-xs text-gray-500 mb-1">
                    Total:
                  </div>
                  ₹
                  {typeof item.price === "number"
                    ? (item.price * item.quantity).toFixed(2)
                    : "0.00"}
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <>
            <div className="mb-6">
              <label
                htmlFor="note"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Add a note
              </label>
              <textarea
                id="note"
                rows={3}
                className="w-full border rounded-md p-2 text-sm"
                placeholder="Special instructions for your order"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">
                  ₹{getCartTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2 text-gray-600">
                <span>Tax included and shipping calculated at checkout</span>
                <span>Calculated at next step</span>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleCheckout}
                className="hover:bg-[#176112ac] cursor-pointer bg-[#176112] text-white py-3 px-6 rounded-md font-medium flex items-center"
              >
                <ShoppingBag size={18} className="mr-2" />
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
