'use client';

import Link from 'next/link';
import { Container, Nav, Image, Button, Row, Col } from 'react-bootstrap';

const Background = () => (
  <>
    {/* signup block */}
    <Container fluid className="top-bg p-0">
      <div className="d-flex align-items-center gap-4 me-1 p-0">
        <div>
          <Image src="/school.png" fluid className="school-bg" />
        </div>
        {/* sign up text */}
        <Row className="fullwidth-row align-items-center me-3">
          <Col className="textright">
            <p className="text1">A new way to enjoy the gym.</p>
            <p className="text1">Meet with fellow students.</p>
            <p className="text2">Register now for free to get started.</p>
            <Button variant="outline-light" className="border-0 signup-button">
              <Nav.Link className="" as={Link} href="/auth/signup">
                Sign Up
              </Nav.Link>
            </Button>
          </Col>
        </Row>
      </div>
    </Container>

    {/* calendar block */}
    <Container fluid className="py-5 section1">
      <div className="d-flex align-items-center gap-4 me-4">
        <Row className="fullwidth-row align-items-center me-3">
          <Col>
            <p className="schedule-text">Set your schedule and see how other people match it.</p>
          </Col>
        </Row>
        <div>
          <Nav.Link className="" as={Link} href="/calendar">
            <Image src="/calendar.png" fluid className="calendar-img" />
          </Nav.Link>

        </div>
      </div>
    </Container>

    {/* profile block */}
    <Container fluid className="py-5 section2">
      <div className="d-flex align-items-center gap-4 me-4">
        <Row className="fullwidth-row align-items-center me-3">
          <Col>
            <p className="schedule-text">Customize your profile, workout preferences, and explore</p>
          </Col>
        </Row>
      </div>
    </Container>
  </>
);

export default Background;
