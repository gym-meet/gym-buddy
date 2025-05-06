/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-alert */

'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Form,
  Image,
  Row,
  Col,
  Button,
  InputGroup,
} from 'react-bootstrap';
import { Envelope, Telephone, Instagram, Twitter, Linkedin } from 'react-bootstrap-icons';

export default function ProfileForm(): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    instagram: '',
    twitter: '',
    linkedin: '',
  });

  const [preferredDays, setPreferredDays] = useState<string[]>([]);
  const [preferredWorkouts, setPreferredWorkouts] = useState<string[]>([]);
  const [gender, setGender] = useState('');
  const [experience, setExperience] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch('/api/user/profile');
        if (!res.ok) throw new Error('Failed to load profile');
        const data = await res.json();
        setContactInfo(data.contactInfo);
        setPreferredDays(data.preferredDays);
        setPreferredWorkouts(data.preferredWorkouts);
        setGender(data.gender);
        setExperience(data.experience);
        setUsername(data.username);
      } catch (err) {
        console.error(err);
        setError('Could not load your profile. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newUsername,
          newPassword,
          contactInfo,
          preferredDays,
          preferredWorkouts,
          gender,
          experience,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to save profile');
      }

      const data = await res.json();
      setSuccess('Profile saved successfully!');

      if (newUsername) {
        setUsername(newUsername);
        setNewUsername('');
      }

      setNewPassword('');
    } catch (error: any) {
      console.error('Error saving profile:', error);
      setError(error.message || 'Sorry, we couldn\'t save your profile. Please try again.');
    }
  };

  const handleDayToggle = (day: string): void => {
    setPreferredDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  const handleWorkoutToggle = (type: string): void => {
    setPreferredWorkouts((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]));
  };

  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
  };

  const handleExperienceChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setExperience(e.target.value);
  };

  if (loading) {
    return <div>Loading…</div>;
  }

  return (
    <>
      <h1 className="mb-4 text-center">My Profile</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      {/* Account Info */}
      <section className="mb-5">
        <h4 className="mb-3">Account Information</h4>
        <Row>
          <Col md={8}>
            <Form>
              <Form.Group controlId="currentUsername" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="newUsername" className="mb-3">
                <Form.Label>Change Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter new username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="newPassword" className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Col>
          <Col md={4} className="text-center">
            <Image src="/image.png" alt="Profile" fluid className="logo w-50" />
          </Col>
        </Row>
      </section>

      <hr />

      {/* Contact Info */}
      <section className="mb-5">
        <h4 className="mb-3">Contact & Social Media</h4>
        <Form>
          {[
            { id: 'email', icon: <Envelope />, placeholder: 'Email Address' },
            { id: 'phone', icon: <Telephone />, placeholder: 'Phone Number' },
            { id: 'instagram', icon: <Instagram />, placeholder: 'Instagram Username' },
            { id: 'twitter', icon: <Twitter />, placeholder: 'Twitter Handle' },
            { id: 'linkedin', icon: <Linkedin />, placeholder: 'LinkedIn Profile URL' },
          ].map(({ id, icon, placeholder }) => (
            <Form.Group controlId={id} className="mb-3" key={id}>
              <InputGroup>
                <InputGroup.Text>{icon}</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder={placeholder}
                  value={(contactInfo as any)[id]}
                  onChange={handleChange}
                />
              </InputGroup>
            </Form.Group>
          ))}
        </Form>
      </section>

      <hr />

      {/* Workout Days */}
      <section className="mb-5">
        <h4 className="mb-3">Preferred Workout Days</h4>
        <Row className="text-center">
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <Col key={day} xs={4} md={3} className="mb-2">
              <Form.Check
                type="checkbox"
                id={`day-${day}`}
                label={day}
                checked={preferredDays.includes(day)}
                onChange={() => handleDayToggle(day)}
              />
            </Col>
          ))}
        </Row>
      </section>

      <hr />

      {/* Workout Types */}
      <section className="mb-5">
        <h4 className="mb-3">Preferred Workout Types</h4>
        <Row className="text-center">
          {['Running', 'Free Weights', 'Calisthenics', 'Mixed', 'Machines'].map((type) => (
            <Col key={type} xs={6} md={4} className="mb-2">
              <Form.Check
                type="checkbox"
                id={`workout-${type}`}
                label={type}
                checked={preferredWorkouts.includes(type)}
                onChange={() => handleWorkoutToggle(type)}
              />
            </Col>
          ))}
        </Row>
      </section>

      <hr />

      {/* Gender & Experience */}
      <section className="mb-5">
        <h4 className="mb-3">About You</h4>

        <Form.Group controlId="gender" className="mb-3">
          <Form.Label>Gender</Form.Label>
          <Form.Select value={gender} onChange={handleGenderChange}>
            <option value="">Select your gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Non-Binary">Non-Binary</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="experience">
          <Form.Label>Describe your fitness experience</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Tell us about your past workouts, goals, or fitness background..."
            value={experience}
            onChange={handleExperienceChange}
          />
        </Form.Group>
      </section>

      {/* Save Button */}
      <div className="d-flex justify-content-center mt-4">
        <Button variant="primary" size="lg" onClick={handleSave}>
          Save Profile
        </Button>
      </div>
    </>
  );
}
