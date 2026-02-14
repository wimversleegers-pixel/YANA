import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SafetyBanner } from '@/components/safety-banner';
import { ChatWidget } from '@/components/chat-widget';

export const metadata: Metadata = {
  title: 'yana | You Are Not Alone',
  description: 'Community events and supportive conversations for loneliness and mental wellbeing.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 p-4">
          <SafetyBanner />
          {children}
        </main>
        <ChatWidget />
      </body>
    </html>
  );
}
