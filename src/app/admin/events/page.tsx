import { prisma } from '@/lib/prisma';

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({ where: { status: 'PENDING' }, include: { host: true } });

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Pending host events</h1>
      {events.map((event) => (
        <article key={event.id} className="rounded border bg-white p-3">
          <p className="font-medium">{event.title}</p>
          <p className="text-sm">Host: {event.host.email}</p>
          <p className="text-sm">{event.summary}</p>
        </article>
      ))}
    </section>
  );
}
