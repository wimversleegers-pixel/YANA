import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { hasRole } from '@/server/permissions';

export default async function AdminHome() {
  const session = await auth();
  if (!hasRole(session?.user.roles, 'ADMIN')) redirect('/login');

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-yana-olive">Admin Dashboard</h1>
      <div className="grid gap-3 md:grid-cols-2">
        <Link href="/admin/applications" className="rounded border bg-white p-4 no-underline">Approve member applications</Link>
        <Link href="/admin/events" className="rounded border bg-white p-4 no-underline">Approve host events</Link>
        <Link href="/admin/settings" className="rounded border bg-white p-4 no-underline">Chat hours + transcript toggle</Link>
      </div>
    </section>
  );
}
