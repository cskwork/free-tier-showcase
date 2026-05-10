# free-tier-showcase

A curated directory of free-tier services for indie developers and personal projects. Browse services by category, see opinionated stacks for common use cases, and verify each tier against the canonical pricing page.

The site itself runs on its own free-tier stack: **Next.js 15 + Tailwind v4**, deployable to Vercel, Cloudflare Pages, or Netlify. No backend, no DB, no auth — just typed data and static pages.

## Quick start

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # static-friendly Next.js build
```

## Project layout

```
app/
  page.tsx                    homepage — hero + top picks + featured stacks + categories
  services/
    page.tsx                  full directory, filterable by ?category=
    [slug]/page.tsx           service detail (uses generateStaticParams)
  stacks/
    page.tsx                  curated stacks index
    [slug]/page.tsx           stack detail — lists services in order
  about/page.tsx
  layout.tsx                  Header + Footer wrapper
  globals.css                 Tailwind v4 + CSS vars
components/
  header.tsx, footer.tsx
  service-card.tsx, stack-card.tsx
  category-pill.tsx, category-pills.tsx, rating-dots.tsx
data/
  types.ts                    Service + Stack TypeScript interfaces
  categories.ts               16 category definitions
  services.ts                 the catalog (74 entries as of 2026-05)
  stacks.ts                   curated stacks (7 as of 2026-05)
lib/
  data.ts                     getServiceBySlug, getServicesInStack, etc.
scripts/
  cleanup-template-leftovers.sh   one-shot pruner from the original starter template
```

## Editing the catalog

Both data files are typed against `data/types.ts` — TypeScript will tell you if a field is missing or mistyped.

```ts
// data/services.ts — add a new service
{
  slug: "uploadthing",
  name: "UploadThing",
  tagline: "Drop-in file uploads for Next.js with no config.",
  category: "storage",
  tier: "2 GB storage, 2 GB monthly transfer",
  notes: ["Built for Next.js, awkward outside of it."],
  url: "https://uploadthing.com",
  pricingUrl: "https://uploadthing.com/pricing",
  alternativeTo: ["supabase-storage", "cloudflare-r2"],
  rating: 4,
  verifiedAt: "2026-05",
}
```

After editing, run `pnpm typecheck && pnpm build` — that's the entire QA loop.

## Inclusion criteria

A service makes the cut if:

1. The free tier is **production-viable**, not just a 14-day trial.
2. The pricing page lists the free tier explicitly.
3. We've checked the numbers within the verification window (currently 2026-05).

Services that **used** to be free but no longer are (PlanetScale, Heroku, etc.) stay in the catalog with a low rating and a `notes` line — so visitors don't accidentally rediscover them as free.

## Deploying

The build is fully static after `generateStaticParams` runs for every `[slug]` route. Pick one:

- **Vercel** — `vercel deploy`. Auto-detects Next.js. Free Hobby tier.
- **Cloudflare Pages** — connect the repo, build cmd `pnpm build`, output `.next/`. Use `@cloudflare/next-on-pages`.
- **Netlify** — same as Vercel, free starter tier.
- **GitHub Pages** — would need to switch to `output: 'export'` in `next.config.ts` first.

Set `NEXT_PUBLIC_APP_URL` in the deploy env if you want canonical URLs in metadata; otherwise the build works without any env vars.

## Cleanup history

This repo started as an auth-enabled SaaS starter (Supabase + Resend + Sentry + PostHog) before pivoting into a showcase site. The pruning script at `scripts/cleanup-template-leftovers.sh` documents what was removed; it's idempotent and safe to delete once you trust the repo is clean.

## License

MIT — see `LICENSE`.
