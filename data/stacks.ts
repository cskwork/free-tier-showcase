import type { Stack } from "./types";

/**
 * Curated, opinionated combinations of free-tier services. Each stack solves
 * an end-to-end use case at $0/mo (occasionally plus a domain). The goal is
 * to remove decisions — not enumerate every option.
 */
export const STACKS: Stack[] = [
  {
    slug: "indie-saas",
    name: "Indie SaaS",
    tagline: "Ship a paid product alone, on weekends, without paying for infrastructure until you have customers.",
    description:
      "This is the classic solo-founder bundle: Vercel hosts a Next.js app, Supabase handles Postgres + auth in one box, Resend sends transactional email, PostHog covers product analytics + session replay, Sentry catches errors, and Stripe takes the money. Every piece has a generous free tier that scales with paid usage rather than time, so you only pay once revenue justifies it.\n\nThe trade-off vs. a 'serious' stack (Render + Auth0 + SendGrid + Mixpanel + Datadog) is that you're consolidating auth + DB into one vendor (Supabase) and accepting Vercel's bandwidth ceiling instead of running your own container. For a pre-PMF SaaS that's the right call — you trade theoretical portability for one less thing to operate.",
    services: ["vercel", "supabase", "resend", "posthog", "sentry", "stripe"],
    costEstimate: "$0/mo + ~$10/yr domain",
    ceiling:
      "Resend's 3,000 emails/mo (100/day) usually hits first for a transactional product — paid signup confirmations + receipts add up faster than Vercel bandwidth or Supabase's 500 MB DB.",
  },
  {
    slug: "static-blog",
    name: "Static Blog / Docs",
    tagline: "A personal blog, changelog, or docs site that costs nothing and survives a front-page Hacker News hit.",
    description:
      "Pure static output (Astro, Hugo, MkDocs, or plain HTML) deployed to Cloudflare Pages, with Cloudflare Web Analytics for traffic numbers. No database, no server, no cold starts — just files on a CDN.\n\nThe trade-off vs. Vercel/Netlify is that Cloudflare Pages has unlimited bandwidth on the free tier where Vercel caps at 100 GB/mo. The trade-off vs. GitHub Pages is that Cloudflare gives you preview deployments, custom headers, and Workers integration if you ever outgrow 'pure static'. Cloudflare Web Analytics is cookieless and privacy-friendly, so you skip the GDPR banner.",
    services: ["cloudflare-pages", "cloudflare-web-analytics", "github-pages"],
    costEstimate: "$0/mo + ~$10/yr domain",
    ceiling:
      "Cloudflare Pages allows 500 builds/month on the free tier — that's the first wall you hit if you commit aggressively. Bandwidth is effectively unlimited for personal-blog traffic.",
  },
  {
    slug: "ai-side-project",
    name: "AI Side Project",
    tagline: "An LLM-backed weekend project (chatbot, summarizer, agent) you can hand to friends without a credit card.",
    description:
      "Vercel hosts the Next.js frontend and API routes, Supabase stores users + chat history + vector embeddings (pgvector is built in), Groq serves Llama-class models at ~500 tok/sec for free, and PostHog tells you which prompts people actually use. Cloudflare Workers AI is listed as a swap-in for Groq if you want serverless inference closer to the edge.\n\nThe trade-off vs. an OpenAI-only stack is latency vs. cost: Groq is free and fast but model selection is narrower. The trade-off vs. running on Modal/Replicate is that you're stuck with whatever models the provider hosts — you can't bring your own fine-tune. For a side project that's a good deal: $0 inference is worth way more than custom weights.",
    services: ["vercel", "supabase", "groq", "cloudflare-workers-ai", "posthog"],
    costEstimate: "$0/mo + ~$10/yr domain",
    ceiling:
      "Groq's free tier rate-limits per minute (typically ~30 req/min on the larger models) — a viral demo will hit that long before Vercel function invocations or Supabase storage become an issue.",
  },
  {
    slug: "internal-tool",
    name: "Internal Tool / Dashboard",
    tagline: "A small admin panel, ops dashboard, or back-office tool for a team of 5-50 people.",
    description:
      "Vercel for the Next.js frontend, Neon for serverless Postgres (scale-to-zero so it costs nothing when nobody's logged in at 2am), and Clerk for auth with SSO + organizations baked in. Supabase is listed as the all-in-one alternative if you'd rather have one vendor for DB + auth.\n\nThe trade-off vs. Retool/Appsmith is you're writing real code instead of dragging components — slower for the first dashboard, but every subsequent one is free and the UX isn't bound to their component library. Picking Clerk over Supabase Auth specifically buys you orgs/teams + SSO without writing it yourself, which matters for B2B internal tools where 'who can see what' is half the work.",
    services: ["vercel", "neon", "clerk", "supabase"],
    costEstimate: "$0/mo + ~$10/yr domain",
    ceiling:
      "Clerk's free tier caps at 10,000 monthly active users — far beyond any internal tool. Neon's 0.5 GB storage will hit first if you start logging events into Postgres instead of using a proper analytics service.",
  },
  {
    slug: "mobile-api-backend",
    name: "Mobile-API Backend",
    tagline: "A Postgres + auth + email backend for a native iOS/Android app, with no server to operate.",
    description:
      "Supabase is the core: Postgres + Row-Level Security + auth + storage + realtime, all behind a REST/GraphQL API the mobile client can call directly. Vercel (or Cloudflare Workers) hosts any custom edge functions you need beyond what Supabase exposes — webhook receivers, third-party API proxies, push-notification fan-out. Resend handles transactional email (verification, password reset, receipts).\n\nThe trade-off vs. Firebase is that you get real Postgres instead of Firestore — joins, transactions, SQL — at the cost of a slightly less polished mobile SDK. The trade-off vs. rolling your own on Fly.io is everything: you skip writing auth, skip writing the API layer, skip ops. For a mobile app where the backend is a means to an end, this is the lowest-overhead path that doesn't lock you into a NoSQL document model.",
    services: ["supabase", "vercel", "cloudflare-workers-ai", "resend"],
    costEstimate: "$0/mo + ~$10/yr domain",
    ceiling:
      "Supabase pauses the project after 7 days of inactivity on free tier, and the 500 MB database fills up around 50k-100k user rows with typical metadata — that's the first real wall, well before Resend or Vercel limits.",
  },
  {
    slug: "marketing-waitlist",
    name: "Marketing Site + Waitlist",
    tagline: "A landing page that captures emails for a not-yet-launched product and tells you who's actually interested.",
    description:
      "Cloudflare Pages serves a static landing page (unlimited bandwidth, so a launch-day spike doesn't cost anything), Loops handles the waitlist signups + drip emails (purpose-built for this — much nicer than wiring Resend + your own templates), and Plausible gives you privacy-friendly traffic numbers without a cookie banner. Resend is listed as the alternative if you'd rather own the email templates yourself; Cloudflare Web Analytics as the alternative to Plausible if you want zero-config.\n\nThe trade-off vs. ConvertKit/Mailchimp is that Loops is free up to 1,000 contacts where the others charge from contact #1, and Loops's editor is built around product launches specifically. The trade-off vs. Google Analytics is regulatory: Plausible is GDPR-compliant out of the box and you skip the cookie consent dance.",
    services: ["cloudflare-pages", "loops", "plausible", "resend", "cloudflare-web-analytics"],
    costEstimate: "$0/mo + ~$10/yr domain",
    ceiling:
      "Loops's 1,000-contact free tier is the binding constraint — a successful launch hits that fast. Plausible's free tier is self-hosted only; if you want hosted, you'd swap to Cloudflare Web Analytics here.",
  },
  {
    slug: "personal-portfolio",
    name: "Personal Portfolio",
    tagline: "A portfolio site with a contact form, hosted forever for the price of a domain.",
    description:
      "Cloudflare Pages or GitHub Pages hosts the static site. Resend powers the contact form (3,000 emails/mo is more than any portfolio will ever use). Cloudflare Web Analytics tells you which projects people actually click on, without cookies.\n\nThe trade-off vs. a full Next.js + Vercel setup is that you give up server-side rendering and API routes — but for a portfolio you don't need them. Static + a single email-sending edge function (or Resend's REST API called directly from the form) is all the dynamism a portfolio needs.",
    services: ["cloudflare-pages", "github-pages", "resend", "cloudflare-web-analytics"],
    costEstimate: "$0/mo + ~$10/yr domain",
    ceiling:
      "Resend's 100 emails/day rate limit is the first real ceiling — and you'd need to be unusually popular to hit it from a portfolio contact form.",
  },
];
