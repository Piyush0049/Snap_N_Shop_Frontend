import React from 'react';
import { createRoot } from 'react-dom/client'; // ✅ updated import
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import store, { persistor } from './store';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';

// Create root
const container = document.getElementById('root');
const root = createRoot(container); // ✅ createRoot replaces ReactDOM.render

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <App />
            <Toaster />
          </AuthProvider>
        </GoogleOAuthProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();
