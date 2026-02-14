'use client';

import { useEffect, useState } from 'react';

const selfHarmTerms = ['suicide', 'kill myself', 'self-harm', 'end my life'];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'online' | 'offline'>('offline');
  const [message, setMessage] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    fetch('/api/chat/status')
      .then((res) => res.json())
      .then((data) => setStatus(data.online ? 'online' : 'offline'));
  }, []);

  useEffect(() => {
    const value = message.toLowerCase();
    setShowPrompt(selfHarmTerms.some((term) => value.includes(term)));
  }, [message]);

  return (
    <div className="fixed bottom-4 right-4 z-40 w-80">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full rounded-lg bg-yana-olive p-3 text-left text-white"
      >
        Talk to a volunteer now ({status === 'online' ? 'Online now' : 'Offline'})
      </button>
      {open && (
        <div className="mt-2 rounded-lg border bg-white p-3 shadow">
          <p className="text-xs text-gray-700">
            Supportive listening only. Not therapy and not emergency help.
          </p>
          {status === 'offline' ? (
            <p className="mt-2 text-sm">Chat is available daily 17:00-22:00 Europe/Brussels.</p>
          ) : (
            <>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 h-24 w-full rounded border p-2 text-sm"
                placeholder="Share what is on your mind..."
              />
              {showPrompt && (
                <p className="mt-2 rounded bg-red-50 p-2 text-xs text-red-700">
                  You deserve urgent support now. If you may act on these thoughts, call 112 or visit 1813.be.
                </p>
              )}
              <button className="mt-2 rounded bg-yana-gold px-3 py-2 text-sm">Connect anonymously</button>
            </>
          )}
          <button className="mt-2 text-xs underline">Report / Flag</button>
        </div>
      )}
    </div>
  );
}
