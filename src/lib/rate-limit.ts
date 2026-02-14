const buckets = new Map<string, number[]>();

export function rateLimit(key: string, limit = 10, intervalMs = 60_000) {
  const now = Date.now();
  const bucket = buckets.get(key) ?? [];
  const recent = bucket.filter((time) => now - time < intervalMs);

  if (recent.length >= limit) {
    return false;
  }

  recent.push(now);
  buckets.set(key, recent);
  return true;
}
