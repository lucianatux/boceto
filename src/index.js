import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter as Router } from 'react-router-dom';
//import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './components/Auth/AuthContext';
import { SearchProvider } from "./components/SearchContext.js";

// Punto de entrada de la aplicación React que inicializa el render, configura el enrutamiento y provee contextos globales.
// Crea la raíz de renderizado de React y la asocia al elemento HTML principal.
const root = ReactDOM.createRoot(document.getElementById('root'));
// Renderiza la aplicación envolviéndola con StrictMode, Router y los contextos globales.
root.render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
// Inicia la medición de métricas de rendimiento de la aplicación.
reportWebVitals();