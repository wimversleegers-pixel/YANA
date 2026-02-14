import { emergencyLinks } from '@/lib/emergency';

export default function PrivacyPage() {
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-bold text-yana-olive">Privacy & Support Boundaries</h1>
      <p>Visitors can chat anonymously. We store minimal chat metadata and no IP addresses in our app database.</p>
      <p>Transcript storage is OFF by default and only enabled by admin toggle if required.</p>
      <p>This service is supportive listening, not therapy, and not emergency help.</p>
      <ul className="list-disc pl-6">
        {emergencyLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </article>
  );
}
