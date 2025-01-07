import { Navbar, Nav, Dropdown } from "react-bootstrap";


export const Menu = () => {
    return (
      <div className="menu">
        <div>
          <Navbar bg="light" expand="lg" className="px-2" >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex w-100 justify-content-center">   

            <Nav.Link href="#videos">Videos</Nav.Link>   
            <Nav.Link href="#shorts">Shorts</Nav.Link>   
            <Nav.Link href="#libros">Libros</Nav.Link>   
            <Nav.Link href="#comunidad">Comunidad</Nav.Link>   
            <Nav.Link href="#inspiración">Inspiración</Nav.Link>   
            <Nav.Link href="#fotos">Fotos</Nav.Link>   
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Dropdown
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#action/3.1">Acción   
 1</Dropdown.Item>
                <Dropdown.Item href="#action/3.2">Otra acción</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#action/3.3">Algo más</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Nav>
        </Navbar.Collapse>
    </Navbar>
        </div>
      </div>
    )
  }