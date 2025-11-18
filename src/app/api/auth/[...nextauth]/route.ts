import { NextResponse } from 'next/server';

/**
 * Stubbed NextAuth handler.
 * In production, wrap GoogleProvider with NextAuth and export GET/POST.
 */
export async function GET() {
  return NextResponse.json({ provider: 'google', status: 'ok' });
}

export const POST = GET;
