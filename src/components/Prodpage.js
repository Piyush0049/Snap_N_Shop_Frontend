import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productdetails, productreview } from "../actions/productActions";
import { useParams, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { addtocart } from "../actions/cartactions";
import toast from "react-hot-toast";

// New carousel import
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function Prodpage() {
  const [showReviews, setShowReviews] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addReviewSection, setAddReviewSection] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(null);

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.userdetails);
  const { product } = useSelector((state) => state.productdetails);
  const { _id } = useSelector((state) => state.userdetails.user || {});

  useEffect(() => {
    dispatch(productdetails(id));
  }, [dispatch, id]);

  const ratings = {
    edit: false,
    size: 22,
    isHalf: true,
    value: product.averageRating,
    activeColor: "#facc15",
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fas fa-star-half-alt" />,
    filledIcon: <i className="fas fa-star" />,
  };

  const addItem = () => {
    toast.success("Item added to cart");
    dispatch(addtocart(id, quantity, _id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(productreview(id, rating, comment));
    setShowReviews(true);
    setAddReviewSection(false);
  };

  return (
    <div className="md:mt-8 py-16 md:px-12 min-h-screen">
      <div className="rounded-2xl max-w-7xl mx-auto px-4 py-8">
        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* LEFT - Product Gallery */}
          <div>
            <div className="rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <Carousel
                showThumbs={false}
                autoPlay={false}
                infiniteLoop={true}
                emulateTouch={true}
              >
                {product.images?.map((item, i) => (
                  <img
                    key={i}
                    src={item.url}
                    alt={`Product ${i + 1}`}
                    className="w-full h-[400px] lg:h-[520px] object-cover hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </Carousel>
            </div>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-2">
              <ReactStars {...ratings} />
              <span className="text-gray-600">{product.numberofrev} Reviews</span>
            </div>
          </div>

          {/* RIGHT - Product Details */}
          <div className="flex flex-col justify-between">
            {/* Title */}
            <div>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-sky-900 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-700 mb-6 leading-relaxed text-justify">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <h2 className="text-4xl font-bold text-emerald-600 mb-6">
              ₹{product.price}
            </h2>

            {/* Category */}
            <p className="mb-4 text-lg">
              <span className="font-semibold">Category:</span> {product.category}
            </p>

            {/* Stock */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="bg-green-100 text-green-700 font-bold px-4 py-1 rounded-full">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 font-bold px-4 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold text-lg">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="px-4 py-2 bg-sky-300 hover:bg-sky-400 text-white"
                >
                  -
                </button>
                <span className="px-6 py-2 text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() =>
                    quantity < product.stock && setQuantity(quantity + 1)
                  }
                  disabled={quantity >= product.stock}
                  className={`px-4 py-2 ${quantity >= product.stock
                      ? "bg-gray-300 text-gray-100 cursor-not-allowed"
                      : "bg-sky-300 hover:bg-sky-400 text-white"
                    }`}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart + Review Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={addItem}
                disabled={product.stock <= 0}
                className={`flex-1 px-7 py-2.5 rounded-lg text-base font-semibold shadow-lg transition-colors duration-300 ${product.stock > 0
                    ? "bg-sky-500 hover:bg-sky-600 text-white"
                    : "bg-gray-400 text-white cursor-not-allowed"
                  }`}
              >
                Add to Cart
              </button>

              <button
                onClick={() =>
                  isAuthenticated
                    ? setAddReviewSection((prev) => !prev)
                    : navigate("/login")
                }
                className="flex-1 px-7 py-2.5 rounded-lg text-base font-semibold shadow-md bg-sky-700 hover:bg-sky-800 text-white"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>

        {/* --- REVIEWS BELOW PRODUCT SECTION --- */}
        <div className="mt-12 border-t pt-8">
          {/* Add Review Form */}
          {addReviewSection && (
            <div className="mb-10 bg-sky-50 border border-sky-200 p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold text-sky-900 mb-4">Add Your Review</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={user.username}
                  readOnly
                  className="border border-gray-300 rounded-lg w-full p-3 mb-4 bg-gray-100"
                />
                <textarea
                  placeholder="Your Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border border-gray-300 rounded-lg w-full p-3 mb-4 min-h-[100px]"
                  required
                />
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="border border-gray-300 rounded-lg w-full p-3 mb-4"
                  required
                >
                  <option value="">Select Rating</option>
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
                >
                  Submit Review
                </button>
              </form>
            </div>
          )}

          {/* Customer Reviews */}
          {showReviews ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl sm:text-2xl font-semibold text-sky-900">Reviews</h4>
                <button
                  onClick={() => setShowReviews(false)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Hide
                </button>
              </div>

              {(!product.reviews || product.reviews.length === 0) ? (
                <p className="text-gray-500">No reviews yet</p>
              ) : (
                <div className="space-y-4">
                  {product.reviews.map((rev) => (
                    <div
                      key={rev._id}
                      className="border border-sky-200 p-3 rounded-md hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-sky-800">{rev.username}</h3>
                        <span className="bg-yellow-400 text-white text-xs px-2 py-1 rounded">{rev.rating} ★</span>
                      </div>
                      <p className="mt-2 text-gray-700">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowReviews(true)}
              className="text-blue-600 font-semibold hover:underline"
            >
              Show Reviews
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Prodpage;
