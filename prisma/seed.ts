import { PrismaClient, Role, EventStatus, RecurrenceFrequency } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@yana.org' },
    update: {},
    create: { email: 'admin@yana.org', name: 'YANA Admin' }
  });

  await prisma.userRole.upsert({
    where: { userId_role: { userId: admin.id, role: Role.ADMIN } },
    update: {},
    create: { userId: admin.id, role: Role.ADMIN }
  });

  const host = await prisma.user.upsert({
    where: { email: 'host@yana.org' },
    update: {},
    create: { email: 'host@yana.org', name: 'Community Host' }
  });

  await prisma.userRole.upsert({
    where: { userId_role: { userId: host.id, role: Role.HOST } },
    update: {},
    create: { userId: host.id, role: Role.HOST }
  });

  await prisma.chatSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: { id: 'singleton', timezone: 'Europe/Brussels', openHour: 17, closeHour: 22, transcriptStorageEnabled: false }
  });

  await prisma.event.createMany({
    data: [
      {
        title: 'Sunday Coffee Circle',
        summary: 'A warm in-person coffee meetup for people who want gentle connection.',
        area: 'Brussels - Ixelles',
        exactAddress: 'Shared after approval for members',
        startDateTime: new Date('2026-03-01T10:00:00+01:00'),
        endDateTime: new Date('2026-03-01T12:00:00+01:00'),
        capacity: 20,
        status: EventStatus.APPROVED,
        recurrenceEnabled: true,
        recurrenceFreq: RecurrenceFrequency.WEEKLY,
        recurrenceInterval: 1,
        recurrenceCount: 12,
        hostId: host.id
      },
      {
        title: 'Monthly Nature Walk',
        summary: 'Group walk focused on mindful conversation and support.',
        area: 'Antwerp - Rivierenhof',
        exactAddress: 'Shared after approval for members',
        startDateTime: new Date('2026-03-14T14:00:00+01:00'),
        endDateTime: new Date('2026-03-14T16:00:00+01:00'),
        capacity: 25,
        status: EventStatus.APPROVED,
        recurrenceEnabled: true,
        recurrenceFreq: RecurrenceFrequency.MONTHLY,
        recurrenceInterval: 1,
        recurrenceCount: 6,
        hostId: host.id
      }
    ],
    skipDuplicates: true
  });
}

main().finally(() => prisma.$disconnect());
