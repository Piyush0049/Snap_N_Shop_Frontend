import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersallorders } from "../actions/orderactions";

const Myorders = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();

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
    dispatch(usersallorders());
  }, [dispatch]);

  const { orderdet } = useSelector((state) => state.myorders);
  const { user } = useSelector((state) => state.userdetails);
  const userid = user._id;

  let filteredOrders = [];
  if (orderdet && orderdet[0] !== null) {
    filteredOrders = orderdet
      .filter((order) => order.user === userid)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // latest first
  }

  return (
    <div className="min-h-screen bg-sky-100 py-20 md:py-20 sm:px-4 md:px-10">
      {filteredOrders.length > 0 && orderdet !== null ? (
        filteredOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-lg mb-10 p-6 max-w-6xl mx-auto border border-gray-200"
          >
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 mb-6">
              <h1 className="text-2xl font-bold text-sky-900">
                My Order Summary
              </h1>
              <p className="text-gray-600 mt-2 md:mt-0">
                Placed On:{" "}
                <span className="font-semibold">
                  {order.createdAt.toString().slice(0, 10)}
                </span>
              </p>
            </div>

            {/* ORDER ITEMS */}
            <div className="space-y-4">
              {order.orderitems.map((p) => (
                <div
                  key={p._id}
                  className="p-2 rounded-lg flex flex-row sm:items-center gap-4"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-sky-800">{p.name}</h3>
                    {/* <p className="text-gray-600">Price: ₹{p.price}</p> */}
                    <p className="text-gray-600">Quantity: {p.quantity}</p>
                    <p className="text-gray-800 font-semibold">
                      Total: ₹{p.price * p.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER DETAILS */}
            <div className="grid md:grid-cols-2 gap-8 mt-10">
              {/* SHIPPING ADDRESS */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-sky-900">
                  Shipping Address
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <span className="font-medium">Address:</span>{" "}
                    {order.shippinginfo.address}
                  </p>
                  <p>
                    <span className="font-medium">Country:</span>{" "}
                    {order.shippinginfo.country}
                  </p>
                  <p>
                    <span className="font-medium">State:</span>{" "}
                    {order.shippinginfo.state}
                  </p>
                  <p>
                    <span className="font-medium">City:</span>{" "}
                    {order.shippinginfo.city}
                  </p>
                  <p className="mt-2">
                    <span className="font-medium">Order Status:</span>{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 text-sky-900">
                  Invoice Details
                </h2>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Sub Total:</span>
                    <span>₹{order.itemsPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹{order.taxPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Charges:</span>
                    <span>₹{order.shippingPrice}</span>
                  </div>
                  <hr className="my-3 border-gray-300" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Grand Total:</span>
                    <span>₹{order.totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="min-h-screen bg-sky-100 py-8 md:py-20 px-4 md:px-10 flex justify-center items-center text-2xl font-semibold text-gray-600">
          No orders to display!
        </div>
      )}
    </div>
  );
};

export default Myorders;
