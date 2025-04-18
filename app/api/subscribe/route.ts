import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';
import { NewsletterEmailTemplate } from '@/components/NewsletterEmailTemplate';

// Initialize Resend with API key
// In production, you would use process.env.RESEND_API_KEY
const API_KEY = process.env.RESEND_API_KEY || 'dummy_key_for_build';
const resend = API_KEY === 'dummy_key_for_build' ? 
  // Mock Resend instance for development/build
  { 
    emails: { 
      send: async () => ({ id: 'mock_email_id', data: null }) 
    } 
  } as unknown as Resend : 
  new Resend(API_KEY);

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send confirmation email to the subscriber
    const { data, error } = await resend.emails.send({
      from: 'Pebbling AI <newsletter@pebbling.ai>', // Replace with your verified domain
      to: [email],
      subject: 'Welcome to Pebbling AI Newsletter',
      react: React.createElement(NewsletterEmailTemplate, { email }),
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json(
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      );
    }

    // In a real application, you would save the email to your database here
    // For example: await db.insert('subscribers', { email, createdAt: new Date() });

    return NextResponse.json(
      { 
        message: 'Subscription successful',
        id: data?.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
