import Headers from "./components/Headers";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Prodpage from "./components/Prodpage";
import Allproducts from "./components/Allproducts";
import LoginPage from "./components/Login";
import Account from "./components/Account";
import Getnewpassword from "./components/Getnewpassword";
import Forgotpassword from "./components/Forgotpassword";
import Mycart from "./components/Mycart";
import Shippingpage from "./components/Shippingpage";
import Payment from "./components/Payment";
import ConfirmOrder from "./components/ConfirmOrder";
import Success from "./components/Success";
import Myorders from "./components/Myorders";
import Dashboard from "./components/Dashboard";
import AuthCallbackPage from "./components/AuthCallbackPage"; // Import the new callback page
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-teal-100">
        <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-6"></div>
      </div>
    );
  }

  return (
    <>
      <Headers />
      <Routes>
        {/* Public Routes */}
        <Route path="/product/:id" element={<Prodpage />} />
        <Route path="/products" element={<Allproducts />} />
        <Route path="/products/:keyword" element={<Allproducts />} />
        <Route path="/password/forgot" element={<Forgotpassword />} />
        {/* <Route path="/auth/password/reset/:id" element={<Getnewpassword />} /> */}

        {/* New Route for Google OAuth callback */}
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {isAuthenticated ? (
          <>
            <Route path="/" element={<Navigate to="/Home" />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/mycart" element={<Mycart />} />
            <Route path="/shipping" element={<Shippingpage />} />
            <Route path="/confirmorder" element={<ConfirmOrder />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/success" element={<Success />} />
            <Route path="/myorders" element={<Myorders />} />
            <Route path="/payment" element={<Payment />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<LoginPage />} />
            <Route path="/mycart" element={<LoginPage />} />
            <Route path="/shipping" element={<LoginPage />} />
            <Route path="/payment" element={<LoginPage />} />
            <Route path="/confirmorder" element={<LoginPage />} />
            <Route path="/myorders" element={<LoginPage />} />
            <Route path="/dashboard" element={<LoginPage />} />
          </>
        )}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
