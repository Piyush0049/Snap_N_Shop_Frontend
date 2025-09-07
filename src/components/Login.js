import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userlogin, usersignup, googleLogin } from '../actions/useractions';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { checkAuth } = useAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [loginMode, setLoginMode] = useState('login');

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupCPassword, setShowSignupCPassword] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    const savedWidth = localStorage.getItem('width');
    if (savedWidth) setWindowWidth(parseInt(savedWidth));

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Regular login / signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (loginMode === 'login') {
        const res = await dispatch(userlogin(email, password));
        if (res?.success) {
          toast.success('Login successful!');
          checkAuth();
          navigate('/home');
        } else {
          toast.error(res?.message || 'Login failed!');
        }
      } else if (loginMode === 'signup') {
        if (password === cpassword) {
          const myForm = { username, email, password };
          const res = await dispatch(usersignup(myForm));
          if (res?.success) {
            toast.success('Signup successful!');
            checkAuth();
            navigate('/home');
          } else {
            toast.error(res?.message || 'Signup failed!');
          }
        } else {
          toast.error('Passwords do not match!');
          setPassword('');
          setCpassword('');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong!');
    }
  };

  // ================= GOOGLE POPUP LOGIN =================
  const handleGoogleCallback = async (response) => {
    const code = response.code;
    if (!code) {
      toast.error('Google login failed: No code received');
      return;
    }
    try {
      const res = await dispatch(googleLogin(code)); // send code to backend
      if (res?.success) {
        toast.success('Logged in with Google!');
        checkAuth();
        navigate('/home');
      } else {
        toast.error(res?.message || 'Google login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during Google login');
    }
  };

  const handleGoogleRedirect = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const scope = 'openid email profile';

    const codeClient = window.google.accounts.oauth2.initCodeClient({
      client_id: clientId,
      scope: scope,
      ux_mode: 'popup', // popup login, no redirect
      callback: handleGoogleCallback,
      redirect_uri: "postmessage",
    });

    codeClient.requestCode();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-3 sm:px-4">
      <div className="bg-white shadow-sm rounded-md sm:rounded-xl p-4 sm:p-8 w-full max-w-md">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-3">
          <span className="text-indigo-600">Snap & Shop!</span>
        </h2>
        <p className="text-center text-gray-600 mb-6">
          {loginMode === 'login'
            ? 'Access all features by logging in to your account'
            : 'Join now for seamless shopping!'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMode === 'signup' && (
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
              type={
                loginMode === 'login'
                  ? showLoginPassword
                    ? 'text'
                    : 'password'
                  : showSignupPassword
                    ? 'text'
                    : 'password'
              }
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <button
              type="button"
              onClick={() =>
                loginMode === 'login'
                  ? setShowLoginPassword(!showLoginPassword)
                  : setShowSignupPassword(!showSignupPassword)
              }
              className="absolute right-3 top-3 text-gray-500"
            >
              {loginMode === 'login'
                ? showLoginPassword
                  ? <AiOutlineEyeInvisible size={22} />
                  : <AiOutlineEye size={22} />
                : showSignupPassword
                  ? <AiOutlineEyeInvisible size={22} />
                  : <AiOutlineEye size={22} />}
            </button>
          </div>

          {loginMode === 'signup' && (
            <div className="relative">
              <input
                type={showSignupCPassword ? 'text' : 'password'}
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
            {loginMode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleGoogleRedirect}
            className="w-full flex items-center justify-center bg-white hover:bg-gray-100 text-gray-700 font-semibold py-3 rounded-lg shadow-sm border border-gray-300 transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <svg className="w-6 h-6 mr-3" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.94 0 7.18 1.37 9.39 3.6l6.9-6.9C36.46 2.64 30.79 0 24 0 14.7 0 6.64 5.28 2.69 13l8.05 6.27C12.48 13.3 17.7 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.1 24.5c0-1.57-.14-3.08-.39-4.5H24v9h12.6c-.54 2.9-2.2 5.36-4.7 7.02l7.14 5.56c4.15-3.83 7.06-9.48 7.06-17.08z"
              />
              <path
                fill="#FBBC05"
                d="M11.17 28.77A14.52 14.52 0 0 1 10 24c0-1.66.29-3.26.82-4.77l-8.13-6.34A23.96 23.96 0 0 0 0 24c0 3.82.91 7.42 2.51 10.61l8.66-5.84z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.92-2.14 15.89-5.81l-7.14-5.56c-2.02 1.36-4.63 2.17-8.75 2.17-6.3 0-11.52-3.8-13.45-9.23l-8.66 5.84C7.36 42.72 15.52 48 24 48z"
              />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          {loginMode === 'login' ? (
            <>
              Do not have an account?{' '}
              <button
                onClick={() => setLoginMode('signup')}
                className="text-indigo-600 hover:underline"
              >
                Sign up now!
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setLoginMode('login')}
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
