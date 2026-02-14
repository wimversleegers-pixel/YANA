import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { expandEventInstances } from '@/lib/events';

export default async function EventsPage({
  searchParams
}: {
  searchParams: { q?: string; area?: string; recurring?: string; available?: string };
}) {
  const events = await prisma.event.findMany({ where: { status: 'APPROVED' }, orderBy: { startDateTime: 'asc' }, include: { rsvps: true } });

  const q = (searchParams.q ?? '').toLowerCase();
  const area = searchParams.area?.toLowerCase() ?? '';
  const recurring = searchParams.recurring === '1';
  const available = searchParams.available === '1';

  const filtered = events.filter((event) => {
    const hasCapacity = event.rsvps.filter((r) => r.status === 'APPROVED').length < event.capacity;
    return (
      (!q || event.title.toLowerCase().includes(q) || event.summary.toLowerCase().includes(q)) &&
      (!area || event.area.toLowerCase().includes(area)) &&
      (!recurring || event.recurrenceEnabled) &&
      (!available || hasCapacity)
    );
  });

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-yana-olive">Events Calendar</h1>
      <form className="grid gap-2 rounded border bg-white p-3 md:grid-cols-5">
        <input name="q" placeholder="Search events" className="rounded border p-2" defaultValue={searchParams.q} />
        <input name="area" placeholder="Location area" className="rounded border p-2" defaultValue={searchParams.area} />
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="recurring" value="1" />Recurring</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="available" value="1" />Capacity available</label>
        <button className="rounded bg-yana-olive p-2 text-white">Filter</button>
      </form>
      <div className="grid gap-3">
        {filtered.map((event) => {
          const approvedCount = event.rsvps.filter((r) => r.status === 'APPROVED').length;
          const waitlistCount = event.rsvps.filter((r) => r.status === 'WAITLIST').length;
          return (
            <article key={event.id} className="rounded border bg-white p-4">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p>{event.summary}</p>
              <p className="text-sm">Area: {event.area}</p>
              <p className="text-sm">Spots: {event.capacity - approvedCount} available • Waitlist: {waitlistCount}</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
                {expandEventInstances(event).slice(0, 4).map((instance) => (
                  <li key={instance.id}>{instance.start.toLocaleString()} {instance.area}</li>
                ))}
              </ul>
              <Link href={`/events/${event.id}`} className="mt-2 inline-block text-yana-olive">
                View & RSVP
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
