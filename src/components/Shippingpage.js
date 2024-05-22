import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';
import backimage from "./snapedit_1710779459498.jpeg";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LocationSelector = () => {
  const navigate = useNavigate();
  
  // Initialize shippingdet as null
  let shippingdet = null;
  
  // Retrieve shippingdetails from localStorage
  const a = localStorage.getItem("shippingdetails");
  
  // Parse shippingdetails if it's a valid JSON string
  if (a && a !== "null") {
    try {
      shippingdet = JSON.parse(a);
    } catch (error) {
      console.error("Error parsing shipping details:", error);
    }
  }

  // Set state variables with default values or values from shippingdet
  const [selectedCountry, setSelectedCountry] = useState(shippingdet ? shippingdet.selectedCountry : null);
  const [selectedState, setSelectedState] = useState(shippingdet ? shippingdet.selectedState : null);
  const [selectedCity, setSelectedCity] = useState(shippingdet ? shippingdet.selectedCity : null);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: shippingdet ? shippingdet.userDetails.name : "",
    email: shippingdet ? shippingdet.userDetails.email : "",
    address: shippingdet ? shippingdet.userDetails.address : "",
    phone: shippingdet ? shippingdet.userDetails.phone : "",
  });

  // Scroll to the top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch all countries and set them in state
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    const countryOptions = allCountries.map(country => ({
      value: country.isoCode,
      label: country.name,
      phonecode: country.phonecode
    }));
    setCountries(countryOptions);
  }, []);

  // Handle country change
  const handleCountryChange = selectedOption => {
    setSelectedCountry(selectedOption);

    // Fetch states of the selected country
    const countryStates = State.getStatesOfCountry(selectedOption.value);
    const stateOptions = countryStates.map(state => ({
      value: state.isoCode,
      label: state.name
    }));
    setStates(stateOptions);

    // Reset selected state and city
    setSelectedState(null);
    setSelectedCity(null);
  };

  // Handle state change
  const handleStateChange = selectedOption => {
    setSelectedState(selectedOption);

    // Fetch cities of the selected state
    const stateCities = City.getCitiesOfState(selectedCountry.value, selectedOption.value);
    const cityOptions = stateCities.map(city => ({
      value: city,
      label: city.name
    }));
    setCities(cityOptions);

    // Reset selected city
    setSelectedCity(null);
  };

  // Handle city change
  const handleCityChange = selectedOption => {
    setSelectedCity(selectedOption);
  };

  // Handle input change for user details
  const handleInputChange = e => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  // Style object for inline styling
  const styles = {
    hr2: {
      borderWidth: "2px",
      opacity: 0.6,
      width: "300px",
    },
    container: {
      maxWidth: "80%",
      maxHeight : '2000px',
      height : "auto",
      width : "auto",
      margin: 'auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
      position: "relative",
      top: "1px",
    },
    userDetailsContainer: {
      marginTop: '20px',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
    },
    label: {
      marginBottom: '5px',
      fontSize: "19px",
    },
    input: {
      marginBottom: '10px',
      width: '100%',
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxSizing: 'border-box',
    },
    selectContainer: {
      marginBottom: '20px',

    },
    proceedButton: {
      marginTop: '30px',
      padding: '15px 30px',
      fontSize: "18px" ,
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      outline: 'none',

    },
  };

  const shippingdetails = { userDetails, selectedCity, selectedState, selectedCountry };

  // Handle proceed to checkout
  const handleProceedToCheckout = () => {
    localStorage.setItem('shippingdetails', JSON.stringify(shippingdetails));
    navigate("/confirmorder");
  }

  return (
    <div style={{
      backgroundImage: `url(${backimage})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight:  '1000px', // Adjusted height based on window width
      width : "100%",
      height: "auto",
      paddingTop : "90px"
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Link to="/mycart" style={{ fontSize:'25px' , color: "green", textDecoration: "none" }}>Place Order <i className="fa-solid fa-cart-shopping"></i></Link>
        <hr style={styles.hr2} />
        <Link style={{ fontSize:  '25px', color: "red", textDecoration: "none" }}>Confirm Order <i className="fa-solid fa-check"></i></Link>
        <hr style={styles.hr2} />
        <Link style={{ fontSize: '25px', color: "red", textDecoration: "none" }}>Payment <i className="fa-solid fa-circle-check"></i></Link>
      </div>

      <div style={styles.container}>
        <h2 style={{ marginBottom: "35px", textAlign: "center"}}><b>Add Shipping Details : </b></h2>
        <div style={styles.selectContainer}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.selectContainer}>
          <label style={styles.label}>Phone:</label>
          <input
            type="Number"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <div style={styles.selectContainer}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.selectContainer}>
          <label style={styles.label}>Address:</label>
          <input
            type="text"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.selectContainer}>
          <label style={styles.label}>Country:</label>
          <Select
            value={selectedCountry}
            onChange={handleCountryChange}
            options={countries}
          />
        </div>
        {selectedCountry && (
          <div style={styles.selectContainer}>
            <label style={styles.label}>State:</label>
            <Select
              value={selectedState}
              onChange={handleStateChange}
              options={states}
              isDisabled={!selectedCountry}
            />
          </div>
        )}
        {selectedState && (
          <div style={styles.selectContainer}>
            <label style={styles.label}>City:</label>
            <Select
              value={selectedCity}
              onChange={handleCityChange}
              options={cities}
              isDisabled={!selectedState}
            />
          </div>
        )}
        {selectedCountry && selectedState && selectedCity && userDetails.name && userDetails.phone && userDetails.address && userDetails.email && (
          <div style={{ textAlign: 'center' }}>
            <h5 style={{ fontFamily: "revert", marginTop: "20px" }}><b>Please check the details before submitting.</b></h5>
            <button style={styles.proceedButton} onClick={handleProceedToCheckout}>Proceed To Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationSelector;
