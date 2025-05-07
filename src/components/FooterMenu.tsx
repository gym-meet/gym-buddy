'use client';

import { Container, Row, Col } from 'react-bootstrap';

const FooterMenu = () => (
  <footer className="bg-white py-3 pt-4">
    <Container>
      <Row>
        <Col>
          NAVIGATION
          <hr />
          <p>
            <a
              target="_blank"
              href="https://manoa.hawaii.edu/studentlife/recreation/recreation-center/rules-and-policies/"
              rel="noopener noreferrer"
            >
              Rules & Policies
            </a>
          </p>
          <p><a target="_blank" href="https://map.hawaii.edu/manoa/" rel="noopener noreferrer">Campus Map</a></p>
        </Col>
        <Col>
          GYM HOURS
          <hr />
          <p>Mon-Thur | 6AM - 10:30PM</p>
          <p>Fri | 6AM - 9PM</p>
          <p>Sat-Sun | 11AM - 6PM</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default FooterMenu;
