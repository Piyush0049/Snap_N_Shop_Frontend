import Headers from "./components/Headers";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Prodpage from "./components/Prodpage";
import Allproducts from "./components/Allproducts"
import Searchbar from "./components/Searchbar";
import LoginPage from "./components/Login";
import Account from "./components/Account";
import Getnewpassword from "./components/Getnewpassword";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import Forgotpassword from "./components/Forgotpassword";
import Mycart from "./components/Mycart";
import Shippingpage from "./components/Shippingpage";
import Payment from "./components/Payment"
import ConfirmOrder from "./components/ConfirmOrder";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Success from "./components/Success";
import Myorders from "./components/Myorders";
import Dashboard from "./components/Dashboard";
function App() {
  const { isAuthenticated } = useSelector((state) => state.userdetails);
  const ud = useSelector((state) => state.userdetails)
  useEffect(() => {
    if (Object.keys(ud).length === 1) {
      localStorage.setItem("status", "none");
    }
    if (Object.keys(ud).length === 3 && isAuthenticated) {
      localStorage.setItem("status", "loggedin");
    }
    if (Object.keys(ud).length === 3 && !isAuthenticated) {
      localStorage.setItem("status", "loggedout");
    }
  }, [ud, isAuthenticated]);

  if (localStorage.getItem("status") === "none") {
    if (window.innerWidth < 1350) {
      localStorage.setItem("width", window.innerWidth)
    }
  }

  if (localStorage.getItem("status") === "loggedout") {
    localStorage.removeItem("status");
  }

  console.log(window.innerWidth)
  const dispatch = useDispatch();
  const [Stripeapikey, setstripeapikey] = useState("");

  useEffect(() => {
    const getsapikey = async () => {
      const { data } = await axios.get("https://snap-n-shop-fullmernstack-ecommerce.onrender.com/api/v1/stripeapikey", { withCredentials: true });
      setstripeapikey(data.stripeapikey);
    }
    getsapikey();
  }, [dispatch, Stripeapikey]);

  return (
    <>
      <Router>
        <Headers />
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<Navigate to="/Home" />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/product/:id" element={<Prodpage />} />
              <Route path="/products" element={<Allproducts />} />
              <Route path="/products/:keyword" element={<Allproducts />} />
              <Route path="/search" element={<Searchbar />} />
              <Route path="/account" element={<Account />} />
              <Route path="/password/forgot" element={<Forgotpassword />} />
              <Route path="/mycart" element={<Mycart />} />
              <Route path="/auth/password/reset/:id" element={<Getnewpassword />} />
              <Route path="/shipping" element={<Shippingpage />} />
              <Route path="/confirmorder" element={<ConfirmOrder />} />
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route
                path="/payment"
                element={
                  Stripeapikey && (
                    <Elements stripe={loadStripe(Stripeapikey)}>
                      <Payment />
                    </Elements>
                  )
                }
              />
              <Route path="/success" element={<Success />} />
              <Route path="/myorders" element={<Myorders />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/Home" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/product/:id" element={<Prodpage />} />
              <Route path="/products" element={<Allproducts />} />
              <Route path="/products/:keyword" element={<Allproducts />} />
              <Route path="/search" element={<Searchbar />} />
              <Route path="/account" element={<LoginPage />} />
              <Route path="/password/forgot" element={<Forgotpassword />} />
              <Route path="/auth/password/reset/:id" element={<Getnewpassword />} />
              <Route path="/mycart" element={<LoginPage />} />
              <Route path="/shipping" element={<LoginPage />} />
              <Route path="/payment" element={<LoginPage />} />
              <Route path="/confirmorder" element={<LoginPage />} />
              <Route path="/myorders" element={<LoginPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </>
          )}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;