import React, { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";

export const Header = () => {
  const { currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async() => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <header className="header">
        <div className="d-flex flex-column-reverse flex-md-row  justify-content-left align-items-center header-content">
          <p className="title-first-letter text-center">
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
