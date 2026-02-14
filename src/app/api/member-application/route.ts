import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { memberApplicationSchema } from '@/lib/validators';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  if (!rateLimit('member-application', 3, 60_000)) {
    return NextResponse.json({ message: 'Too many attempts. Please try later.' }, { status: 429 });
  }

  const body = await req.json();
  const parsed = memberApplicationSchema.safeParse(body);
  if (!parsed.success || parsed.data.honeypot) {
    return NextResponse.json({ message: 'Invalid application' }, { status: 400 });
  }

  await prisma.memberApplication.create({ data: parsed.data });
  return NextResponse.json({ message: 'Application received' });
}
