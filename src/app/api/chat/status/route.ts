import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const settings = await prisma.chatSettings.upsert({
    where: { id: 'singleton' },
    update: {},
    create: { id: 'singleton', openHour: 17, closeHour: 22, timezone: 'Europe/Brussels', transcriptStorageEnabled: false }
  });

  const now = new Date();
  const hour = Number(now.toLocaleString('en-US', { timeZone: settings.timezone, hour: '2-digit', hour12: false }));
  const online = hour >= settings.openHour && hour < settings.closeHour;

  return NextResponse.json({ online, openHour: settings.openHour, closeHour: settings.closeHour, timezone: settings.timezone });
}
