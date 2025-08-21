import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LocationSelector = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

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

  // Load existing shipping details from localStorage
  let shippingdet = null;
  const savedShipping = localStorage.getItem("shippingdetails");
  if (savedShipping && savedShipping !== "null") {
    try {
      shippingdet = JSON.parse(savedShipping);
    } catch (err) {
      console.error("Error parsing shipping details", err);
    }
  }

  // State variables
  const [selectedCountry, setSelectedCountry] = useState(
    shippingdet ? shippingdet.selectedCountry : null
  );
  const [selectedState, setSelectedState] = useState(
    shippingdet ? shippingdet.selectedState : null
  );
  const [selectedCity, setSelectedCity] = useState(
    shippingdet ? shippingdet.selectedCity : null
  );
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const user = useSelector(state => state.userdetails.user);

  const [userDetails, setUserDetails] = useState({
    name: user ? user.username : "",
    email: user ? user.email : "",
    address: shippingdet ? shippingdet.address : "",
    phone: shippingdet ? shippingdet.phone : "",
  });

  // Load all countries
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const options = allCountries.map((c) => ({
      value: c.isoCode,
      label: c.name,
      phonecode: c.phonecode,
    }));
    setCountries(options);
  }, []);

  // Country change handler
  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    const countryStates = State.getStatesOfCountry(country.value);
    setStates(
      countryStates.map((s) => ({
        value: s.isoCode,
        label: s.name,
      }))
    );
    setSelectedState(null);
    setSelectedCity(null);
  };

  // State change handler
  const handleStateChange = (state) => {
    setSelectedState(state);
    const stateCities = City.getCitiesOfState(selectedCountry.value, state.value);
    setCities(stateCities.map((c) => ({ value: c, label: c.name })));
    setSelectedCity(null);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const handleInputChange = (e) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handleProceedToCheckout = () => {
    const shippingdetails = { userDetails, selectedCity, selectedState, selectedCountry };
    localStorage.setItem("shippingdetails", JSON.stringify(shippingdetails));
    navigate("/confirmorder");
  };

  const isFormComplete =
    selectedCountry &&
    selectedState &&
    selectedCity &&
    userDetails.name &&
    userDetails.phone &&
    userDetails.email &&
    userDetails.address;

  return (
    <div className="bg-sky-100 min-h-screen py-24 md:py-20 sm:px-4">
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

      {/* Form Container */}
      <div className="bg-white bg-opacity-90 shadow-sm rounded-xl max-w-3xl mx-auto p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-center mb-8 text-sky-900">
          Add Shipping Details
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            readOnly
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border bg-gray-100 text-gray-500 border-gray-300 focus:ring focus:ring-sky-300 outline-none"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Phone:</label>
          <input
            type="number"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-sky-300 outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            readOnly
            onChange={handleInputChange}
            className="w-full p-3 rounded-lg border bg-gray-100  text-gray-500 border-gray-300 focus:ring focus:ring-sky-300 outline-none"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Address:</label>
          <input
            type="text"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            maxLength={30}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-sky-300 outline-none"
          />

        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Country:</label>
          <Select
            value={selectedCountry}
            onChange={handleCountryChange}
            options={countries}
          />
        </div>

        {/* State */}
        {selectedCountry && (
          <div className="mb-4">
            <label className="block font-medium mb-1">State:</label>
            <Select
              value={selectedState}
              onChange={handleStateChange}
              options={states}
              isDisabled={!selectedCountry}
            />
          </div>
        )}

        {/* City */}
        {selectedState && (
          <div className="mb-4">
            <label className="block font-medium mb-1">City:</label>
            <Select
              value={selectedCity}
              onChange={handleCityChange}
              options={cities}
              isDisabled={!selectedState}
            />
          </div>
        )}

        {/* Proceed Button */}
        {isFormComplete && (
          <div className="text-center mt-6">
            <h5 className="hidden sm:block font-semibold mb-4">
              Please check the details before submitting.
            </h5>
            <button
              onClick={handleProceedToCheckout}
              className="bg-sky-600 hover:bg-sky-700 text-white  px-6 py-2 sm:px-8 sm:py-3 rounded-lg font-semibold shadow-md transition-colors"
            >
              Proceed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
