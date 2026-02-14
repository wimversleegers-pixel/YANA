import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { hasRole } from '@/server/permissions';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const session = await auth();
  if (!hasRole(session?.user.roles, 'ADMIN')) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = (await req.json()) as { enabled: boolean };
  await prisma.chatSettings.update({ where: { id: 'singleton' }, data: { transcriptStorageEnabled: body.enabled } });
  await prisma.auditLog.create({
    data: {
      actorId: session!.user.id,
      action: body.enabled ? 'ENABLE_TRANSCRIPTS' : 'DISABLE_TRANSCRIPTS',
      targetType: 'ChatSettings',
      targetId: 'singleton'
    }
  });
  return NextResponse.json({ ok: true });
}
