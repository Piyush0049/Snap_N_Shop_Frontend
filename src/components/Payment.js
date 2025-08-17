import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createorder } from "../actions/orderactions";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Payment() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalprice = Number(localStorage.getItem("totalprice"));
  const { cartitems } = useSelector((state) => state.cart);
  const shippingdet = JSON.parse(localStorage.getItem("shippingdetails"));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const orderdis = {
    shippinginfo: {
      address: shippingdet.userDetails.address,
      city: shippingdet.selectedCity.label,
      state: shippingdet.selectedState.value,
      country: "IN",
      pincode: 125001,
      phoneno: shippingdet.userDetails.phone,
    },
    orderitems: cartitems,
    paymentInfo: { id: "", status: "succeeded" },
    itemsPrice: (totalprice * 100) / 118,
    taxPrice: (totalprice * 18) / 118,
    shippingPrice: 0,
    totalPrice: totalprice,
    orderStatus: "pending",
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      // 1. Create order from backend
      const { data } = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/pay/razorpay`, {
        amount: totalprice,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Snap & Shop",
        description: "Complete your order payment",
        order_id: data.order.id,
        handler: function (response) {
          orderdis.paymentInfo.id = response.razorpay_payment_id;
          dispatch(createorder(orderdis));
          navigate("/success");
        },
        prefill: {
          name: shippingdet.userDetails.name,
          email: shippingdet.userDetails.email,
          contact: shippingdet.userDetails.phone,
        },
        theme: { color: "#0ea5e9" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sky-100 flex flex-col items-center py-24 px-4">
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
        <span className="flex items-center gap-2 opacity-40 text-red-600">
          <i className="fa-solid fa-circle-check"></i>
          <span className="hidden md:inline">Payment</span>
        </span>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-sky-800 mb-6">Complete Payment</h1>
        <p className="text-lg text-slate-700 mb-6">Pay securely with Razorpay</p>
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-3 rounded-xl text-white font-semibold text-lg shadow-md bg-blue-600 hover:bg-blue-700 transition"
        >
          {loading ? "Processing..." : `Pay ₹${totalprice}`}
        </button>
      </div>
    </div>
  );
}

export default Payment;
