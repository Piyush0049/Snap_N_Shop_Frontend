import { useSelector, useDispatch } from "react-redux";
import { addtocart, removefromcart } from "../actions/cartactions";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MyCart = () => {
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

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartitems } = useSelector((state) => state.cart);
  const { _id } = useSelector((state) => state.userdetails.user);
  const { isAuthenticated } = useSelector((state) => state.userdetails);

  const increaseQuant = (productId, quantity, stock) => {
    if (quantity < stock) dispatch(addtocart(productId, quantity + 1, _id));
  };

  const decreaseQuant = (productId, quantity) => {
    if (quantity > 1) dispatch(addtocart(productId, quantity - 1, _id));
  };

  const getTotal = () =>
    cartitems
      ? cartitems.reduce((total, item) => total + item.price * item.quantity, 0)
      : 0;

  const deleteprod = (productId, quantity, stock) => {
    dispatch(removefromcart(productId, quantity, stock));
    toast.success("Item removed from cart");
  };

  const navtoship = () => {
    if (isAuthenticated) {
      navigate("/shipping");
    }
  };

  return (
    <div className="bg-sky-100 min-h-screen py-24 md:py-24 px-4">
      {/* Step Tracker */}
      <div className="flex flex-row justify-center items-center gap-6 text-red-600 text-lg font-bold mb-10">
        <Link to="/mycart" className="flex items-center gap-2">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="hidden md:inline">View Cart</span>
        </Link>
        <span className=" w-20 h-0.5 bg-gray-400"></span>
        <span className="flex items-center gap-2 opacity-40">
          <i className="fa-solid fa-check"></i>
          <span className="hidden md:inline">Fill Details</span>
        </span>
        <span className=" w-20 h-0.5 bg-gray-400"></span>
        <span className="flex items-center gap-2 opacity-40">
          <i className="fa-solid fa-circle-check"></i>
          <span className="hidden md:inline">Payment</span>
        </span>
      </div>


      {/* Cart Container */}
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-sky-900">
          Your Cart
        </h1>

        {/* Empty Cart Message */}
        {cartitems === null || cartitems.length === 0 ? (
          <div className="text-center text-gray-500 font-semibold py-10">
            Your cart is empty
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-6">
              {cartitems.map((p) => (
                <div
                  key={p.product}
                  className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-sky-50 border border-sky-200 rounded-lg shadow-sm"
                >
                  {/* Product Image */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{p.name}</h3>
                    <p className="text-gray-600">Price: ₹{p.price}</p>
                    <p className="text-gray-600">Total: ₹{p.price * p.quantity}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center">
                    <button
                      onClick={() => decreaseQuant(p.product, p.quantity)}
                      className="bg-sky-400 hover:bg-sky-500 text-white px-3 py-1 rounded-l"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 font-bold">{p.quantity}</span>
                    <button
                      onClick={() =>
                        increaseQuant(p.product, p.quantity, p.stock)
                      }
                      disabled={p.quantity === p.stock}
                      className={`px-3 py-1 rounded-r ${p.quantity === p.stock
                        ? "bg-gray-300 text-gray-100 cursor-not-allowed"
                        : "bg-sky-400 hover:bg-sky-500 text-white"
                        }`}
                    >
                      +
                    </button>
                  </div>

                  {/* Delete Icon */}
                  <i
                    className="fa-solid fa-trash text-gray-500 hover:text-red-500 cursor-pointer"
                    onClick={() => deleteprod(p.product, p.quantity, p.stock)}
                  ></i>
                </div>
              ))}
            </div>

            {/* Grand Total */}
            <div className="text-center text-xl font-bold mt-8">
              Total: ₹{getTotal().toFixed(2)}
            </div>

            {/* Checkout Button */}
            <div className="flex justify-center mt-6">
              <button
                onClick={navtoship}
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-8 py-3 rounded-lg shadow-md"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyCart;
