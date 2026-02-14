import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { RSVPForm } from './rsvp-form';

export default async function EventDetail({ params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({ where: { id: params.id }, include: { rsvps: true } });
  if (!event || event.status !== 'APPROVED') notFound();

  const approvedCount = event.rsvps.filter((r) => r.status === 'APPROVED').length;
  const full = approvedCount >= event.capacity;

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p>{event.summary}</p>
      <p>Area: {event.area}</p>
      <p>Exact address shared only after host approval and for signed-in members.</p>
      <p>Capacity: {approvedCount}/{event.capacity}</p>
      <RSVPForm eventId={event.id} full={full} />
    </section>
  );
}
