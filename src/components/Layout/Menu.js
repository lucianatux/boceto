import { Navbar, Nav, Dropdown } from "react-bootstrap";
import logo from '../../assets/logo.png'


export const Menu = () => {
    return (
      <div className="menu">
        <div>
          <Navbar bg="light" expand="lg" className="px-2" >
        <Navbar.Brand href="#home">(otra opción)Título <img className='logo' src={logo} alt=""/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex w-100 justify-content-center">   

            <Nav.Link href="#home">Inicio</Nav.Link>
            <Nav.Link href="#acercade">Acerca de</Nav.Link>   
            <Nav.Link href="#videos">Videos</Nav.Link>   
            <Nav.Link href="#contacto">Contacto</Nav.Link>   

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
            <Nav.Link href="#etc1">Etcétera</Nav.Link>   

          </Nav>
        </Navbar.Collapse>
    </Navbar>
        </div>
      </div>
    )
  }