import React, { Fragment, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { allproducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

function Allproducts() {
  const [x, setx] = useState(window.innerWidth);
  const [categ, setcateg] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [pagenum, setPagenum] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    const handleResize = () => setx(window.innerWidth);
    window.addEventListener("resize", handleResize);

    const savedWidth = localStorage.getItem("width");
    setx(savedWidth ? parseInt(savedWidth) : window.innerWidth);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(allproducts(params.keyword, pagenum, minPrice, maxPrice, categ));
  }, [dispatch, pagenum, params, categ, minPrice, maxPrice]);

  const { products, resultperpage, productcount } = useSelector(
    (state) => state.products
  );

  let numofpages = products ? Math.ceil(productcount / resultperpage) : 0;

  const handlePageChange = (page) => setPagenum(page);

  const FilterContent = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-72 h-fit border border-gray-200">
      <h5 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900">
        <i className="fa-solid fa-sliders"></i> Price Range
      </h5>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span>₹{minPrice}</span>
          <span>₹{maxPrice}</span>
        </div>

        <input
          type="range"
          min={0}
          max={50000}
          step={500}
          value={minPrice}
          onChange={(e) =>
            setMinPrice(Math.min(Number(e.target.value), maxPrice - 500))
          }
          className="w-full accent-blue-600"
        />
        <input
          type="range"
          min={0}
          max={50000}
          step={500}
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Math.max(Number(e.target.value), minPrice + 500))
          }
          className="w-full accent-blue-600"
        />
      </div>

      <div className="mt-6">
        <h5 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900">
          <i className="fa-solid fa-list"></i> Categories
        </h5>
        <ul className="space-y-2">
          {["None", "Machine", "Device", "Accessories", "Footwear"].map(
            (cat) => (
              <li
                key={cat}
                className={`cursor-pointer px-3 py-2 rounded-md text-sm md:text-base transition ${
                  categ === cat
                    ? "bg-blue-500 text-white"
                    : "hover:bg-blue-100 text-gray-800"
                }`}
                onClick={() => setcateg(cat === "None" ? "" : cat)}
              >
                {cat}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );

  return (
    <Fragment>
      <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
        {/* Filters Button */}
        <div className="flex justify-end items-center px-6 md:px-12 pt-20">
          <button
            onClick={() => setFilterOpen(true)}
            className=" flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            <i className="fa-solid fa-sliders"></i> Filters
          </button>
        </div>

        {/* Products */}
        <div className="flex flex-col lg:flex-row gap-8 px-6 lg:px-12 py-12">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products &&
              products.map((product, index) => (
                <div key={index} className="flex justify-center">
                  <ProductItem product={product} />
                </div>
              ))}
          </div>
        </div>

        {/* Pagination */}
        {numofpages > 1 && (
          <div className="flex justify-center pb-10 space-x-2">
            {Array.from({ length: numofpages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                className={`px-3 py-1 rounded ${
                  pagenum === num
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700"
                } hover:bg-blue-500 hover:text-white transition`}
                onClick={() => handlePageChange(num)}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter Modal */}
      {filterOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50 p-4 overflow-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Filters</h2>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            <FilterContent />

            <button
              onClick={() => setFilterOpen(false)}
              className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Allproducts;
