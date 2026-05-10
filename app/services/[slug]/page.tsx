import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryPill } from "@/components/category-pill";
import { RecommendedBadge } from "@/components/recommended-badge";
import { ServiceCard } from "@/components/service-card";
import { ServiceLogo } from "@/components/service-logo";
import { SERVICES } from "@/data/services";
import { STACKS } from "@/data/stacks";
import { getAlternatives, getServiceBySlug } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Not found" };
  return {
    title: service.name,
    description: service.tagline,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const alternatives = getAlternatives(service);
  const usedInStacks = STACKS.filter((s) => s.services.includes(service.slug));

  return (
    <article className="mx-auto w-full max-w-[var(--container-wide)] px-5 pb-24 pt-10 md:px-8 md:pt-14">
      <Link
        href="/services"
        className="link-underline text-sm text-ink-3 hover:text-ink"
      >
        <span aria-hidden>←</span> All services
      </Link>

      {/* Product-Hunt-style hero: logo + name + tagline + CTAs, meta column right */}
      <header className="mt-8 grid gap-10 border-b border-rule pb-12 md:grid-cols-[1.7fr_1fr] md:gap-16">
        <div>
          <div className="flex items-start gap-5">
            <ServiceLogo name={service.name} size="lg" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <CategoryPill id={service.category} />
                {service.recommended && <RecommendedBadge />}
              </div>
              <h1 className="mt-3 text-[length:var(--text-h1)] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
                {service.name}
              </h1>
              <p className="mt-3 max-w-[55ch] text-base leading-relaxed text-ink-2 md:text-lg">
                {service.tagline}
              </p>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-[0.875rem] font-medium text-on-orange shadow-[var(--shadow-1)] transition-[background-color,transform] duration-[var(--duration)] hover:-translate-y-[1px] hover:bg-orange-deep active:translate-y-0"
            >
              Visit {service.name}
              <span aria-hidden>↗</span>
            </a>
            {service.pricingUrl && (
              <a
                href={service.pricingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm text-ink-2"
              >
                Verify on pricing page
              </a>
            )}
          </div>
        </div>

        <aside className="md:border-l md:border-rule md:pl-10">
          <dl className="space-y-5">
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
                Verified
              </dt>
              <dd className="mt-2 font-mono text-sm text-ink">
                {service.verifiedAt}
              </dd>
            </div>
            {service.also?.length ? (
              <div>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
                  Also fits
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {service.also.map((c) => (
                    <CategoryPill key={c} id={c} />
                  ))}
                </dd>
              </div>
            ) : null}
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
                Used in
              </dt>
              <dd className="mt-2 font-mono text-sm text-ink">
                {String(usedInStacks.length).padStart(2, "0")}{" "}
                <span className="text-ink-3">
                  {usedInStacks.length === 1 ? "stack" : "stacks"}
                </span>
              </dd>
            </div>
          </dl>
        </aside>
      </header>

      {/* Free tier — primary content block */}
      <section className="mt-12 grid gap-10 md:grid-cols-[14ch_1fr]">
        <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
          Free tier
        </div>
        <div>
          <p className="text-2xl font-bold leading-snug tracking-[-0.015em] text-ink md:text-[1.75rem]">
            {service.tier}
          </p>
          {service.notes?.length ? (
            <ul className="mt-7 space-y-4">
              {service.notes.map((n) => (
                <li
                  key={n}
                  className="border-l-2 border-rule pl-5 text-base leading-relaxed text-ink-2"
                >
                  {n}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {alternatives.length > 0 && (
        <section className="mt-16 grid gap-10 md:grid-cols-[14ch_1fr]">
          <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
            Alternatives
          </div>
          <div>
            <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] text-ink">
              Drop-in alternatives
            </h2>
            <p className="mt-2 max-w-[55ch] text-sm text-ink-3">
              Solve a similar problem if you outgrow {service.name}&apos;s free
              tier — or just want a second option in your back pocket.
            </p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {alternatives.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {usedInStacks.length > 0 && (
        <section className="mt-16 grid gap-10 md:grid-cols-[14ch_1fr]">
          <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
            Used in
          </div>
          <div>
            <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] text-ink">
              Curated stacks featuring {service.name}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {usedInStacks.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/stacks/${s.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-rule bg-surface px-3 py-1 text-sm text-ink-2 transition-colors hover:border-rule-strong hover:text-ink"
                  >
                    <span aria-hidden className="font-mono text-ink-3">
                      ↗
                    </span>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <p className="mt-16 border-t border-rule pt-6 text-xs text-ink-3">
        Last verified{" "}
        <span className="font-mono text-ink-2">{service.verifiedAt}</span> ·
        free-tier numbers shift — confirm at the pricing page before relying on
        a quota for a launch decision.
      </p>
    </article>
  );
}
