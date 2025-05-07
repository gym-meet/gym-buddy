/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import NextAuthOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(NextAuthOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { friendId } = body;

    if (!friendId) {
      return NextResponse.json({ error: 'Friend ID is required' }, { status: 400 });
    }

    // Get current user
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if the friend exists in the database
    const friend = await prisma.user.findUnique({
      where: { id: friendId },
    });

    if (!friend) {
      return NextResponse.json({ error: 'Friend not found' }, { status: 404 });
    }

    // Check direct friendship (A -> B)
    const directFriendship = await prisma.userFriends.findUnique({
      where: {
        A_B: {
          A: currentUser.id,
          B: friendId,
        },
      },
    });

    // Check reverse friendship (B -> A)
    const reverseFriendship = await prisma.userFriends.findUnique({
      where: {
        A_B: {
          A: friendId,
          B: currentUser.id,
        },
      },
    });

    // If no friendship exists in either direction
    if (!directFriendship && !reverseFriendship) {
      return NextResponse.json({ message: 'Not friends' }, { status: 200 });
    }

    // Remove friendship
    if (directFriendship) {
      await prisma.userFriends.delete({
        where: {
          A_B: {
            A: currentUser.id,
            B: friendId,
          },
        },
      });
    }

    if (reverseFriendship) {
      await prisma.userFriends.delete({
        where: {
          A_B: {
            A: friendId,
            B: currentUser.id,
          },
        },
      });
    }

    return NextResponse.json({ message: 'Friend removed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error removing friend:', error);
    return NextResponse.json({ error: 'Failed to remove friend' }, { status: 500 });
  }
}
