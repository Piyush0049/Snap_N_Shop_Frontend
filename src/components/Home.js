import React, { useEffect, useState } from "react";
import { allproducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setScreenWidth(
      localStorage.getItem("width")
        ? parseInt(localStorage.getItem("width"))
        : window.innerWidth
    );
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(allproducts());
  }, [dispatch]);

  // Why Us Features
  const featureIcons = [
    {
      icon: (
        <svg className="h-12 w-12 text-sky-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 1.79-8 4v1a1 1 0 001 1h14a1 1 0 001-1v-1c0-2.21-3.582-4-8-4z" />
        </svg>
      ),
      title: "Custom Experience",
      desc: "Personalized shopping made just for you.",
    },
    {
      icon: (
        <svg className="h-12 w-12 text-purple-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
      ),
      title: "Beautiful UI",
      desc: "Clean, smooth & intuitive shopping interface.",
    },
    {
      icon: (
        <svg className="h-12 w-12 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h11M9 21V7a4 4 0 00-4-4H3" />
        </svg>
      ),
      title: "Fast Delivery",
      desc: "Get your products in no time.",
    },
    {
      icon: (
        <svg className="h-12 w-12 text-pink-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
        </svg>
      ),
      title: "Seamless Payments",
      desc: "UPI & Razorpay powered secure checkouts.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50 flex flex-col">
      <section className="relative flex flex-col justify-center items-center min-h-[600px] pt-24 pb-16 overflow-hidden">
        {/* Background Animated Shapes */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-100 via-cyan-100 to-teal-100 animate-gradient-x opacity-40" />
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-200"></div>

        <motion.div
          className="relative text-center z-10 px-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            className=" text-slate-900 drop-shadow-lg tracking-tight"
            style={{
              fontFamily: "fantasy",
              fontSize: screenWidth > 536 ? "3.8rem" : "2.6rem",
              lineHeight: 1.1,
            }}
          >
            SNAP & SHOP!
          </h1>
          <h2
            className="mt-6 text-sky-700 tracking-wide"
            style={{
              fontFamily: "fantasy",
              fontSize: screenWidth > 536 ? "2.4rem" : "1.5rem",
            }}
          >
            ORDER WITH A "SNAP"
          </h2>
          <p className="text-lg md:text-xl mt-5 text-sky-800 font-medium max-w-xl mx-auto">
            Shop smarter, faster, and greener with one click.
          </p>
          <Link
            to="/products"
            className="inline-block mt-8 px-8 py-2 bg-gradient-to-r from-sky-500 to-cyan-400 shadow-xl text-white font-bold text-base rounded-full hover:from-sky-600 hover:to-cyan-600 transform hover:scale-110 transition-all duration-200"
          >
            Shop Now
          </Link>
        </motion.div>

        {/* Scroll Down */}
        <div className="absolute bottom-5 flex justify-center w-full">
          <motion.span
            className="text-cyan-500"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.span>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container max-w-6xl mx-auto py-20 px-6">
        <h4 className="text-3xl font-extrabold text-center text-sky-900 mb-14">
          Why Snap & Shop?
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featureIcons.map((feat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-sm py-12 px-6 hover:shadow-2xl transition"
              whileHover={{ scale: 1.08, rotate: 1 }}
            >
              <div className="mb-4">{feat.icon}</div>
              <span className="text-lg font-bold text-sky-800 mb-2">{feat.title}</span>
              <span className="text-gray-600 text-sm text-center">{feat.desc}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-gradient-to-br from-white to-sky-50 py-20 px-6">
        <h4 className="text-3xl font-extrabold text-center text-sky-900 mb-12">
          Featured Products
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {products && products.slice(0, 4).map((prod, i) => (
            <motion.div
              key={prod._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-2xl p-5 flex flex-col"
              whileHover={{ scale: 1.05 }}
            >
              <img src={prod.images[0].url} alt={prod.name} className="rounded-lg h-48 w-full object-cover mb-4" />
              <h5 className="text-lg font-bold text-sky-800">{prod.name}</h5>
              <p className="text-gray-600 text-sm flex-grow">{prod.description.slice(0, 60)}...</p>
              <span className="text-sky-600 font-semibold mt-3">₹{prod.price}</span>
              <Link
                to={`/product/${prod._id}`}
                className="mt-4 inline-block px-6 py-2 bg-sky-500 text-white rounded-lg font-semibold text-sm hover:bg-sky-600 transition"
              >
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
