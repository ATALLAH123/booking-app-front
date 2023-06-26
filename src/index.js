import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SearchContextProvider } from './context/searchContext';
import { AuthContextProvider } from './context/authContext';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <AuthContextProvider>
    <SearchContextProvider>
        <App />
        <ToastContainer />
    </SearchContextProvider>
   </AuthContextProvider>
  </React.StrictMode>
);
