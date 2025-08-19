import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteuser, userlogout } from "../actions/useractions";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Headers() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const dispatch = useDispatch();
  const { cartitems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.userdetails);
  const { isAuthenticated, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setAccountDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("cartitem");
    localStorage.removeItem("shippingdetails");
    localStorage.removeItem("width");
    dispatch(userlogout());
    toast.success("Logged out successfully");

    setTimeout(() => {
      window.location.href = "/login"; // refresh + navigate
    }, 1500); // wait for toast to be visible
  };

  const deleteaccount = () => {
    if (window.confirm("Are you sure you want to DELETE your Account?")) {
      localStorage.removeItem("width");
      dispatch(deleteuser());
      checkAuth();
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-sky-300 shadow-sm md:py-1.5">
        <nav className="container mx-auto flex items-center justify-between px-4 py-2 lg:py-3">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl tracking-wide text-sky-900 hover:opacity-80 flex items-center"
            style={{ fontFamily: "fantasy" }}
          >
            Snap & Shop
            <sup className="ml-1 text-base font-extrabold text-teal-600 animate-pulse">2.0</sup>
          </Link>



          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center space-x-8 font-medium text-sky-700">
            <li>
              <Link to="/Home" className="hover:text-sky-900 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-sky-900 transition">
                Products
              </Link>
            </li>
            <li>
              <Link to="/myorders" className="hover:text-sky-900 transition">
                My Orders
              </Link>
            </li>

            {/* Account Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                className="flex items-center gap-1 hover:text-sky-900 transition"
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
              >
                Your Account <i className="fa-solid fa-user"></i>
              </button>
              {accountDropdownOpen && (
                <ul className="absolute top-10 right-0 w-48 bg-white rounded-xl border border-sky-200 shadow-lg overflow-hidden z-50">
                  {isAuthenticated && user.work === "admin" && (
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-5 py-2.5 hover:bg-sky-100 font-semibold text-sky-800"
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {!isAuthenticated && (
                    <li>
                      <Link
                        to="/login"
                        className="block px-5 py-2.5 hover:bg-sky-100"
                      >
                        Log In
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/account"
                      className="block px-5 py-2.5 hover:bg-sky-100"
                    >
                      My Account
                    </Link>
                  </li>
                  {isAuthenticated && (
                    <>
                      <li>
                        <button
                          onClick={logout}
                          className="w-full text-left px-5 py-2.5 hover:bg-gray-100 text-red-600 font-semibold"
                        >
                          Log Out
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={deleteaccount}
                          className="w-full text-left px-5 py-2.5 hover:bg-red-100 text-red-700 font-bold"
                        >
                          Delete
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </li>

            {isAuthenticated && (
              <li>
                <Link
                  to="/mycart"
                  className="relative flex items-center gap-1 hover:text-sky-900"
                >
                  My Cart <i className="fa-solid fa-cart-shopping text-lg"></i>
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold px-2 rounded-full shadow">
                    {cartitems?.length || 0}
                  </span>
                </Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <img
                  src="/img/snapedit_1710434121810.jpeg"
                  alt="Profile"
                  className="w-9 h-9 rounded-full border border-sky-200 shadow cursor-pointer"
                />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-sky-100 transition"
            onClick={() => setMobileMenuOpen(true)}
          >
            <i className="fa-solid fa-bars text-xl text-sky-700" />
          </button>
        </nav>
      </header>

      {/* MOBILE SIDEBAR + OVERLAY */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className={`fixed inset-y-0 left-0 w-80 md:w-96 bg-gradient-to-b from-sky-50 to-white 
  border-r border-sky-200 shadow-2xl transform transition-transform duration-300 z-50
  ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-sky-200">
              <h2 className="text-lg font-bold text-sky-800">Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-sky-100 rounded-full"
              >
                <i className="fa-solid fa-xmark text-2xl text-sky-700" />
              </button>
            </div>

            {/* Nav Links */}
            <ul className="flex flex-col px-6 py-6 space-y-4 text-sky-800 font-medium">
              <li>
                <Link
                  to="/Home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-sky-900 flex items-center gap-3"
                >
                  <i className="fa-solid fa-house text-sky-600" /> Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-sky-900 flex items-center gap-3"
                >
                  <i className="fa-solid fa-box-open text-sky-600" /> Products
                </Link>
              </li>
              <li>
                <Link
                  to="/myorders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-sky-900 flex items-center gap-3"
                >
                  <i className="fa-solid fa-bag-shopping text-sky-600" /> My Orders
                </Link>
              </li>
              {!isAuthenticated && (
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-sky-900 flex items-center gap-3"
                  >
                    <i className="fa-solid fa-right-to-bracket text-sky-600" /> Log In
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-sky-900 flex items-center gap-3"
                >
                  <i className="fa-solid fa-user-circle text-sky-600" /> My Account
                </Link>
              </li>
              {isAuthenticated && user.work === "admin" && (
                <li>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="hover:text-sky-900 flex items-center gap-3"
                  >
                    <i className="fa-solid fa-chart-line text-sky-600" /> Dashboard
                  </Link>
                </li>
              )}
              {isAuthenticated && (
                <li>
                  <Link
                    to="/mycart"
                    className="relative flex items-center gap-3 hover:text-sky-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="fa-solid fa-cart-shopping text-sky-600 text-lg"></i>{" "}
                    My Cart
                    <span className="absolute left-28 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                      {cartitems?.length || 0}
                    </span>
                  </Link>
                </li>
              )}
            </ul>

            {/* User Info Section */}
            {isAuthenticated && (
              <div className="absolute bottom-0 w-full px-6 py-5 bg-sky-50 border-t border-sky-200">
                <div className="flex items-center gap-3">
                  <img
                    src="/img/snapedit_1710434121810.jpeg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-sky-200 shadow"
                  />
                  <div className="flex-1">
                    <p className="text-sky-900 font-semibold">{user.username}</p>
                    <button
                      onClick={logout}
                      className="text-sm text-red-600 font-medium hover:underline"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
                <button
                  onClick={deleteaccount}
                  className="mt-3 w-full py-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-lg"
                >
                  Delete Account
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Headers;
