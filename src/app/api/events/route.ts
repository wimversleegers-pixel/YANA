import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { eventSchema } from '@/lib/validators';
import { hasRole } from '@/server/permissions';

export async function POST(req: Request) {
  const session = await auth();
  if (!hasRole(session?.user.roles, 'HOST')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  const data = eventSchema.parse(body);

  const created = await prisma.event.create({
    data: {
      ...data,
      startDateTime: new Date(data.startDateTime),
      endDateTime: new Date(data.endDateTime),
      status: 'PENDING',
      hostId: session!.user.id
    }
  });

  return NextResponse.json({ id: created.id });
}
