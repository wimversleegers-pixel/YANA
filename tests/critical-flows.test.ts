import { describe, expect, it } from 'vitest';
import { hasRole } from '@/server/permissions';
import { nextRsvpStatus } from '@/lib/rsvp';
import { eventSchema } from '@/lib/validators';

describe('critical flows', () => {
  it('allows admins on all role checks', () => {
    expect(hasRole(['ADMIN'], 'HOST')).toBe(true);
  });

  it('puts RSVP on waitlist when event is full', () => {
    const status = nextRsvpStatus([{ status: 'APPROVED' } as never], 1);
    expect(status).toBe('WAITLIST');
  });

  it('validates event creation payload', () => {
    const parsed = eventSchema.safeParse({
      title: 'Tea Meetup',
      summary: 'A kind meetup for people feeling lonely.',
      area: 'Brussels',
      exactAddress: 'Rue Example 10',
      startDateTime: new Date().toISOString(),
      endDateTime: new Date(Date.now() + 3600000).toISOString(),
      capacity: 20,
      recurrenceEnabled: true,
      recurrenceFreq: 'WEEKLY',
      recurrenceInterval: 1,
      recurrenceCount: 10
    });

    expect(parsed.success).toBe(true);
  });
});
