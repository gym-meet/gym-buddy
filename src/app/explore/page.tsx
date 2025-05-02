import { Container, Row, Col } from 'react-bootstrap';
import { FunnelFill } from 'react-bootstrap-icons';
import { prisma } from '@/lib/prisma';
import { ProfileCardData } from '@/lib/ProfileCardData';
import TopMenu from '../../components/TopMenu';
import FooterMenu from '../../components/FooterMenu';
import ProfileCard from '../../components/ProfileCard';
import '../style.css';

// Fetch users from the database
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

const Explore = async () => {
  const users = await getUsers();

  return (
    <main className="bg-light min-vh-100">
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
              <Col key={profile.id}>
                <a
                  href="/profile/$profile.id"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <ProfileCard key={profile.id} profile={profile} />
                </a>
              </Col>
            ))
          ) : (
            <Col>
              <p>No gym partners found. Be the first to sign up!</p>
            </Col>
          )}
        </Row>
      </Container>

      <FooterMenu />
    </main>
  );
};

export default Explore;
