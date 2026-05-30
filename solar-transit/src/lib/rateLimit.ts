// Simple in-memory rate limiter
// Tracks requests per IP address within a time window.
// Note: this resets on server restart and does not share
// state across serverless function instances in production.
// Replace with Upstash or Redis-based solution when scaling.

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const store = new Map<string, RateLimitEntry>();

interface RateLimitOptions {
  maxRequests: number; // max requests allowed
  windowMs: number;   // time window in milliseconds
}

export function rateLimit(ip: string, options: RateLimitOptions): boolean {
  const now = Date.now();
  const entry = store.get(ip);

  // No entry yet — create one
  if (!entry) {
    store.set(ip, { count: 1, windowStart: now });
    return true; // allowed
  }

  // Outside the window — reset
  if (now - entry.windowStart > options.windowMs) {
    store.set(ip, { count: 1, windowStart: now });
    return true; // allowed
  }

  // Inside the window — check count
  if (entry.count >= options.maxRequests) {
    return false; // blocked
  }

  // Inside the window — increment
  entry.count += 1;
  return true; // allowed
}

// Clean up stale entries every 10 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of store.entries()) {
    if (now - entry.windowStart > 10 * 60 * 1000) {
      store.delete(ip);
    }
  }
}, 10 * 60 * 1000);
