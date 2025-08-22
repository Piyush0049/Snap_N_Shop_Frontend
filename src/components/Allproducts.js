import React, { Fragment, useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { allproducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import { Dialog } from "@mui/material";

function Allproducts() {
  const [x, setx] = useState(window.innerWidth);
  const [categ, setcateg] = useState("");
  const [range, setRange] = useState([0, 90000]);
  const [pagenum, setPagenum] = useState("");
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
    dispatch(allproducts(params.keyword, pagenum, range[0], range[1], categ));
  }, [dispatch, pagenum, params, categ, range]);

  const { products, resultperpage, productcount } = useSelector(
    (state) => state.products
  );

  let numofpages = products ? Math.ceil(productcount / resultperpage) : 0;

  const handlePageChange = (event, p) => setPagenum(p);
  const handleChange = (event, newValue) => setRange(newValue);
  const onClickcateg = (e) => setcateg(e.target.innerText);

  const FilterContent = () => (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-72 h-fit border border-gray-200">
      
      <Slider
        value={range}
        onChange={handleChange}
        min={0}
        max={50000}
        step={500}
        marks={[
          { value: 0, label: "₹0" },
          { value: 50000, label: "₹50k" },
        ]}
        valueLabelDisplay="auto"
        sx={{
          color: "#2563eb",
          "& .MuiSlider-rail": { backgroundColor: "#ddd" },
          "& .MuiSlider-track": { backgroundColor: "#2563eb" },
          "& .MuiSlider-thumb": { backgroundColor: "#2563eb" },
        }}
      />

      <div className="mt-6">
        <h5 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900">
          <i className="fa-solid fa-list"></i> Categories
        </h5>
        <ul className="space-y-2">
          {[
            "None",
            "Machine",
            "Device",
            "Accessories",
            "Footwear",
          ].map((cat) => (
            <li
              key={cat}
              className={`cursor-pointer px-3 py-2 rounded-md text-sm md:text-base transition ${categ === cat
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100 text-gray-800"
                }`}
              onClick={() => setcateg(cat === "None" ? "" : cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );

  return (
    <Fragment>
      <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 via-blue-100 to-blue-200">
        <div className="flex justify-end items-center px-6 md:px-12 pt-20">
          <button
            onClick={() => setFilterOpen(true)}
            className=" flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            <i className="fa-solid fa-sliders"></i> Filters
          </button>
        </div>

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

        {numofpages > 1 && (
          <div className="flex justify-center pb-10">
            <Pagination
              count={numofpages}
              color="primary"
              size="large"
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <Dialog open={filterOpen} onClose={() => setFilterOpen(false)}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
            <button
              onClick={() => setFilterOpen(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <i className="fa-solid fa-xmark text-2xl"></i>
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
      </Dialog>
    </Fragment>
  );
}

export default Allproducts;
