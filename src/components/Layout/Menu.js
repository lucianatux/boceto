import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import linkedinIcon from "../../assets/iconos/nav-icon1.svg";
import instagramIcon from "../../assets/iconos/nav-icon3.svg";
import youtubeIcon from "../../assets/iconos/nav-icon5.svg";

export const Menu = () => {
  return (
    <div className="menu">
      <Navbar bg="light" expand="lg" className="px-2">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {/* Menú principal centrado */}
          <Nav className="d-flex w-100 justify-content-center">
             <Nav.Link as={Link} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/videos">
              Videos
            </Nav.Link>
            <Nav.Link as={Link} to="/shorts">
              Shorts
            </Nav.Link>
            <Nav.Link as={Link} to="/libros">
              Libros
            </Nav.Link>
            <Nav.Link as={Link} to="/comunidad">
              Comunidad
            </Nav.Link>
            <Nav.Link as={Link} to="/inspiracion">
              Inspiración
            </Nav.Link>
            <Nav.Link as={Link} to="/fotos">
              Fotos
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
              href="https://www.linkedin.com/in/guillermo-caminos-24230b43/"
              target="_blank"
              rel="noreferrer"
            >
              <img src={linkedinIcon} alt="linkedin-icon" />
            </a>
          </div>

        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
