import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartInitializer } from "./Store/CartStore";
// Context and components
import { AuthProvider } from "./Store/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Loader from "./Components/Loader";
import ScrollToTop from "./Store/ScrollToTop";

// Lazy-loaded pages
const Landing = React.lazy(() => import("./Pages/Landing"));
const About = React.lazy(() => import("./Pages/About"));
const Contact = React.lazy(() => import("./Pages/Contact"));
const Cart = React.lazy(() => import("./Pages/Cart"));
const Userprofile = React.lazy(() => import("./Pages/Userprofile"));
const AuthPages = React.lazy(() => import("./Pages/Auth"));
const ForgotPasswordPage = React.lazy(() =>
  import("./Components/ForgotPassword").then((module) => ({
    default: module.ForgotPasswordPage,
  }))
);
const ResetPasswordPage = React.lazy(() =>
  import("./Components/ForgotPassword").then((module) => ({
    default: module.ResetPasswordPage,
  }))
);
const Checkout = React.lazy(() => import("./Pages/Checkout"));
const ProductDetailPage = React.lazy(
  () => import("./Components/Collection/SingleProduct")
);
const FAQ = React.lazy(() => import("./Components/FAQ"));
const Terms = React.lazy(() => import("./Components/Terms"));
const Privacy = React.lazy(() => import("./Components/Privacy"));

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
  useCartInitializer();
  return (
    <div className="flex flex-col min-h-screen bg-[#fdf7ee]">
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Navbar />
          <main className="flex-1">
            <React.Suspense fallback={<Loader />}>
              <Routes>
                {/* Main pages */}
                <Route path="/" element={<Landing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/faqs" element={<FAQ />} />
                <Route path="/terms-and-conditions" element={<Terms />} />
                <Route path="/security-policy" element={<Privacy />} />

                {/* Auth routes */}
                <Route path="/auth" element={<AuthPages />} />
                <Route
                  path="/forgot-password"
                  element={<ForgotPasswordPage />}
                />
                <Route path="/reset-password" element={<ResetPasswordPage />} />

                {/* Product category routes - using consistent URL format */}
                <Route path="/products" element={<AllProducts />} />
                <Route path="/products/fruits" element={<Fruits />} />
                <Route path="/products/vegetables" element={<Vegetables />} />
                <Route path="/products/herbs-and-spices" element={<Herbs />} />
                <Route path="/products/roots-and-exotics" element={<Roots />} />
                <Route path="/products/fermented-drinks" element={<Drinks />} />
                <Route
                  path="/products/:productId"
                  element={<ProductDetailPage />}
                />
                <Route
                  path="/products/honey-and-preservatives"
                  element={<Honey />}
                />
                {/* Protected routes */}
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Userprofile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </React.Suspense>
          </main>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
