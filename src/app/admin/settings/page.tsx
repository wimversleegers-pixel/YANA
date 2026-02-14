import { prisma } from '@/lib/prisma';

export default async function SettingsPage() {
  const chat = await prisma.chatSettings.findUnique({ where: { id: 'singleton' } });
  const metrics = {
    chats: await prisma.chatSession.count(),
    flagged: await prisma.chatSession.count({ where: { flagged: true } })
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Chat settings</h1>
      <p>Hours: {chat?.openHour}:00 - {chat?.closeHour}:00 ({chat?.timezone})</p>
      <p>Transcript storage: {chat?.transcriptStorageEnabled ? 'Enabled' : 'Disabled (recommended)'}</p>
      <p>Metrics: {metrics.chats} chats • {metrics.flagged} flagged</p>
    </section>
  );
}
