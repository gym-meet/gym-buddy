'use client';

import { Container, Row, Col, Accordion } from 'react-bootstrap';
import TopMenu from '../../components/TopMenu';
import FooterMenu from '../../components/FooterMenu';
import '../style.css';

const Home = () => (
  <main>
    <TopMenu />
    <section className="faq-hero py-4">
      <Container>
        <Row className="align-items-center text-center pt-5">
          <h1 className="display-4 fw-bold">Frequently Asked Questions</h1>
          <p className="lead mt-3">
            If you&apos;re new to our site, this guide will help you learn more about our platform
          </p>
        </Row>
      </Container>
    </section>

    <section className="faq-questions py-5 text-center">
      <Container className="w-50">
        <Row>
          <Col lg={12}>
            <div className="accordion-wrapper">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Question 1</Accordion.Header>
                <Accordion.Body>
                  Answer 1
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>Question 2</Accordion.Header>
                <Accordion.Body>
                  Answer 2
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>Question 3</Accordion.Header>
                <Accordion.Body>
                  Answer 3
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="3">
                <Accordion.Header>Question 4</Accordion.Header>
                <Accordion.Body>
                  Answer 4
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <FooterMenu />
  </main>
);

export default Home;