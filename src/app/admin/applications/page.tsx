import { prisma } from '@/lib/prisma';

export default async function ApplicationsPage() {
  const applications = await prisma.memberApplication.findMany({ where: { status: 'PENDING' }, orderBy: { createdAt: 'asc' } });

  return (
    <section className="space-y-3">
      <h1 className="text-2xl font-bold">Pending applications</h1>
      {applications.map((app) => (
        <article key={app.id} className="rounded border bg-white p-3">
          <p className="font-medium">{app.fullName} ({app.email})</p>
          <p className="text-sm">{app.motivation}</p>
          <p className="mt-1 text-xs text-gray-500">Use Prisma studio/admin API to approve and assign roles.</p>
        </article>
      ))}
    </section>
  );
}
