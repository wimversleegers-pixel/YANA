import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { flagSchema } from '@/lib/validators';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  if (!rateLimit('chat-flag', 5, 60_000)) {
    return NextResponse.json({ error: 'Too many flags' }, { status: 429 });
  }

  const body = await req.json();
  const parsed = flagSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid flag' }, { status: 400 });

  await prisma.chatFlag.create({ data: parsed.data });
  if (parsed.data.chatSessionId) {
    await prisma.chatSession.update({ where: { id: parsed.data.chatSessionId }, data: { flagged: true } });
  }

  return NextResponse.json({ ok: true });
}
