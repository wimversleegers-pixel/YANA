import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { hasRole } from '@/server/permissions';

export default async function VolunteerChatPage() {
  const session = await auth();
  if (!hasRole(session?.user.roles, 'VOLUNTEER')) redirect('/login');

  return (
    <section>
      <h1 className="text-2xl font-bold">Volunteer Chat Console</h1>
      <p>Live chat stream UI is intentionally minimal in MVP. Connect this to your realtime provider in phase 2.</p>
    </section>
  );
}
