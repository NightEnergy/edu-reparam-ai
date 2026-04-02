/** Returns a human-readable relative time string (e.g. "3 days ago"). */
export function timeAgo(date: Date | string): string {
  const now = Date.now();
  const then = new Date(date).getTime();
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

/** Formats a date as YYYY-MM-DD. */
export function toIsoDate(date: Date | string): string {
  return new Date(date).toISOString().split('T')[0];
}
