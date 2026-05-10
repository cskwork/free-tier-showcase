import type { Metadata } from "next";
import { CATEGORIES } from "@/data/categories";
import { SERVICES } from "@/data/services";
import { STACKS } from "@/data/stacks";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <article className="mx-auto w-full max-w-[var(--container-wide)] px-5 pb-24 pt-16 md:px-8 md:pt-24">
      <header className="grid gap-10 border-b border-rule pb-14 md:grid-cols-[1.6fr_1fr] md:gap-16">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-2">
            About
          </p>
          <h1 className="mt-4 font-display text-[length:var(--text-h1)] leading-[1.02]">
            A directory of services with{" "}
            <span className="italic">honest</span> free tiers.
          </h1>
          <p className="mt-5 max-w-[55ch] text-lg leading-relaxed text-ink-2">
            Generous enough to ship a real product on, not just demo it.{" "}
            <span className="font-mono text-ink">{SERVICES.length}</span>{" "}
            services across{" "}
            <span className="font-mono text-ink">{CATEGORIES.length}</span>{" "}
            categories, plus{" "}
            <span className="font-mono text-ink">{STACKS.length}</span>{" "}
            curated stacks for common use cases.
          </p>
        </div>
        <aside className="md:border-l md:border-rule md:pl-10">
          <dl className="grid grid-cols-2 gap-y-5">
            <div>
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
                Services
              </dt>
              <dd className="mt-2 font-display text-3xl leading-none">
                {SERVICES.length}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
                Categories
              </dt>
              <dd className="mt-2 font-display text-3xl leading-none">
                {CATEGORIES.length}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
                Stacks
              </dt>
              <dd className="mt-2 font-display text-3xl leading-none">
                {STACKS.length}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
                Verified
              </dt>
              <dd className="mt-2 font-mono text-base text-ink">2026-05</dd>
            </div>
          </dl>
        </aside>
      </header>

      <section className="mt-14 grid gap-12 md:grid-cols-[14ch_1fr]">
        <div className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-2">
          What's in
        </div>
        <div>
          <h2 className="font-display text-2xl leading-tight">
            Inclusion criteria
          </h2>
          <ul className="mt-5 space-y-4">
            {[
              "The free tier must be production-viable, not just a 14-day trial.",
              "The pricing page is reachable and lists the free tier explicitly.",
              "We've checked the numbers within the verification window (currently 2026-05).",
              "Services that used to be free but no longer are (e.g. PlanetScale) are kept in the listing with a low rating, so you don't accidentally rediscover them.",
            ].map((item) => (
              <li
                key={item}
                className="border-l-2 border-rule pl-5 text-base leading-relaxed text-ink-2"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-20 grid gap-12 md:grid-cols-[14ch_1fr]">
        <div className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-2">
          What's out
        </div>
        <div>
          <h2 className="font-display text-2xl leading-tight">
            What we don't do
          </h2>
          <dl className="mt-5 space-y-5">
            <div>
              <dt className="font-medium text-ink">No affiliate links.</dt>
              <dd className="mt-1 text-base leading-relaxed text-ink-2">
                Every outbound link is the bare canonical URL.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-ink">No tier guesses.</dt>
              <dd className="mt-1 text-base leading-relaxed text-ink-2">
                If we're unsure of a number we use a hedge phrase rather than
                a fake digit.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-ink">No personal data.</dt>
              <dd className="mt-1 text-base leading-relaxed text-ink-2">
                The site has no auth and no analytics that track individuals.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-20 grid gap-12 md:grid-cols-[14ch_1fr]">
        <div className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-2">
          Contributing
        </div>
        <div>
          <h2 className="font-display text-2xl leading-tight">
            Open a PR.
          </h2>
          <p className="mt-3 max-w-[55ch] text-base leading-relaxed text-ink-2">
            The catalog lives in{" "}
            <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
              data/services.ts
            </code>{" "}
            and{" "}
            <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
              data/stacks.ts
            </code>
            . Both files are typed against{" "}
            <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-[0.85em] text-ink">
              data/types.ts
            </code>{" "}
            so TypeScript will tell you if a field is missing.
          </p>
        </div>
      </section>

      <p className="mt-20 border-t border-rule pt-6 text-xs text-muted">
        Numbers verified <span className="font-mono text-ink-2">2026-05</span>.
        Pricing changes — confirm via the linked pricing page before relying on
        a number for a launch decision.
      </p>
    </article>
  );
}
