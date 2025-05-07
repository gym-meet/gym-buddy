/* eslint-disable import/prefer-default-export */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import NextAuthOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(NextAuthOptions);

    // Check if user is authenticated
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the request body
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

    // Check if friendId is valid
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
    const alreadyFriends = await prisma.user.findFirst({
      where: {
        id: currentUser.id,
        friends: {
          some: {
            id: friendId,
          },
        },
      },
    });

    if (alreadyFriends) {
      return NextResponse.json({ message: 'Already friends' }, { status: 200 });
    }

    // Add the friend relationship
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        friends: {
          connect: { id: friendId },
        },
      },
    });

    return NextResponse.json({ message: 'Friend added successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error adding friend:', error);
    return NextResponse.json({ error: 'Failed to add friend' }, { status: 500 });
  }
}
