import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context and components
import { CartProvider } from "./Store/CartStore";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Lazy-loaded pages
const Landing = React.lazy(() => import("./Pages/Landing"));
const About = React.lazy(() => import("./Pages/About"));
const Contact = React.lazy(() => import("./Pages/Contact"));
const Cart = React.lazy(() => import("./Pages/Cart"));
const Userprofile = React.lazy(() => import("./Pages/Userprofile"));
const Signup = React.lazy(() => import("./Pages/Signup"));
const Login = React.lazy(() => import("./Pages/Login"));
const AuthPages = React.lazy(() => import("./Pages/Auth"));

// Collection components
const Fruits = React.lazy(() => import("./Components/Collection/Fruits"));
const Vegetables = React.lazy(
  () => import("./Components/Collection/Vegetables")
);
const Drinks = React.lazy(
  () => import("./Components/Collection/FermentedDrinks")
);
const Herbs = React.lazy(() => import("./Components/Collection/Herbs&Greens"));
const Honey = React.lazy(
  () => import("./Components/Collection/Honey&Preservatives")
);
const Roots = React.lazy(() => import("./Components/Collection/Roots&Exotics"));
const AllProducts = React.lazy(
  () => import("./Components/Collection/allProducts")
);

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[#fdf7ee]">
        <BrowserRouter>
          <Navbar />
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {/* Main pages */}
              <Route path="/" element={<Landing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Userprofile />} />

              {/* Auth routes */}
              <Route path="/auth" element={<AuthPages />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />

              {/* Product category routes - using consistent URL format */}
              <Route path="/category" element={<AllProducts />} />
              <Route path="/category/fruits" element={<Fruits />} />
              <Route path="/category/vegetables" element={<Vegetables />} />
              <Route path="/category/herbs-and-greens" element={<Herbs />} />
              <Route path="/category/roots-and-exotics" element={<Roots />} />
              <Route path="/category/fermented-drinks" element={<Drinks />} />
              <Route
                path="/category/honey-and-preservatives"
                element={<Honey />}
              />
            </Routes>
          </React.Suspense>
          <Footer />
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;
