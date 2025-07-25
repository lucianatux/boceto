import React, { useContext } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/Layout/Header";
import { Menu } from "./components/Layout/Menu";
import { Home } from "./components/Layout/Home";
import { Login } from "./components/Auth/Login";
import { Footer } from "./components/Layout/Footer";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./components/Auth/AuthContext";
import { CategoryPage } from "./components/Cards/CategoryPage";

function App() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  // Ruta protegida, si no hay user, redirige a login
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const isLoginRoute = location.pathname === "/login";

  return (
    <div className="App">
      {!isLoginRoute && <Menu />}
      {!isLoginRoute && <Header />}

      <Routes>
        {/* Página pública */}
        <Route path="/" element={<Home />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas categoría públicas */}
        <Route path="/videos" element={<CategoryPage category="videos" />} />
        <Route path="/shorts" element={<CategoryPage category="shorts" />} />
        <Route path="/libros" element={<CategoryPage category="libros" />} />
        <Route path="/comunidad" element={<CategoryPage category="comunidad" />} />
        <Route path="/inspiracion" element={<CategoryPage category="inspiracion" />} />
        <Route path="/fotos" element={<CategoryPage category="fotos" />} />

        {/* Nueva ruta protegida para edición en inicio-edit */}
        <Route
          path="/inicio-edit"
          element={
            <RequireAuth>
              <CategoryPage category="inicio" />
            </RequireAuth>
          }
        />
      </Routes>

      {!isLoginRoute && <Footer />}

    </div>
  );
}

export default App;
