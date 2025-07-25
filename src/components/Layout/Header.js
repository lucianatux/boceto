import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="header">
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center header-content">
          <p className="title-first-letter text-center mb-2 mb-md-0">
            V<span className="title-rest-word">EDANTA</span> E
            <span className="title-rest-word">N</span> E
            <span className="title-rest-word">SPAÑOL</span>
          </p>

          {/* Solo mostrar si está logueado */}
          {currentUser && (
            <button
              onClick={handleLogout}
              className="btn btn-secondary btn-sm ms-md-3"
            >
              Salir de modo edición
            </button>
          )}
        </div>

    </header>
  );
};
