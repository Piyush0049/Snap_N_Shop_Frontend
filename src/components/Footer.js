import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-sky-50 via-teal-50 to-sky-100 text-gray-700 py-7 sm:py-14 border-t-teal-100 border-t-[1px]">
      <div className="hidden sm:grid container mx-auto px-6  grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* About Us */}
        <div className="hidden sm:block">
          <h3 className="text-2xl font-bold text-gray-900 mb-5">About Us</h3>
          <p className="text-gray-700 text-sm leading-relaxed text-justify max-w-sm mx-auto md:mx-0">
            <span className="font-bold text-sky-600">Snap & Shop </span>
            revolutionizes online shopping by integrating 
            cutting-edge image recognition technology, making 
            your shopping experience smarter, faster, and seamless.
          </p>
        </div>

        {/* Contact Us */}
        <div className="hidden sm:block">
          <h3 className="text-2xl font-bold text-gray-900 mb-5">Contact Us</h3>
          <p className="text-sm mb-3">
            <span className="font-semibold text-gray-800">Email:</span>{" "}
            <span className="text-gray-600">S&S@gmail.com</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-800">Phone:</span>{" "}
            <span className="text-gray-600">+94857XXXXX</span>
          </p>
        </div>

        {/* Follow Us */}
        <div className="hidden sm:block">
          <h3 className="text-2xl font-bold text-gray-900 mb-5">Follow Us</h3>
          <div className="flex justify-center md:justify-center space-x-6">
            <Link
              to="/"
              className="p-3 rounded-full bg-white shadow hover:bg-sky-600 hover:text-white transition transform hover:scale-110"
            >
              <FaFacebookF size={18} />
            </Link>
            <Link
              to="/"
              className="p-3 rounded-full bg-white shadow hover:bg-sky-600 hover:text-white transition transform hover:scale-110"
            >
              <FaTwitter size={18} />
            </Link>
            <Link
              to="/"
              className="p-3 rounded-full bg-white shadow hover:bg-sky-600 hover:text-white transition transform hover:scale-110"
            >
              <FaInstagram size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="sm:border-t sm:border-gray-300 sm:mt-12 sm:pt-6">
        <p className="text-center text-gray-500 text-sm">
          &copy; 2025{" "}
          <span className="font-semibold text-sky-600">Snap & Shop</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
