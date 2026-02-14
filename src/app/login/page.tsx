'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  return (
    <section className="max-w-md space-y-3">
      <h1 className="text-2xl font-bold">Member login</h1>
      <p>Use your approved member email to receive a magic link.</p>
      <input
        className="w-full rounded border p-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />
      <button className="rounded bg-yana-olive px-3 py-2 text-white" onClick={() => signIn('email', { email, callbackUrl: '/admin' })}>
        Send magic link
      </button>
    </section>
  );
}
