import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FaTachometerAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate per il reindirizzamento
import './NavbarComponent.css';

const NavbarComponent = () => {
  const navigate = useNavigate();

  // Funzione di logout
  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("name");

    navigate("/login");
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar responsive-navbar" variant="light">
      <Container fluid>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto navbar-left">
            <Nav.Link href="/">
              <FaTachometerAlt className="icon" />
              <span>Dashboard</span>
            </Nav.Link>
            <Nav.Link href="/support" className="me-3">
              <FaUser className="icon" />
              <span>Supporto</span>
            </Nav.Link>
          </Nav>

          <Nav>
            <NavDropdown className='nav-item' title={"Ciao " + sessionStorage.getItem("name")} id="collasible-nav-dropdown" align="end">
              <NavDropdown.Item href="#action1">Impostazioni</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;