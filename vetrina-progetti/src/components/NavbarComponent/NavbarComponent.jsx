import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaTachometerAlt } from 'react-icons/fa';
import './NavbarComponent.css';

const NavbarComponent = () => {
  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar" variant="light">
      <Container fluid>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Sezione sinistra con i link */}
          <Nav className="me-auto navbar-left">
            <Nav.Link href="#dashboard">
              <FaTachometerAlt className="icon" />
              <span>Dashboard</span>
            </Nav.Link>
            <Nav.Link href="#profilo" className="me-3">
              <FaTachometerAlt className="icon" />
              <span>Profilo</span>
            </Nav.Link>
          </Nav>

          {/* Sezione destra con il menu a tendina */}
          <Nav>
            <NavDropdown className='nav-item' title={"Ciao " + localStorage.getItem("userName")} id="collasible-nav-dropdown" align="end">
              <NavDropdown.Item href="#action1">Impostazioni</NavDropdown.Item>
              <NavDropdown.Item href="#action2">Supporto</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action3">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;