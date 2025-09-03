import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import store, { persistor } from './store';
import toast, { Toaster } from 'react-hot-toast';
import { BrowserRouter } from "react-router-dom";  // ✅ Import Router
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>   {/* ✅ Router must wrap AuthProvider */}
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <App />
            <Toaster />
          </AuthProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
