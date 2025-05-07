'use client';

import { useState } from 'react';
import { Card, Col, Badge, Button } from 'react-bootstrap';
import { PlusCircleFill, CheckCircleFill } from 'react-bootstrap-icons';
import { ProfileCardData } from '@/lib/ProfileCardData';
import TooltipImage from './TooltipImage';

const ProfileCard = ({
  profile,
  currentUserId,
  isFriend 
}: {
  profile: ProfileCardData;
  currentUserId: number;
  isFriend: boolean;
}) => {
  const [isUserFriend, setIsUserFriend] = useState(isFriend);
  const [isLoading, setIsLoading] = useState(false);
  // Generate display name from email (before the @ symbol)
  const displayName = profile.email.split('@')[0];

  // (Temporarily) chooses random workout
  const getRandomWorkout = () => {
    if (profile.types && profile.types.length > 0) {
      const randomIndex = Math.floor(Math.random() * profile.types.length);
      return profile.types[randomIndex];
    }
    return 'None';
  };

  // Convert database days format to display format
  const convertDaysToSchedule = (days: string[]) => {
    const dayMap: Record<string, string> = {
      Monday: 'M',
      Tuesday: 'T',
      Wednesday: 'W',
      Thursday: 'Th',
      Friday: 'F',
      Saturday: 'Sa',
      Sunday: 'Su',
    };

    return days.map(day => dayMap[day] || day);
  };

  // Generate schedule display from user's days
  const schedule = convertDaysToSchedule(profile.days);

  const handleFriendAction = async () => {
    if (profile.id === currentUserId) {
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = isUserFriend ? '/api/friends/remove' : '/api/friends/add';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          friendId: profile.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update friend status');
      }

      setIsUserFriend(!isUserFriend);
    } catch (error) {
      console.error('Error updating friend status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Col>
      <Card className="h-100 border-0 rounded-4 overflow-hidden">
        <div className="position-relative">
          {/* Green background for header */}
          <div
            style={{
              height: '75px',
              backgroundColor: '#024731',
            }}
          />

          {currentUserId !== profile.id && (
            <div className="position-absolute top-0 end-0 m-2">
              <Button
                variant="link"
                className="p-0 text-light"
                onClick={handleFriendAction}
                disabled={isLoading}
                title={isUserFriend ? 'Buddies!' : 'Add Gym Buddy'}
              >
                {isUserFriend ? (
                  <CheckCircleFill size={24} className="text-success" />
                ) : (
                  <PlusCircleFill size={24} />
                )}
              </Button>
            </div>
          )}

          {/* Card content */}
          <div className="px-3" style={{ marginTop: '-60px' }}>
            <div className="d-flex mb-3">
              <TooltipImage
                className="border border-3 border-white shadow-sm"
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`}
                name={profile.email}
                width={50}
                roundedCircle
              />
              <div className="ms-3 d-flex flex-column justify-content-center">
                <h5 className="mb-0 fw-bold text-white">
                  {displayName}
                </h5>
                {/* <Badge
                  pill
                  bg="light"
                  text="dark"
                  className="mt-1 border"
                  style={{
                    width: '100px',
                  }}
                >
                  {profile.experience}
                </Badge> */}
              </div>
            </div>

            <p className="text-muted small mb-3">
              {profile.experience || 'Looking forward to meeting new gym buddies!'}
            </p>

            <div className="mb-3">
              <div className="d-flex align-items-center mb-2">
                <div className="me-2 text-muted small fw-bold">NEXT:</div>
                <Badge bg="light" text="dark" className="border border-light-subtle py-1 px-2">
                  {getRandomWorkout()}
                </Badge>
              </div>

              <div>
                <div className="text-muted small fw-bold mb-1">SCHEDULE:</div>
                <div className="d-flex flex-wrap gap-1">
                  {['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'].map((day) => (
                    <Badge
                      key={day}
                      bg={schedule.includes(day) ? 'light' : 'light-subtle'}
                      text={schedule.includes(day) ? 'dark' : 'secondary'}
                      className={`border ${schedule.includes(day) ? 'border-dark' : 'border-light-subtle'}`}
                      style={{
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {day.charAt(0)}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default ProfileCard;
