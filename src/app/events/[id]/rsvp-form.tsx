'use client';

import { useState } from 'react';

export function RSVPForm({ eventId, full }: { eventId: string; full: boolean }) {
  const [result, setResult] = useState('');

  async function onSubmit(formData: FormData) {
    const response = await fetch(`/api/events/${eventId}/rsvp`, { method: 'POST', body: formData });
    const data = await response.json();
    setResult(data.message ?? 'Done');
  }

  return (
    <form action={onSubmit} className="rounded border bg-white p-4">
      <h2 className="text-lg font-semibold">{full ? 'Join waitlist' : 'RSVP (anonymous allowed)'}</h2>
      <input name="contactName" placeholder="Name (optional)" className="mt-2 w-full rounded border p-2" />
      <input name="contactEmail" placeholder="Email (optional)" className="mt-2 w-full rounded border p-2" />
      <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />
      <button className="mt-3 rounded bg-yana-olive px-4 py-2 text-white">Submit</button>
      {result && <p className="mt-2 text-sm">{result}</p>}
    </form>
  );
}
