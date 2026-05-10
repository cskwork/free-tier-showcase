import type { Metadata } from "next";
import { CATEGORIES } from "@/data/categories";
import { SERVICES } from "@/data/services";
import { STACKS } from "@/data/stacks";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold tracking-tight">About</h1>

      <p className="mt-4 text-foreground/80">
        This site is a curated directory of services that have meaningful free tiers — generous
        enough to ship a real product on, not just demo it. {SERVICES.length} services across{" "}
        {CATEGORIES.length} categories, plus {STACKS.length} curated stacks for common use cases.
      </p>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Inclusion criteria</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground/80">
        <li>The free tier must be production-viable, not just a 14-day trial.</li>
        <li>The pricing page is reachable and lists the free tier explicitly.</li>
        <li>We've checked the numbers within the verification window (currently 2026-05).</li>
        <li>
          Services that <em>used</em> to be free but no longer are (e.g. PlanetScale) are kept in
          the listing with a low rating, so you don't accidentally rediscover them.
        </li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">What we don't do</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-foreground/80">
        <li>
          <strong>No affiliate links.</strong> Every outbound link is the bare canonical URL.
        </li>
        <li>
          <strong>No "tier" guesses.</strong> If we're unsure of a number, we use a hedge phrase
          rather than a fake digit.
        </li>
        <li>
          <strong>No personal data.</strong> The site has no auth and no analytics that track
          individuals.
        </li>
      </ul>

      <h2 className="mt-10 text-xl font-semibold tracking-tight">Contributing</h2>
      <p className="mt-3 text-foreground/80">
        The catalog lives in{" "}
        <code className="rounded bg-foreground/10 px-1 py-0.5 text-sm">data/services.ts</code> and{" "}
        <code className="rounded bg-foreground/10 px-1 py-0.5 text-sm">data/stacks.ts</code>. Open
        a PR with additions or corrections — both files are typed against{" "}
        <code className="rounded bg-foreground/10 px-1 py-0.5 text-sm">data/types.ts</code> so
        TypeScript will tell you if a field is missing.
      </p>

      <p className="mt-10 text-xs text-foreground/40">
        Numbers verified 2026-05. Pricing changes — confirm via the linked pricing page before
        relying on a number for a launch decision.
      </p>
    </article>
  );
}
