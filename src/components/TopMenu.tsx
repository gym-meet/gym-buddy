'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Image, Offcanvas, Button } from 'react-bootstrap';

const TopMenu = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <>
      {/* Top Navbar */}
      <Navbar className="navbar" expand="lg">
        <Container fluid className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4 ms-5 mt-4">
            <Button variant="outline-light" onClick={handleShow} className="border-0 burger">
              ☰
            </Button>
            {/* Left side: Logo */}
            <Navbar.Brand as={Link} href="/">
              <Image src="/image.png" alt="Logo" fluid className="logo" />
            </Navbar.Brand>
          </div>

          {/* Right side: Nav Links + Toggle */}
          <div className="d-flex align-items-center gap-4 me-5 mt-4">
            <Nav className="d-flex align-items-center gap-4">
              <Nav.Link as={Link} href="/explore">Explore</Nav.Link>
              <Nav.Link as={Link} href="/signin">Sign In</Nav.Link>
            </Nav>
          </div>
        </Container>
      </Navbar>

      {/* Offcanvas from the left */}
      <Offcanvas show={showOffcanvas} onHide={handleClose} placement="start" className="side-bar">
        <Offcanvas.Header closeButton className="side-bar-close">
          <Offcanvas.Title className="burger-title">More Links</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link className="nav-link2" as={Link} href="/home" onClick={handleClose}>Home</Nav.Link>
            <Nav.Link className="nav-link2" as={Link} href="/profile" onClick={handleClose}>Profile</Nav.Link>
            <Nav.Link className="nav-link2" as={Link} href="/about" onClick={handleClose}>About Us</Nav.Link>
            <Nav.Link className="nav-link2" as={Link} href="/contact" onClick={handleClose}>Contact</Nav.Link>
            <Nav.Link className="nav-link2" as={Link} href="/faq" onClick={handleClose}>FAQ</Nav.Link>
            <Nav.Link className="nav-link2" as={Link} href="/logout" onClick={handleClose}>Logout</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default TopMenu;
