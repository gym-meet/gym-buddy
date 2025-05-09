/* eslint-disable import/first */
export const dynamic = 'force-dynamic';
import { Container, Row, Col } from 'react-bootstrap';
import { FunnelFill } from 'react-bootstrap-icons';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProfileCardData } from '@/lib/ProfileCardData';
import { getServerSession } from 'next-auth';
import NextAuthOptions from '@/lib/authOptions';
import TopMenu from '../../components/TopMenu';
import FooterMenu from '../../components/FooterMenu';
import ProfileCard from '../../components/ProfileCard';
import '../style.css';

async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        phone: true,
        instagram: true,
        twitter: true,
        linkedIn: true,
        days: true,
        types: true,
        gender: true,
        experience: true,
      },
    });
    return users as ProfileCardData[];
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

async function getUserFriends(userId: number) {
  try {
    const userWithFriends = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        UserFriends_UserFriends_AToUser: {
          select: { B: true },
        },
        UserFriends_UserFriends_BToUser: {
          select: { A: true },
        },
      },
    });

    if (!userWithFriends) return [];

    const friendsA = userWithFriends.UserFriends_UserFriends_AToUser.map(f => f.B);
    const friendsB = userWithFriends.UserFriends_UserFriends_BToUser.map(f => f.A);

    // Combine both arrays to get all friend IDs
    return [...friendsA, ...friendsB];
  } catch (error) {
    console.error('Error fetching user friends:', error);
    return [];
  }
}

const Explore = async () => {
  const session = await getServerSession(NextAuthOptions);
  const users = await getUsers();

  let currentUserId = 0;
  let userFriendIds: number[] = [];

  if (session?.user?.email) {
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (currentUser) {
      currentUserId = currentUser.id;
      userFriendIds = await getUserFriends(currentUserId);
    }
  }

  return (
    <main className="bg-light">
      <TopMenu />

      <Container className="py-5">
        <Col className="d-flex justify-content-between mb-4">
          <div>
            <h2 className="fw-bold mb-0">Find Your Gym Partner</h2>
          </div>
          <div>
            <button type="button" className="btn btn-outline-dark">
              <FunnelFill />
            </button>
          </div>
        </Col>

        <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
          {users.length > 0 ? (
            users.map((profile) => (
              <Link
                href={`/profile/${profile.id}`}
                key={profile.id}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <ProfileCard
                  key={profile.id}
                  profile={profile}
                  currentUserId={currentUserId}
                  isFriend={userFriendIds.includes(profile.id)}
                />
              </Link>
            ))
          ) : (
            <Col>
              <p>Log in to see potential gym partners!</p>
            </Col>
          )}
        </Row>
      </Container>

      <FooterMenu />
    </main>
  );
};

export default Explore;
