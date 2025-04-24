import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiBeachBag } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";
import { useAuth } from "../Store/AuthContext"; // Update this import path to match your project structure
import { useCart } from "../Store/CartStore";
import AnimatedLogo from "./Collection/Logo";
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<number>(null);
  // Use the auth context instead of local state
  const { currentUser, logout } = useAuth();

  // Updated category objects with display names and route paths
  const categories = [
    { name: "Vegetables", path: "/products/vegetables" },
    { name: "Fruits", path: "/products/fruits" },
    { name: "Herbs & Spices", path: "/products/herbs-and-spices" },
    { name: "Root & Exotic", path: "/products/roots-and-exotics" },
    { name: "Honey & Preservative", path: "/products/honey-and-preservatives" },
    { name: "Fermented Drinks", path: "/products/fermented-drinks" },
  ];
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const handleMouseEnter = () => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    // Set a timeout to close the dropdown after a delay
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // 500ms delay before closing
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handle logout click
  const handleLogout = async () => {
    try {
      await logout();
      // No need to update local state as the context will handle it
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-[#a0c162fb] shadow-lg top-0 sticky z-999">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile Top Bar */}
        <div className="flex justify-between items-center h-16 md:hidden">
          <div className=" w-20 h-12 rounded-xl overflow-hidden">
            <a href="/">
              <img
                src="/images/KB.jpg"
                className=" w-[70px] h-[50px] object-cover"
              />
            </a>
          </div>
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="text-gray-700 hover:text-white relative"
            >
              <GiBeachBag className="w-8 h-8 object-cover" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#176112] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            {/* User Profile Icon */}
            <Link to="/profile" className="text-gray-700 hover:text-white">
              <BsFillPersonFill className="w-8 h-8" />
            </Link>
            {/* Mobile Menu Button */}
            <button
              className="text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Sliding from right */}
        <div
          ref={mobileMenuRef}
          className={`fixed top-16 right-0 h-full w-1/2 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="py-2 space-y-1">
            <Link
              to="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              About
            </Link>
            <Link
              to="/products"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <button
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex justify-between items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Categories
                <svg
                  className={`h-4 w-4 transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </Link>
            {isDropdownOpen && (
              <div className="py-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    className="block px-8 py-2 text-sm text-gray-700 bg-white hover:bg-gray-200"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
            <Link
              to="/contact"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Contact
            </Link>

            {/* Login/Logout Link in Mobile Menu */}
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        <div className="hidden md:flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 -ml-5 flex items-center">
            <a href="/">
              <AnimatedLogo />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden mt-2 md:flex  space-x-8">
            <Link
              to="/"
              className="text-black font-semibold text-lg hover:text-white hover:bg-[#176112] p-2 rounded-full px-5"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-black font-semibold text-lg hover:text-white hover:bg-[#176112] p-2 rounded-full px-5"
            >
              About
            </Link>
            {/* Category Dropdown */}

            <div className="relative justify-items-center group">
              <Link to="/products">
                <button
                  className="text-black font-semibold cursor-pointer text-lg hover:text-white hover:bg-[#176112] p-2 rounded-full px-3 flex items-center"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Categories
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
              </Link>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute justify-items-center top-[50px] -left-7 right w-48 rounded-md duration-300 shadow-lg bg-white z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="py-1">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link
              to="/contact"
              className="text-black text-lg font-semibold hover:text-white hover:bg-[#176112] p-2 rounded-full px-5"
            >
              Contact
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart Icon */}
            <Link
              to="/cart"
              className="text-gray-700 hover:text-white relative"
            >
              <GiBeachBag className="w-8 h-8 object-cover" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#176112] text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Link>
            {/* User Profile Icon */}
            <Link to="/profile" className="text-gray-700 hover:text-white">
              <BsFillPersonFill className="w-8 h-8" />
            </Link>

            {/* Show Login button if user is not authenticated */}
            {!currentUser && (
              <Link to="/auth">
                <button className="text-white  hover:bg-[#176112ac] cursor-pointer bg-[#176112] font-bold p-2 rounded-full px-5 transition duration-200">
                  Login
                </button>
              </Link>
            )}

            {/* Show Logout button if user is authenticated */}
            {currentUser && (
              <button
                onClick={handleLogout}
                className="text-white hover:bg-[#176112ac] md:hidden lg:block cursor-pointer bg-[#176112] font-bold p-2 rounded-full px-5 transition duration-200"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
