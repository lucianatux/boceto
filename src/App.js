import React, { useContext } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/Layout/Header";
import { Menu } from "./components/Layout/Menu";
import { Home } from "./components/Layout/Home";
import { Login } from "./components/Auth/Login";
import { CardList } from "./components/Cards/CardList";
import { ArticleForm } from "./components/Articles/ArticleForm";
import { Footer } from "./components/Layout/Footer";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./components/Auth/AuthContext";
import { VideoList } from "./components/Content/Videos/VideoList";

function App() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  const isLoginRoute = location.pathname === "/login";

  return (
    <div className="App">
      {!isLoginRoute && <Menu />}
      {!isLoginRoute && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/articleform"
          element={
            <RequireAuth>
              <ArticleForm />
            </RequireAuth>
          }
        />
        <Route path="/videos" element={<VideoList />} />
      </Routes>
      {!isLoginRoute && <CardList />}

      <Footer />
    </div>
  );
}

export default App;
