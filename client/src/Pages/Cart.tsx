import { useState } from "react";
import { ShoppingBag, ChevronLeft, Trash2, Plus, Minus } from "lucide-react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Classic White T-Shirt",
      price: 24.99,
      quantity: 2,
      image: "/api/placeholder/80/80",
    },
    {
      id: 2,
      name: "Denim Jeans",
      price: 59.99,
      quantity: 1,
      image: "/api/placeholder/80/80",
    },
  ]);

  const [note, setNote] = useState<string>("");

  const updateQuantity = (id: number, change: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = (): number => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="max-w-3xl mx-auto mb-12 bg-white rounded-lg shadow-md p-6">
      <div className="mb-6 flex items-center">
        <button className="flex items-center cursor-pointer text-[#0f440b] hover:text-gray-500">
          <ChevronLeft size={20} />
          <span className="ml-1 font-medium">Continue Shopping</span>
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">Your Order</h2>

      <div className="hidden md:grid md:grid-cols-12 text-sm font-medium text-gray-500 mb-3 pb-2 border-b">
        <div className="col-span-6">Product</div>
        <div className="col-span-2 text-center">Price</div>
        <div className="col-span-2 text-center">Quantity</div>
        <div className="col-span-2 text-right">Total</div>
      </div>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 items-center py-4 border-b"
          >
            <div className="col-span-12 md:col-span-6 flex items-center mb-3 md:mb-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="ml-4 flex-grow">
                <h3 className="font-medium">{item.name}</h3>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 text-sm flex items-center mt-1"
                >
                  <Trash2 size={14} className="mr-1" /> Remove
                </button>
              </div>
            </div>

            <div className="col-span-4 md:col-span-2 text-center">
              <div className="md:hidden text-xs text-gray-500 mb-1">Price:</div>
              ${item.price.toFixed(2)}
            </div>

            <div className="col-span-4 md:col-span-2 flex justify-center items-center">
              <div className="md:hidden text-xs text-gray-500 mb-1 mr-2">
                Qty:
              </div>
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="w-8 h-8 flex items-center justify-center border rounded-l"
              >
                <Minus size={16} />
              </button>
              <div className="w-10 h-8 flex items-center justify-center border-t border-b">
                {item.quantity}
              </div>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="w-8 h-8 flex items-center justify-center border rounded-r"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="col-span-4 md:col-span-2 text-right font-medium">
              <div className="md:hidden text-xs text-gray-500 mb-1">Total:</div>
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

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
          <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2 text-gray-600">
          <span>Tax included and shipping calculated at checkout</span>
          <span>Calculated at next step</span>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="hover:bg-[#176112ac] cursor-pointer bg-[#176112] text-white py-3 px-6 rounded-md font-medium flex items-center">
          <ShoppingBag size={18} className="mr-2" />
          Checkout
        </button>
      </div>
    </div>
  );
}
