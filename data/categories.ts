export type CategoryId =
  | "hosting"
  | "database"
  | "auth"
  | "email"
  | "analytics"
  | "errors"
  | "storage"
  | "jobs"
  | "realtime"
  | "search"
  | "cdn"
  | "ci"
  | "domain"
  | "payments"
  | "ai"
  | "monitoring";

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  { id: "hosting", label: "Hosting", description: "Where your app runs." },
  { id: "database", label: "Database", description: "Where your data lives." },
  { id: "auth", label: "Auth", description: "Sign-in, sessions, OAuth." },
  { id: "email", label: "Email", description: "Transactional and marketing email." },
  { id: "analytics", label: "Analytics", description: "Pageviews, events, funnels." },
  { id: "errors", label: "Error tracking", description: "Capture exceptions and traces." },
  { id: "storage", label: "Storage", description: "Files, blobs, uploads." },
  { id: "jobs", label: "Jobs & queues", description: "Background work and crons." },
  { id: "realtime", label: "Realtime", description: "WebSockets, broadcast, presence." },
  { id: "search", label: "Search", description: "Full-text and faceted search." },
  { id: "cdn", label: "CDN / DNS", description: "Edge cache, DNS, WAF." },
  { id: "ci", label: "CI / CD", description: "Build pipelines and deploys." },
  { id: "domain", label: "Domain", description: "Registrars worth using." },
  { id: "payments", label: "Payments", description: "Charge users — no monthly minimums." },
  { id: "ai", label: "AI / LLM", description: "Free or generous-tier inference APIs." },
  { id: "monitoring", label: "Uptime", description: "Heartbeat checks and alerting." },
];

export function getCategory(id: CategoryId): Category {
  const c = CATEGORIES.find((x) => x.id === id);
  if (!c) throw new Error(`Unknown category: ${id}`);
  return c;
}
