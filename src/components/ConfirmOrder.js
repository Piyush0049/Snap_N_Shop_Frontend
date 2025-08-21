import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { cartitems } = useSelector((state) => state.cart);

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
    <div className="min-h-screen bg-sky-50 py-20 sm:px-12 lg:px-20">
      <div className="bg-white rounded-xl shadow-md max-w-6xl mx-auto p-8">
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
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-sky-900">Order Summary</h1>
          <Link
            to="/mycart"
            className="text-blue-600 font-medium hover:underline mt-2 md:mt-0"
          >
            Back to Cart
          </Link>
        </div>

        {/* ORDER ITEMS */}
        <div className="space-y-4">
          {cartitems.map((p) => (
            <div
              key={p.product}
              className="p-4 rounded-lg flex flex-row sm:items-center gap-4 bg-sky-50"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-lg text-sky-800">{p.name}</h3>
                <p className="text-gray-600">Quantity: {p.quantity}</p>
                <p className="text-gray-800 font-semibold">
                  Total: ₹{(p.price * p.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* SHIPPING + INVOICE */}
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {/* SHIPPING ADDRESS */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-sky-900">
              Shipping Address
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {shippingdet.userDetails.name}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {shippingdet.userDetails.phone}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {shippingdet.userDetails.address}
              </p>
              <p>
                <span className="font-medium">Country:</span>{" "}
                {shippingdet.selectedCountry.label}
              </p>
              <p>
                <span className="font-medium">State:</span>{" "}
                {shippingdet.selectedState.label}
              </p>
              <p>
                <span className="font-medium">City:</span>{" "}
                {shippingdet.selectedCity.label}
              </p>
            </div>
          </div>

          {/* INVOICE */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-sky-900">
              Invoice Details
            </h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Sub Total:</span>
                <span>₹{getTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%):</span>
                <span>₹{(getTotal() * 0.18).toFixed(2)}</span>
              </div>
              <hr className="my-3 border-gray-300" />
              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total:</span>
                <span>₹{(getTotal() * 1.18).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA BUTTON */}
        <div className="text-center mt-12">
          <button
            onClick={navtopay}
            className="px-6 py-2 sm:py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
