import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './components/Auth/AuthContext';
import { SearchProvider } from "./components/SearchContext.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router basename="/boceto">
      <AuthContextProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();

