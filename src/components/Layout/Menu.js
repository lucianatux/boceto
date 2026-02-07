import { Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { SearchContext } from "../SearchContext";

import tiktokIcon from "../../assets/iconos/tiktok5.png";
import instagramIcon from "../../assets/iconos/nav-icon3.svg";
import youtubeIcon from "../../assets/iconos/nav-icon5.svg";

export const Menu = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Aquí más adelante podrás:
    // - Guardar en contexto
    // - O usar navigate con query params
  };

  return (
    <div className="menu">
      {/*<Navbar bg="light" expand="sm" className="px-2">*/}
      <Navbar bg="light" className="px-2">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="d-flex flex-column flex-md-row  justify-content-md-around">
          {/* Menú principal centrado */}
          <Nav className="elem1 d-flex align-items-center">
            <Nav.Link
              as={Link}
              to={currentUser ? "/inicio-edit" : "/"}
              active={
                location.pathname === "/" ||
                location.pathname === "/inicio-edit"
              }
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
            <Nav.Link
              as={Link}
              to="/parapensar"
              active={location.pathname === "/parapensar"}
            >
              Para Pensar
            </Nav.Link>
          </Nav>

          {/* Input de búsqueda + íconos */}
          <div className="elem2 d-flex align-items-center">
            <input
              type="text"
              placeholder="Buscar..."
              className="form-control me-2 search-input"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ maxWidth: "180px", fontSize: "0.9rem" }}
            />
            <div className="social-icon d-flex justify-content-center align-items-center">
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
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
