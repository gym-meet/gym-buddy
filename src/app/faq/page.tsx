'use client';

import { Container, Row, Col, Accordion } from 'react-bootstrap';
import TopMenu from '../../components/TopMenu';
import FooterMenu from '../../components/FooterMenu';
import '../style.css';

const faqPage = () => (
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
      <Container className="px-3 px-md-5">
        <Row>
          <Col lg={12}>
            <div className="accordion-wrapper">
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>How do I find a workout partner?</Accordion.Header>
                  <Accordion.Body>
                    You can go to the explore page and view other users who match your workout schedule and
                    preferred exercises.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                  <Accordion.Header>How can I find gym partners with similar schedules?</Accordion.Header>
                  <Accordion.Body>
                    Go to the &quot;Explore&quot; page. You&apos;ll see profiles of other students whose
                    workout days and preferences match yours. You can filter results to narrow your search.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                  <Accordion.Header>How do I update my workout preferences?</Accordion.Header>
                  <Accordion.Body>
                    After signing in, navigate to your Profile page. From there, you can select your
                    preferred workout days, types, and add social media links or a short bio.
                  </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="3">
                  <Accordion.Header>Is my information private?</Accordion.Header>
                  <Accordion.Body>
                    Only users who are signed in can view profile details. Your contact
                    information is never shared publicly unless you include it in your profile voluntarily.
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

export default faqPage;
