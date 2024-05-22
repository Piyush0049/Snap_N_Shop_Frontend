import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import profilepic from "./snap--shop-high-resolution-logo.png";
import { useState } from 'react';
import { deleteuser, userlogout } from './actions/useractions';

function Headers() {
  const dispatch = useDispatch();
  const headerStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 999,
    backgroundColor: 'black',
    opacity: 0.7,
    color: '#ffffff',
  };

  const { cartitems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.userdetails);
  const [showMessage, setShowMessage] = useState(false);

  const logout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.setItem("cartitem", "");
      localStorage.setItem("shippingdetails", null);
      localStorage.removeItem('width');
      dispatch(userlogout());
    }
  }

  const deleteaccount = () => {
    if (window.confirm("Are you sure you want to DELETE your Account?")) {
      localStorage.removeItem('width');
      dispatch(deleteuser());
    }
  }


  return (
    <div style={{ width: "100%" }}>
      <nav className="navbar navbar-expand-lg navbar-dark" style={headerStyle}>
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" style={{ fontSize: "20px" }}>Snap & Shop</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/Home" className="nav-link" aria-current="page" style={{ fontSize: "15px" }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link" style={{ fontSize: "15px" }}>Products</Link>
              </li>
              <li className="nav-item">
                <Link to="/myorders" className="nav-link" style={{ fontSize: "15px" }}>My Orders</Link>
              </li>
              <li className="nav-item">
                <Link to="/search" className="nav-link" style={{ fontSize: "15px" }}>Search<i className="fa-solid fa-magnifying-glass" style={{ fontSize: "17px" }}></i></Link>
              </li>

              <li className="nav-item dropdown">
                <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: "15px" }}>
                  Your Account<i className="fa-solid fa-user" style={{ fontSize: "15px" }}></i>
                </div>
                <ul className="dropdown-menu" style={{ fontSize: "15px", position: 'absolute', top: '100%', left: '0', transform: 'translateY(0)' }}>
                  {isAuthenticated && user.work === "admin" && (
                    <li><Link to="/dashboard" className="dropdown-item"><b>Dashboard</b></Link></li>
                  )}
                  {!isAuthenticated ? (
                    <li><Link to="/login" className="dropdown-item">Log In</Link></li>
                  ) : null}
                  <li><Link to="/account" className="dropdown-item">My Account</Link></li>
                  {isAuthenticated && (
                    <>
                      <li><button className="dropdown-item" onClick={() => logout()}>Log Out</button></li>
                      <li><button className="dropdown-item" onClick={() => deleteaccount()}>Delete Account</button></li>
                    </>
                  )}
                </ul>
              </li>


              <li className="nav-item">
                {isAuthenticated && (
                  <li className="nav-item">
                    <Link to="/mycart" className="nav-link" style={{ fontSize: "15px" }}>
                      My Cart
                      <div style={{ position: "relative", display: "inline-block" }}>
                        <i className="fa-solid fa-cart-shopping" style={{ fontSize: "20px", position: "relative" }}></i>
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ width: "17px", height: "17px", fontSize: "10px", display: "flex", justifyContent: "center", alignItems: "center", transform: "translate(-50%, -50%)" }}>
                          {cartitems !== null && cartitems.length > 0 ? cartitems.length : 0}
                        </span>
                      </div>
                    </Link>
                  </li>
                )}
              </li>



              <li className="nav-item">
                {isAuthenticated && (
                  <>
                    <img onMouseEnter={() => setShowMessage(true)} onMouseLeave={() => setShowMessage(false)} src={profilepic} alt="Uploaded" style={{ width: "40px", height: "40px", borderRadius: "100%", marginLeft: "10px" }} />
                    {showMessage && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: "50%",
                          transform: 'translateX(-50%)',
                          backgroundColor: '#333',
                          color: '#fff',
                          padding: '10px 20px',
                          whiteSpace: "nowrap",
                          borderRadius: '5px',
                          fontSize: "13px",
                          zIndex: '999',
                        }}
                      >
                        Welcome, {user.username}. You are currently logged in.
                      </div>
                    )}
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Headers;
