import {
  useState,
  useContext,
  useEffect,
  createContext,
  ReactNode,
} from "react";

// Define the shape of a product
interface Product {
  id: string;
  name: string;
  price: number;
  [key: string]: any; // Allows other optional fields like image, description, etc.
}

// Define the shape of a cart item
interface CartItem extends Product {
  quantity: number;
}

// Define the shape of the cart context value
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

// Create the context with a default value of undefined
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define props for the CartProvider
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    console.log("Adding product to cart:", product);
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        console.log("Updated cart:", updatedCart);
        return updatedCart;
      } else {
        const newCart = [...prevCart, { ...product, quantity: 1 }];
        console.log("New cart:", newCart);
        return newCart;
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
