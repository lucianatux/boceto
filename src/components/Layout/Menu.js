import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"; // ✅ importamos useLocation
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";

import tiktokIcon from "../../assets/iconos/tiktok5.png";
import instagramIcon from "../../assets/iconos/nav-icon3.svg";
import youtubeIcon from "../../assets/iconos/nav-icon5.svg";

export const Menu = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation(); // ✅ obtenemos la ruta actual

  return (
    <div className="menu">
      <Navbar bg="light" expand="lg" className="px-2">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {/* Menú principal centrado */}
          <Nav className="d-flex w-100 justify-content-center">
            <Nav.Link
              as={Link}
              to={currentUser ? "/inicio-edit" : "/"}
              active={location.pathname === "/" || location.pathname === "/inicio-edit"}
            >
              Inicio
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/videos"
              active={location.pathname === "/videos"}
            >
              Videos
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/libros"
              active={location.pathname === "/libros"}
            >
              Libros
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/comunidad"
              active={location.pathname === "/comunidad"}
            >
              Preguntas
            </Nav.Link>
          </Nav>

          {/* Íconos de redes a la derecha */}
          <div className="social-icon d-flex justify-content-center align-items-center ms-auto">
            <a
              href="https://www.youtube.com/@caminosdelvedanta"
              target="_blank"
              rel="noreferrer"
            >
              <img src={youtubeIcon} alt="youtube-icon" />
            </a>
            <a
              href="https://www.instagram.com/vedantaenespanol/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagramIcon} alt="instagram-icon" />
            </a>
            <a
              href="https://www.tiktok.com/@caminosvedanta?lang=es-419"
              target="_blank"
              rel="noreferrer"
            >
              <img src={tiktokIcon} alt="tiktok-icon" />
            </a>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
