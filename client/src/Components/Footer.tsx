import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0b190dec] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo and About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="rounded-full border-2 border-white p-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M21.5,4.5h-19c-1.1,0-2,0.9-2,2v11c0,1.1,0.9,2,2,2h19c1.1,0,2-0.9,2-2v-11C23.5,5.4,22.6,4.5,21.5,4.5z M12,15.5 l-8-5v-1l8,5l8-5v1L12,15.5z" />
                  </svg>
                </div>
              </div>
              <span className="text-2xl font-bold">Krishi-Bazar</span>
            </div>
            <p className="text-sm text-gray-300">
              Shop fresh fruits, veggies, grains & more — directly from local
              farmers.
            </p>
            <div>
              <h3 className="font-medium mb-3">Follow Us</h3>
              <div className="flex space-x-3">
                <a
                  href="#facebook"
                  className="bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition"
                >
                  <svg
                    className="w-5 h-5 text-[#0b190dec]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                  </svg>
                </a>
                <a
                  href="#twitter"
                  className="bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition"
                >
                  <svg
                    className="w-5 h-5 text-[#0b190dec]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#instagram"
                  className="bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition"
                >
                  <svg
                    className="w-5 h-5 text-[#0b190dec]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white transition"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Delivery Information
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-gray-300 hover:text-white transition"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Sign In
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="text-gray-300 hover:text-white transition"
                >
                  View Cart
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  My Wishlist
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Track My Order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Help Ticket
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Shipping Details
                </a>
              </li>
              <li>
                <a
                  href="/products"
                  className="text-gray-300 hover:text-white transition"
                >
                  Compare products
                </a>
              </li>
            </ul>
          </div>

          {/* Corporate Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Corporate</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Become a Merchant
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Become a Rider
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Foodeliver Business
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Foodeliver Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Our Suppliers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Accessibility
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  Promotions
                </a>
              </li>
            </ul>
          </div>

          {/* Address and Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin size={18} className="mr-2 flex-shrink-0 mt-1" />
                <span className="text-gray-300">
                  10, Vatika City Market, Sector 49, Sohna-Gurgaon Road,
                  Gurgaon: 122018, INDIA
                </span>
              </li>
              <li className="flex">
                <Phone size={18} className="mr-2 flex-shrink-0" />
                <a
                  href="tel:9873937528"
                  className="text-gray-300 hover:text-white transition"
                >
                  +91-9873937528
                </a>
              </li>
              <li className="flex">
                <Mail size={18} className="mr-2 flex-shrink-0" />
                <a
                  href="mailto:team.krishibazar@gmail.com"
                  className="text-gray-300 hover:text-white transition"
                >
                  <span>team.krishibazar@gmail.com</span>
                </a>
              </li>
              <li className="flex">
                <Clock size={18} className="mr-2 flex-shrink-0" />
                <span className="text-gray-300">7:00 - 18:00, Mon - Sun</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-6 border-t border-green-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-300">
            © 2025, Krishi-Bazar - Sustainable Food To Your Door All rights
            reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
