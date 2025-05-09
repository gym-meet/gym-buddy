import React from 'react';
import { Container } from 'react-bootstrap';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

// Adjust the import path based on your file structure
import TopMenu from '../../../components/TopMenu';
import ProfileForm from '../../../components/ProfileForm'; // Import the new component

export default async function ProfilePage({ params }: { params: { id: string } }) {
  // params.id comes from the URL
  // If URL is /profile/2, then params.id is "2"
  const userId = parseInt(params.id, 10);
  let user;

  // Finds specific user ID
  try {
    user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Try catch with error message
    if (!user) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user');
  }

  return (
    <>
      <title>Profile</title>
      <meta name="description" content="User Profile Page" />
      <main>
        <div>
          <TopMenu />
        </div>
        <Container
          className="mt-5 mb-5" // Added mb-5 for bottom spacing
          style={{ maxWidth: '800px', backgroundColor: '#d5f5e3', borderRadius: '12px', padding: '2rem' }}
        >
          {/* Render the ProfileForm component here */}
          <ProfileForm user={user} />
        </Container>
      </main>
    </>
  );
}
