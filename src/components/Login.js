import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userlogin, usersignup } from '../actions/useractions';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { googleLogin } from '../actions/useractions';
// import {jwt_decode} from 'jwt-decode';

const LoginPage = () => {
  const { checkAuth } = useAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [loginMode, setLoginMode] = useState("login");

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupCPassword, setShowSignupCPassword] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    const savedWidth = localStorage.getItem("width");
    if (savedWidth) {
      setWindowWidth(parseInt(savedWidth));
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (loginMode === "login") {
        const res = await dispatch(userlogin(email, password));
        if (res?.success) {
          toast.success("Login successful!");
          navigate("/home");
        } else {
          toast.error(res?.message || "Login failed!");
        }
      } else if (loginMode === "signup") {
        if (password === cpassword) {
          const myForm = { username, email, password };
          const res = await dispatch(usersignup(myForm));
          if (res?.success) {
            toast.success("Signup successful!");
            navigate("/home");
          } else {
            toast.error(res?.message || "Signup failed!");
          }
        } else {
          toast.error("Passwords do not match!");
          setPassword("");
          setCpassword("");
        }
      }
      checkAuth(); 
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
  try {
    // send the raw credential (token) instead of decoded object
    const res = await dispatch(googleLogin(credentialResponse.credential));

    if (res?.success) {
      toast.success("Logged in with Google!");
      navigate("/home");
    } else {
      toast.error(res?.message || "Google login failed!");
    }

    checkAuth();
  } catch (err) {
    console.error("Google login error:", err);
    toast.error("Google login failed!");
  }
};



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-3 sm:px-4">
      <div className="bg-white shadow-sm rounded-md sm:rounded-xl p-4 sm:p-8 w-full max-w-md">
        {loginMode === "login" ? (
          <>
            <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-3">
              <span className="text-indigo-600">Snap & Shop!</span>
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Access all features by <b>logging in</b> to your account
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-3">
              <span className="text-indigo-600">Snap & Shop!</span>
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Join now for seamless shopping!
            </p>
          </>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMode === "signup" && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />

          <div className="relative">
            <input
              type={loginMode === "login" ? (showLoginPassword ? "text" : "password") : (showSignupPassword ? "text" : "password")}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <button
              type="button"
              onClick={() =>
                loginMode === "login"
                  ? setShowLoginPassword(!showLoginPassword)
                  : setShowSignupPassword(!showSignupPassword)
              }
              className="absolute right-3 top-3 text-gray-500"
            >
              {loginMode === "login"
                ? showLoginPassword
                  ? <AiOutlineEyeInvisible size={22} />
                  : <AiOutlineEye size={22} />
                : showSignupPassword
                  ? <AiOutlineEyeInvisible size={22} />
                  : <AiOutlineEye size={22} />}
            </button>
          </div>

          {loginMode === "signup" && (
            <div className="relative">
              <input
                type={showSignupCPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowSignupCPassword(!showSignupCPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showSignupCPassword
                  ? <AiOutlineEyeInvisible size={22} />
                  : <AiOutlineEye size={22} />}
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-md"
          >
            {loginMode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* 🔹 Google Login Button */}
        <div className="mt-4 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => toast.error("Google login failed!")}
          />
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          {loginMode === "login" ? (
            <>
              Do not have an account?{" "}
              <button
                onClick={() => setLoginMode("signup")}
                className="text-indigo-600 hover:underline"
              >
                Sign up now!
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setLoginMode("login")}
                className="text-indigo-600 hover:underline"
              >
                Log in now!
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
