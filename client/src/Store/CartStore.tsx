import { create } from "zustand";
import { useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  loadCartFromStorage: () => void;
}

export const useCart = create<CartState>((set, get) => ({
  cart: [],

  loadCartFromStorage: () => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      set({ cart: JSON.parse(storedCart) });
    }
  },

  addToCart: (item) => {
    const existingItem = get().cart.find((i) => i.id === item.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = get().cart.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
      );
    } else {
      updatedCart = [...get().cart, item];
    }
    set({ cart: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  },

  removeFromCart: (id) => {
    const updatedCart = get().cart.filter((item) => item.id !== id);
    set({ cart: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  },

  updateQuantity: (id, quantity) => {
    const updatedCart = get().cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    set({ cart: updatedCart });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  },

  clearCart: () => {
    set({ cart: [] });
    localStorage.removeItem("cart");
  },

  getCartTotal: () =>
    get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
}));

// Optionally: call this once in your App.tsx or index.tsx to sync cart from localStorage
export const useCartInitializer = () => {
  const loadCartFromStorage = useCart((state) => state.loadCartFromStorage);
  useEffect(() => {
    loadCartFromStorage();
  }, [loadCartFromStorage]);
};
