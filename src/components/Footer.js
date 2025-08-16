import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      {/* Top Section */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-8">
        
        {/* About Us */}
        <div className="md:w-1/3 flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold mb-3">About Us</h3>
          <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
            "Snap & Shop" revolutionizes online shopping by integrating
            cutting-edge image recognition technology.
          </p>
        </div>

        {/* Contact Us */}
        <div className="md:w-1/3 flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-300 text-sm">Email: S&S@gmail.com</p>
          <p className="text-gray-300 text-sm">Phone: +94857XXXXX</p>
        </div>

        {/* Follow Us */}
        <div className="md:w-1/3 flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-300 hover:text-white transition">
                Facebook
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-300 hover:text-white transition">
                Twitter
              </Link>
            </li>
            <li>
              <Link to="/" className="text-gray-300 hover:text-white transition">
                Instagram
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-8 pt-4">
        <p className="text-center text-gray-400 text-sm">
          &copy; 2024 Snap & Shop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
