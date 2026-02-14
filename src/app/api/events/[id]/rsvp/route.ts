import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rsvpSchema } from '@/lib/validators';
import { makeToken } from '@/lib/utils';
import { nextRsvpStatus } from '@/lib/rsvp';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  if (!rateLimit(`rsvp:${params.id}`, 5, 60_000)) {
    return NextResponse.json({ message: 'Too many RSVP attempts. Please wait a minute.' }, { status: 429 });
  }

  const formData = await req.formData();
  const parsed = rsvpSchema.safeParse({
    contactName: formData.get('contactName')?.toString(),
    contactEmail: formData.get('contactEmail')?.toString(),
    honeypot: formData.get('company')?.toString()
  });

  if (!parsed.success || parsed.data.honeypot) {
    return NextResponse.json({ message: 'Invalid request.' }, { status: 400 });
  }

  const event = await prisma.event.findUnique({ where: { id: params.id }, include: { rsvps: true } });
  if (!event) return NextResponse.json({ message: 'Event not found' }, { status: 404 });

  const status = nextRsvpStatus(event.rsvps, event.capacity);

  await prisma.rSVP.create({
    data: {
      eventId: params.id,
      token: makeToken(),
      contactName: parsed.data.contactName || null,
      contactEmail: parsed.data.contactEmail || null,
      status,
      isAnonymous: !parsed.data.contactName && !parsed.data.contactEmail
    }
  });

  return NextResponse.json({
    message: status === 'WAITLIST' ? 'You are on the waitlist.' : 'RSVP sent. Host approval is required before details are shared.'
  });
}
