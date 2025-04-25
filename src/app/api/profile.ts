import { NextResponse } from 'next/server';
// eslint-disable-next-line import/extensions
import { prisma } from '@/lib/prisma'; // Adjust this import based on your Prisma setup

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { contactInfo, preferredDays, preferredWorkouts, gender, experience } = body;

    // Save the profile data to the database
    const updatedProfile = await prisma.user.update({
      where: { email: contactInfo.email }, // Assuming email is unique
      data: {
        phone: contactInfo.phone,
        instagram: contactInfo.instagram,
        twitter: contactInfo.twitter,
        linkedIn: contactInfo.linkedin,
        days: preferredDays,
        types: preferredWorkouts,
        gender,
        experience,
      },
    });

    return NextResponse.json({ message: 'Profile updated successfully', profile: updatedProfile }, { status: 200 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email'); // Assuming email is passed as a query parameter

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Fetch the user's profile data from the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      contactInfo: {
        email: user.email,
        phone: user.phone,
        instagram: user.instagram,
        twitter: user.twitter,
        linkedin: user.linkedIn,
      },
      preferredDays: user.days,
      preferredWorkouts: user.types,
      gender: user.gender,
      experience: user.experience,
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
