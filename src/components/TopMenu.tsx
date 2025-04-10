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
        <Container className="d-flex justify-content-between align-items-center">
          {/* Left side: Logo */}
          <Navbar.Brand as={Link} href="/">
            <Image src="/image.png" alt="Logo" fluid className="logo" />
          </Navbar.Brand>

          {/* Right side: Nav Links + Toggle */}
          <div className="d-flex align-items-center gap-3">
            <Nav className="d-flex align-items-center gap-3">
              <Nav.Link as={Link} href="/">Home</Nav.Link>
              <Nav.Link as={Link} href="/explore">Explore</Nav.Link>
              <Nav.Link as={Link} href="/signin">Sign In</Nav.Link>
            </Nav>
            <Button variant="outline-light" onClick={handleShow}>
              ☰
            </Button>
          </div>
        </Container>
      </Navbar>

      {/* Offcanvas from the left */}
      <Offcanvas show={showOffcanvas} onHide={handleClose} placement="start" backdrop={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>More Links</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} href="/about" onClick={handleClose}>About Us</Nav.Link>
            <Nav.Link as={Link} href="/contact" onClick={handleClose}>Contact</Nav.Link>
            <Nav.Link as={Link} href="/faq" onClick={handleClose}>FAQ</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default TopMenu;
