'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navbar, Container, Nav, Image, Offcanvas, Button } from 'react-bootstrap';
import { HouseDoorFill, PersonFill } from 'react-bootstrap-icons';
import { useSession, signOut } from 'next-auth/react';

const TopMenu = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { data: session } = useSession();

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);
  const handleLogout = () => {
    handleClose();
    signOut({ callbackUrl: '/' });
  };

  return (
    <>
      {/* Top Navbar */}
      <Navbar className="navbar pb-3" expand="lg">
        <Container fluid className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4 ms-5 mt-3">
            <Button variant="outline-light" onClick={handleShow} className="border-0 burger">
              ☰
            </Button>
            {/* Left side: Logo */}
            <Navbar.Brand as={Link} href="/home">
              <Image
                src="/image.png"
                alt="Logo"
                width="120"
                height="60"
                style={{ objectFit: 'contain' }}
                className="logo"
              />
            </Navbar.Brand>
          </div>

          {/* Right side: Nav Links + Toggle */}
          <div className="d-flex align-items-center gap-4 me-5 mt-3">
            <Nav className="d-flex align-items-center gap-4">
              <Nav.Link as={Link} href="/explore">Explore</Nav.Link>
              {session ? (
                <Nav.Link as={Link} href="/profile">
                  <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }} />
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} href="/auth/signin">Sign In</Nav.Link>
              )}
            </Nav>
          </div>
        </Container>
      </Navbar>

      {/* Offcanvas from the left */}
      <Offcanvas show={showOffcanvas} onHide={handleClose} placement="start" className="side-bar">
        <Offcanvas.Header closeButton className="side-bar-close">
          <Offcanvas.Title className="burger-title">Pages</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link className="nav-link2" as={Link} href="/home" onClick={handleClose}>
              <HouseDoorFill className="nav-icons" />
              Home
            </Nav.Link>

            {session && (
              <>
                <Nav.Link className="nav-link2" as={Link} href="/profile" onClick={handleClose}>
                  <PersonFill className="nav-icons" />
                  Profile
                </Nav.Link>
                <Nav.Link className="nav-link2" as={Link} href="/schedule" onClick={handleClose}>
                  Schedule
                </Nav.Link>
              </>
            )}

            <Nav.Link className="nav-link2" as={Link} href="/faq" onClick={handleClose}>
              FAQ
            </Nav.Link>

            {session && (
              <Nav.Link className="nav-link2" as="button" onClick={handleLogout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default TopMenu;
