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

    // Check if the friend exists in the database
    const friend = await prisma.user.findUnique({
      where: { id: friendId },
    });

    if (!friend) {
      return NextResponse.json({ error: 'Friend not found' }, { status: 404 });
    }

    // Check if they are actually friends
    const areFriends = await prisma.user.findFirst({
      where: {
        id: currentUser.id,
        friends: {
          some: {
            id: friendId,
          },
        },
      },
    });

    if (!areFriends) {
      return NextResponse.json({ message: 'Not friends' }, { status: 200 });
    }

    // Remove the friend relationship
    await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        friends: {
          disconnect: { id: friendId },
        },
      },
    });

    return NextResponse.json({ message: 'Friend removed successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error removing friend:', error);
    return NextResponse.json({ error: 'Failed to remove friend' }, { status: 500 });
  }
}
