import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

const HeroSection = () => (
  <section className="hero-section py-4">
    <Container>
      <Row className="align-items-center">
        <Col lg={6} className="mb-4 mb-lg-0 d-flex justify-content-start">
          <Image
            src="/school.png"
            alt="School background"
            fluid
            className="school-bg img-fluid rounded shadow"
            style={{ height: '337px', width: '600px', marginLeft: '10px' }}
          />
        </Col>
        <Col lg={6} className="text-center">
          <h1 className="display-4 fw-bold">Find your next gym buddy!</h1>
          <p className="lead mt-3">
            Explore buddies in the Explore page.
          </p>
        </Col>
      </Row>
    </Container>
  </section>
);

export default HeroSection;
