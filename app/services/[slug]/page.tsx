import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryPill } from "@/components/category-pill";
import { RatingDots } from "@/components/rating-dots";
import { ServiceCard } from "@/components/service-card";
import { SERVICES } from "@/data/services";
import { STACKS } from "@/data/stacks";
import { getAlternatives, getServiceBySlug } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
    <article className="mx-auto w-full max-w-[var(--container-wide)] px-5 pb-24 pt-12 md:px-8 md:pt-16">
      <Link
        href="/services"
        className="link-underline text-sm text-muted hover:text-ink"
      >
        <span aria-hidden>←</span> All services
      </Link>

      {/* Asymmetric header: title block left, meta column right. */}
      <header className="mt-10 grid gap-8 border-b border-rule pb-12 md:grid-cols-[1.6fr_1fr] md:gap-16">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <CategoryPill id={service.category} />
            {service.recommended && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-accent-ink">
                <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
                Top pick
              </span>
            )}
          </div>
          <h1 className="mt-5 font-display text-[length:var(--text-h1)] leading-[1.02]">
            {service.name}
          </h1>
          <p className="mt-5 max-w-[55ch] text-lg leading-relaxed text-ink-2">
            {service.tagline}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-transform duration-[var(--duration)] hover:-translate-y-[1px] active:translate-y-0"
            >
              Open {service.name}
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
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
                Generosity
              </dt>
              <dd className="mt-2 flex items-center gap-3">
                <RatingDots rating={service.rating} />
                <span className="font-mono text-sm text-ink-2">
                  {service.rating}/5
                </span>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
                Verified
              </dt>
              <dd className="mt-2 font-mono text-sm text-ink">
                {service.verifiedAt}
              </dd>
            </div>
            {service.also?.length ? (
              <div>
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
                  Also fits
                </dt>
                <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                  {service.also.map((c) => (
                    <CategoryPill key={c} id={c} />
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        </aside>
      </header>

      {/* Free tier — primary content block. No card chrome; left rule = elevation. */}
      <section className="mt-14 grid gap-12 md:grid-cols-[14ch_1fr]">
        <div className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-2">
          Free tier
        </div>
        <div>
          <p className="font-display text-2xl leading-snug text-ink md:text-3xl">
            {service.tier}
          </p>
          {service.notes?.length ? (
            <ul className="mt-8 space-y-4">
              {service.notes.map((n) => (
                <li
                  key={n}
                  className="flex gap-4 border-l-2 border-rule pl-5 text-base leading-relaxed text-ink-2"
                >
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      {alternatives.length > 0 && (
        <section className="mt-20 grid gap-12 md:grid-cols-[14ch_1fr]">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-2">
            Alternatives
          </div>
          <div>
            <h2 className="font-display text-2xl leading-tight">
              Drop-in alternatives
            </h2>
            <p className="mt-2 max-w-[55ch] text-sm text-muted">
              Solve a similar problem if you outgrow {service.name}'s free
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
        <section className="mt-20 grid gap-12 md:grid-cols-[14ch_1fr]">
          <div className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-2">
            Used in
          </div>
          <div>
            <h2 className="font-display text-2xl leading-tight">
              Curated stacks featuring {service.name}
            </h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {usedInStacks.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/stacks/${s.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-rule px-3 py-1 text-sm text-ink-2 transition-colors hover:border-rule-strong hover:text-ink"
                  >
                    <span aria-hidden className="font-mono text-muted-2">
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

      <p className="mt-20 border-t border-rule pt-6 text-xs text-muted">
        Last verified{" "}
        <span className="font-mono text-ink-2">{service.verifiedAt}</span> ·
        free-tier numbers shift — confirm at the pricing page before relying on
        a quota for a launch decision.
      </p>
    </article>
  );
}
