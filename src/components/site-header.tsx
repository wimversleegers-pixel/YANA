import Link from 'next/link';

const links = [
  { href: '/events', label: 'Events' },
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy & Boundaries' },
  { href: '/admin', label: 'Admin' }
];

export function SiteHeader() {
  return (
    <header className="border-b border-yana-olive/30 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-2xl font-semibold text-yana-olive">
          yana
        </Link>
        <nav className="flex gap-4 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-yana-olive">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
