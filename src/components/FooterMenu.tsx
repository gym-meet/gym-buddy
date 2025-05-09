'use client';

import { Container, Row, Col } from 'react-bootstrap';
import { Instagram } from 'react-bootstrap-icons';

const FooterMenu = () => (
  <footer className="bg-white py-3 pt-4">
    <Container>
      <Row>
        <Col>
          <div className="footer">
            <p>
              NAVIGATION
            </p>
          </div>
          <hr />
          <p>
            <a
              target="_blank"
              href="https://manoa.hawaii.edu/studentlife/recreation/recreation-center/rules-and-policies/"
              rel="noopener noreferrer"
              className="footer"
            >
              Rules & Policies
            </a>
          </p>
          <p>
            <a
              target="_blank"
              href="https://map.hawaii.edu/manoa/"
              rel="noopener noreferrer"
              className="footer"
            >
              Campus Map
            </a>
          </p>
          <a
            href="https://www.instagram.com/warriorreccenter/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="footer"
          >
            <Instagram className="ig" />
          </a>
        </Col>
        <Col>
          <div className="footer">
            <p>
              GYM HOURS
            </p>
          </div>
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
