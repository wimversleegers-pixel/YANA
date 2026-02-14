import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';

export async function POST() {
  if (!rateLimit('chat-connect', 10, 60_000)) {
    return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });
  }

  const chat = await prisma.chatSession.create({ data: { metadata: '{"anonymous":true}' } });
  return NextResponse.json({ chatSessionId: chat.id });
}
