/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/user/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import authOptions from '@/lib/authOptions';
import bcrypt from 'bcrypt'; // ✅ add bcrypt

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const userId = Number(session.user.id);

  const {
    contactInfo,
    preferredDays,
    preferredWorkouts,
    gender,
    experience,
    newUsername, // ✅ optional
    newPassword, // ✅ optional
  }: {
    contactInfo: {
      email: string;
      phone: string;
      instagram: string;
      twitter: string;
      linkedin: string;
    };
    preferredDays: string[];
    preferredWorkouts: string[];
    gender: string;
    experience: string;
    newUsername?: string;
    newPassword?: string;
  } = await req.json();

  const updateData: any = {
    email: contactInfo.email,
    phone: contactInfo.phone,
    instagram: contactInfo.instagram,
    twitter: contactInfo.twitter,
    linkedIn: contactInfo.linkedin,
    days: preferredDays,
    types: preferredWorkouts,
    gender,
    experience,
  };

  // ✅ conditionally add username
  if (newUsername?.trim()) {
    updateData.username = newUsername.trim();
  }

  // ✅ conditionally hash and add password
  if (newPassword?.trim()) {
    const hashed = await bcrypt.hash(newPassword.trim(), 10);
    updateData.password = hashed;
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: updateData,
  });

  return NextResponse.json({ success: true, user: updated });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const userId = Number(session.user.id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      username: true,
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

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    username: user.username, // ✅ return it
    contactInfo: {
      email: user.email,
      phone: user.phone || '',
      instagram: user.instagram,
      twitter: user.twitter,
      linkedin: user.linkedIn,
    },
    preferredDays: user.days,
    preferredWorkouts: user.types,
    gender: user.gender,
    experience: user.experience,
  });
}
