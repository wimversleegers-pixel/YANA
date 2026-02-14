import Link from 'next/link';

export function SafetyBanner() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm">
      <strong>Not a crisis service.</strong> If you are in immediate danger call 112.{' '}
      <Link href="/privacy" className="font-medium text-red-700">
        Emergency resources
      </Link>
    </div>
  );
}
