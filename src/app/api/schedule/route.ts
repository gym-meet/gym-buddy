/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
// app/api/schedule/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const schedules = await prisma.scheduleEntry.findMany({
      where: { userId: parseInt(session.user.id, 10) },
      orderBy: { date: 'asc' },
    });
    return NextResponse.json(schedules, { status: 200 });
  } catch (error) {
    console.error('Error fetching schedules:', error);
    return NextResponse.json(
      { message: 'Error fetching schedules' },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { date, exercise } = await request.json();
    if (!date || !exercise) {
      return NextResponse.json(
        { message: 'Date and exercise are required' },
        { status: 400 },
      );
    }

    const newEntry = await prisma.scheduleEntry.create({
      data: {
        userId: parseInt(session.user.id, 10),
        date: new Date(date),
        exercise,
      },
    });

    return NextResponse.json(newEntry, { status: 201 });
  } catch (error) {
    console.error('Error creating schedule entry:', error);
    return NextResponse.json(
      { message: 'Error creating schedule entry' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { date, exercise } = await request.json();
    if (!date || !exercise) {
      return NextResponse.json(
        { message: 'Date and exercise are required' },
        { status: 400 },
      );
    }

    await prisma.scheduleEntry.deleteMany({
      where: {
        userId: parseInt(session.user.id, 10),
        date: new Date(date),
        exercise,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting schedule entry:', error);
    return NextResponse.json(
      { message: 'Error deleting schedule entry' },
      { status: 500 },
    );
  }
}
