import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link, useNavigate } from 'react-router-dom';

function ProductItem({ product }) {
  const ratings = {
    edit: false,
    size: 20,
    isHalf: true,
    value: product.averageRating,
    activeColor: '#facc15',
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fas fa-star-half-alt" />,
    filledIcon: <i className="fas fa-star" />,
  };

  const navigate = useNavigate();

  const handleCardClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/product/${product._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group w-full max-w-xs bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-full object-cover transition-transform duration-500 group-hover:scale-110 h-56 sm:h-64 md:h-72"
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Card Body */}
      <div className="p-3">
        <h5 className="text-lg sm:text-xl font-semibold text-gray-900 truncate mb-1">
          {product.name}
        </h5>

        <p className="text-gray-600 text-sm sm:text-base truncate mb-3">
          {product.description}
        </p>

        {/* Price */}
        <Link to={`/product/${product._id}`}>
          <span className="inline-block mb-2 px-4 py-1 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition shadow-sm">
            ₹{product.price}
          </span>
        </Link>

        {/* Reviews */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs sm:text-sm text-gray-500">
            {product.numberofrev} review{product.numberofrev !== 1 && 's'}
          </span>
          <ReactStars {...ratings} />
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
