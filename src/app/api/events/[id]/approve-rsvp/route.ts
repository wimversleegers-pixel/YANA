import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { hasRole } from '@/server/permissions';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!hasRole(session?.user.roles, 'HOST')) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = (await req.json()) as { rsvpId: string; approved: boolean };
  const status = body.approved ? 'APPROVED' : 'CANCELLED';

  await prisma.rSVP.update({ where: { id: body.rsvpId, eventId: params.id }, data: { status } });
  return NextResponse.json({ ok: true });
}
