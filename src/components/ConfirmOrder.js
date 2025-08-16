import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { cartitems } = useSelector((state) => state.cart);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    if (localStorage.getItem("width") !== null) {
      setScreenWidth(parseInt(localStorage.getItem("width")));
    } else {
      setScreenWidth(window.innerWidth);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shippingdet = JSON.parse(localStorage.getItem("shippingdetails"));

  const getTotal = () => {
    return cartitems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const navtopay = () => {
    navigate("/payment");
    localStorage.setItem("totalprice", (getTotal() * 1.18).toFixed(2));
  };

  return (
    <div className="min-h-screen bg-sky-100 py-24 md:py-24 px-6 sm:px-12 lg:px-20">

      {/* Step Tracker */}
      <div className="flex flex-row justify-center items-center gap-6 text-red-600 text-lg font-bold mb-10">
        <Link to="/mycart" className="flex items-center gap-2 text-green-600">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="hidden md:inline">View Cart</span>
        </Link>
        <span className=" w-20 h-0.5 bg-gray-400"></span>
        <span className="flex items-center gap-2">
          <i className="fa-solid fa-check"></i>
          <span className="hidden md:inline">Fill Details</span>
        </span>
        <span className=" w-20 h-0.5 bg-gray-400"></span>
        <span className="flex items-center gap-2 opacity-40">
          <i className="fa-solid fa-circle-check"></i>
          <span className="hidden md:inline">Payment</span>
        </span>
      </div>

      <div className="bg-white bg-opacity-90 rounded-xl shadow-lg max-w-6xl mx-auto p-10">
        <h1 className="text-center text-3xl font-extrabold mb-16 text-sky-900 leading-relaxed">
          Order Summary
        </h1>

        <ul className="max-h-[400px] overflow-y-auto space-y-8 mb-16 px-4 sm:px-8">
          {cartitems.map((p) => (
            <li
              key={p.product}
              className="flex flex-col sm:flex-row sm:items-center gap-6 bg-sky-50 p-6 rounded-lg shadow-sm"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-28 h-28 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-sky-800 leading-snug">{p.name}</h3>
                <p className="text-gray-600 text-base mt-1">Price: ₹{p.price}</p>
                <p className="text-gray-600 text-base mt-1">Quantity: {p.quantity}</p>
                <p className="text-gray-800 font-bold text-base mt-2">
                  Total: ₹{(p.price * p.quantity).toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-4xl mx-auto items-start"
        >
          <div>
            <h2 className="text-2xl font-bold text-sky-900 mb-8">
              Shipping Address:
            </h2>
            <div className="flex flex-col gap-4 text-gray-700 text-base max-w-md">
              <div className="flex justify-between">
                <span className="font-semibold">Name :</span>
                <span>{shippingdet.userDetails.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Phone :</span>
                <span>{shippingdet.userDetails.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Address :</span>
                <span>{shippingdet.userDetails.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Country :</span>
                <span>{shippingdet.selectedCountry.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">State :</span>
                <span>{shippingdet.selectedState.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">City :</span>
                <span>{shippingdet.selectedCity.label}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-sky-900 mb-8">Invoice Details:</h2>
            <div className="text-gray-700 text-base max-w-md mx-auto space-y-4">
              <div className="flex justify-between font-normal">
                <span>Sub Total:</span>
                <span>₹{getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-normal">
                <span>GST (18%):</span>
                <span>₹{(getTotal() * 0.18).toFixed(2)}</span>
              </div>
              <hr className="border-black border-2" />
              <div className="flex justify-between font-bold text-2xl">
                <span>Grand Total:</span>
                <span>₹{(getTotal() * 1.18).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={navtopay}
          className="block mx-auto mt-20 px-3 py-2 bg-blue-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:bg-blue-700 transition-colors"
        >
          Proceed to Pay
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
