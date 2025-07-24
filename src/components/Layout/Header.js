import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // Actualiza el estado global
    localStorage.removeItem("user"); // Limpia el almacenamiento local
    navigate("/"); // Redirige a la página principal
  };

  return (
    <header className="header">
      <div className="d-flex justify-content-center align-items-center header-content">
        <p className="title-first-letter">V<span className="title-rest-word">EDANTA</span> E<span className="title-rest-word">N</span> E<span className="title-rest-word">SPAÑOL</span></p>

        {/*  <img className='logo' src={logo} alt=""/>
        <p className='px-3 py-0 m-0'>"una frase que represente"</p> */}
        {/* Mostrar "modo edición" solo si el usuario está logueado */}
        {currentUser && (
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger ms-3"
          >
            Salir de modo edición
          </button>
        )}
      </div>
    </header>
  );
};
