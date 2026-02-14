'use client';

import { useState } from 'react';

export default function ApplyPage() {
  const [message, setMessage] = useState('');

  async function submit(formData: FormData) {
    const payload = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      motivation: formData.get('motivation'),
      honeypot: formData.get('website')
    };

    const res = await fetch('/api/member-application', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    setMessage(data.message || 'Submitted');
  }

  return (
    <section className="max-w-xl space-y-4">
      <h1 className="text-3xl font-bold text-yana-olive">Apply for membership</h1>
      <form action={submit} className="space-y-3 rounded border bg-white p-4">
        <input name="fullName" placeholder="Full name" className="w-full rounded border p-2" required />
        <input name="email" type="email" placeholder="Email" className="w-full rounded border p-2" required />
        <textarea name="motivation" placeholder="Why do you want to join yana?" className="h-36 w-full rounded border p-2" required />
        <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <button className="rounded bg-yana-olive px-4 py-2 text-white">Send application</button>
        {message && <p className="text-sm">{message}</p>}
      </form>
    </section>
  );
}
