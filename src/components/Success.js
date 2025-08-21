import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Success = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-24 px-4">
      <div className="flex flex-row justify-center items-center gap-6 text-red-600 text-lg font-bold mb-10">
        <Link to="/mycart" className="flex items-center gap-2 text-green-600">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="hidden md:inline">View Cart</span>
        </Link>
        <span className=" w-20 h-0.5 bg-gray-400"></span>
        <span className="flex items-center gap-2 text-green-600">
          <i className="fa-solid fa-check"></i>
          <span className="hidden md:inline">Fill Details</span>
        </span>
        <span className=" w-20 h-0.5 bg-gray-400"></span>
        <span className="flex items-center gap-2 text-green-600">
          <i className="fa-solid fa-circle-check"></i>
          <span className="hidden md:inline">Payment</span>
        </span>
      </div>

      <div className="bg-opacity-90 backdrop-blur-md rounded-3xl p-10 flex flex-col items-center max-w-lg w-full text-center">
        <img
          src="/success.gif"
          alt="Payment success animation"
          className={` ${screenWidth > 800 ? "w-auto max-w-md" : "w-full"}`}
          loading="lazy"
        />
        <h2 className="text-2xl sm:text-3xl font-bold text-sky-900 mb-6">
          Payment Successful!
        </h2>
        <Link
          to="/myorders"
          className="text-lg sm:text-xl text-sky-700 font-semibold hover:underline"
        >
          See Your Orders
        </Link>
      </div>
    </div>
  );
};

export default Success;
