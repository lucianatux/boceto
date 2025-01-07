import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Menu = () => {
  return (
    <div className="menu">
      <div>
        <Navbar bg="light" expand="lg" className="px-2">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="d-flex w-100 justify-content-center">
              {" "}
               
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
               {/*  <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  Dropdown
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/action1">
                    Acción 1
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/action2">
                    Otra acción
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/action3">
                    Algo más
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
             
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
};
