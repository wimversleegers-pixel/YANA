import type { RSVP } from '@prisma/client';

export function nextRsvpStatus(existing: RSVP[], capacity: number) {
  const approved = existing.filter((r) => r.status === 'APPROVED').length;
  return approved >= capacity ? 'WAITLIST' : 'PENDING';
}
