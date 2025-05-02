'use client';

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../app/style.css';

const AboutSection = () => (
  <section className="about-section py-5">
    <Container>
      <Row>
        <Col lg={12}>
          <h1 className="mb-4 about-heading">About</h1>

          <div className="about-content">
            <p className="mb-3">
              Welcome to Gym-Meet! Our goal is to connect University of Hawaii students from all different
              majors with a common hobby: keeping fit. We realized that there are a lot of UHM students that
              want to take advantage of the campus center facilities, including the gym, but are too intimidated
              to go by themselves. Others are discouraged by their lack of experience, while others want to go
              with friends, but their schedules do not match up. This is where our site comes in!
            </p>

            <p className="mb-3">
              Here, you can create your own profile and customize it with your workout preferences. Link your
              social media accounts and give everyone a short description about yourself for people to find,
              then find people whose schedules align with yours and hit the gym! We hope to make the process of
              finding gym buddies as simple and painless as possible, so you can meet new people and crush your
              personal records with ease!
            </p>

            <p className="mt-4">
              If this is your first time visiting our site and want to sign up, click the Sign In button! For
              more information, visit our FAQ page (you can also find the weekly gym hours and links to the
              official campus center websites below).
            </p>

          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default AboutSection;
