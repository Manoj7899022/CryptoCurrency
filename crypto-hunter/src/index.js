import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CryptoContext from './CryptoContext';
import Login from './LoginPage/Login';
const root = ReactDOM.createRoot(document.getElementById('root'));

const data = localStorage.getItem("token");

root.render(
  <>
  <React.StrictMode>
    <CryptoContext>
      {data ?(
        <App />
      ):(
        <Login />
      )
      }
    </CryptoContext>
  </React.StrictMode>
  </>
)

reportWebVitals();
