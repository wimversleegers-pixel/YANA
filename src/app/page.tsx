import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-yana-olive">You Are Not Alone</h1>
        <p className="text-lg">
          yana helps people in Belgium find kind community events and anonymous live conversation support.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/events" className="rounded bg-yana-olive px-4 py-2 font-medium text-white no-underline">
            Find an event
          </Link>
          <button className="rounded border border-yana-olive px-4 py-2 font-medium text-yana-olive">
            Talk to a volunteer now
          </button>
        </div>
      </div>
      <div className="rounded-xl border border-yana-olive/20 bg-white p-4">
        <h2 className="text-xl font-semibold">Membership</h2>
        <p className="mt-2 text-sm">Apply to become a member, volunteer, or host events.</p>
        <Link href="/about" className="mt-4 inline-block text-yana-olive">
          Learn more about yana
        </Link>
      </div>
    </section>
  );
}
