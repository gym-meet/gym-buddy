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

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const friend = await prisma.user.findUnique({
      where: { id: friendId },
    });

    if (!friend) {
      return NextResponse.json({ error: 'Friend not found' }, { status: 404 });
    }

    // Prevent adding self as friend
    if (currentUser.id === friendId) {
      return NextResponse.json({ error: 'Cannot add yourself as a friend' }, { status: 400 });
    }

    // Check if already friends
    const existingFriendship = await prisma.userFriends.findUnique({
      where: {
        A_B: {
          A: currentUser.id,
          B: friendId,
        },
      },
    });

    const reverseExistingFriendship = await prisma.userFriends.findUnique({
      where: {
        A_B: {
          A: friendId,
          B: currentUser.id,
        },
      },
    });

    if (existingFriendship || reverseExistingFriendship) {
      return NextResponse.json({ message: 'Already friends' }, { status: 200 });
    }

    // Add the friendship
    await prisma.userFriends.create({
      data: {
        A: currentUser.id,
        B: friendId,
      },
    });

    return NextResponse.json({ message: 'Friend added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding friend:', error);
    return NextResponse.json({ error: 'Failed to add friend' }, { status: 500 });
  }
}
