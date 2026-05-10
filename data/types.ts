import type { CategoryId } from "./categories";

/**
 * One free-tier service entry. Keep `tier` as a single human-readable line
 * (it's what users scan first); use `notes` for nuance.
 */
export interface Service {
  /** URL-safe identifier — also the route segment under /services/[slug]. */
  slug: string;
  /** Display name. */
  name: string;
  /** One sentence: what it does. */
  tagline: string;
  /** Primary category. A service can fit multiple — list extras in `also`. */
  category: CategoryId;
  also?: CategoryId[];
  /** Single human-readable line summarizing the free tier. */
  tier: string;
  /** Bullet caveats: paused-after-N-days, cold starts, fair-use clauses, etc. */
  notes?: string[];
  /** Where the user goes to start. */
  url: string;
  /** Where the pricing page lives (so users can verify our `tier` claim). */
  pricingUrl?: string;
  /** Slugs of services this is a credible drop-in replacement for. */
  alternativeTo?: string[];
  /** Subjective score 1-5: how generous the free tier feels in practice. */
  rating: 1 | 2 | 3 | 4 | 5;
  /** Marks ⭐ entries — what we'd reach for first. */
  recommended?: boolean;
  /** Last time we re-checked the free-tier numbers (YYYY-MM). */
  verifiedAt: string;
}

/**
 * A curated combination of services for a specific use case (e.g. "Indie SaaS",
 * "Static blog"). The point of a stack is to remove decisions, not list every
 * possible option — keep each stack opinionated.
 */
export interface Stack {
  slug: string;
  name: string;
  /** One sentence: who is this stack for? */
  tagline: string;
  /** 1-2 paragraph explanation of the choices and trade-offs. */
  description: string;
  /** Service slugs in the order they should be set up. */
  services: string[];
  /** Estimated total monthly cost on free tiers (usually $0, sometimes domain only). */
  costEstimate: string;
  /** Concrete usage ceiling before any service flips to paid. */
  ceiling: string;
}
