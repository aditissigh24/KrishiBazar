import { useState } from "react";
import { GiBeachBag } from "react-icons/gi";
import { BsFillPersonFill } from "react-icons/bs";
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const categories = [
    "Vegetables",
    "Fruits",
    "Herbs & Greens",
    "Root & Exotic",
    "Honey & Preservative",
    "Fermented Drinks",
  ];

  return (
    <nav className="bg-[#a0c162fb] shadow-lg top-0 sticky z-999">
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile Top Bar */}
        <div className="flex justify-between items-center h-16 md:hidden">
          <div className="flex-shrink-0">
            <img
              className="h-8 w-auto"
              src="https://placehold.co/100x40?text=LOGO"
              alt="Logo"
            />
          </div>
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <a href="/cart" className="text-gray-700">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </a>
            {/* User Profile Icon */}
            <a href="/profile" className="text-gray-700">
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </a>
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
          className={`fixed top-16 right-0 h-full w-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="py-2 space-y-1">
            <a
              href="/"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Home
            </a>
            <a
              href="/about"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              About
            </a>
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
            {isDropdownOpen && (
              <div className=" py-2">
                {categories.map((category) => (
                  <a
                    key={category}
                    href={`/category/${category.toLowerCase()}`}
                    className="block px-8 py-2 text-sm text-gray-700 bg-white hover:bg-gray-200"
                  >
                    {category}
                  </a>
                ))}
              </div>
            )}
            <a
              href="/contact"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Contact
            </a>
          </div>
        </div>

        <div className="hidden md:flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-8 w-auto"
              src="https://placehold.co/100x40?text=LOGO"
              alt="Logo"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-black font-semibold  text-lg  hover:text-white hover:bg-[#176112] p-2 rounded-full px-5"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-black font-semibold text-lg hover:text-white hover:bg-[#176112] p-2 rounded-full px-5"
            >
              About
            </a>
            {/* Category Dropdown */}
            <div className="relative group">
              <button
                className="text-black font-semibold  text-lg hover:text-white hover:bg-[#176112] p-2 rounded-full px-3 flex items-center"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
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
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div
                  className="absolute -left-7 w-48 rounded-md shadow-lg bg-white  z-50"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <div className="py-1">
                    {categories.map((category) => (
                      <a
                        key={category}
                        href={`/category/${category.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {category}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <a
              href="/contact"
              className="text-black text-lg font-semibold hover:text-white hover:bg-[#176112] p-2 rounded-full px-5"
            >
              Contact
            </a>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart Icon */}
            <a href="/cart" className="text-gray-700 hover:text-white">
              <GiBeachBag className="w-8 h-8" />
            </a>
            {/* User Profile Icon */}
            <a href="/profile" className="text-gray-700 hover:text-white">
              <BsFillPersonFill className="w-8 h-8" />
            </a>
            {/* Login Button */}
            <a href="/auth">
              <button className="text-white hover:bg-[#176112ac] cursor-pointer bg-[#176112] font-bold p-2 rounded-full px-5 transition duration-200">
                Login
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-700 hover:text-blue-600">
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
      </div>
    </nav>
  );
};

export default Navbar;
