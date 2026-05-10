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
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/services"
        className="text-sm text-foreground/60 underline-offset-4 hover:underline"
      >
        ← All services
      </Link>

      <header className="mt-6 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{service.name}</h1>
          {service.recommended && (
            <span
              aria-label="Top pick"
              className="rounded-full bg-foreground/10 px-2 py-0.5 text-xs"
            >
              ⭐ top pick
            </span>
          )}
        </div>
        <p className="text-lg text-foreground/70">{service.tagline}</p>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <CategoryPill id={service.category} />
          {service.also?.map((c) => <CategoryPill key={c} id={c} />)}
          <RatingDots rating={service.rating} />
        </div>
      </header>

      <section className="mt-8 rounded-xl border border-foreground/15 p-5">
        <div className="text-xs uppercase tracking-wide text-foreground/50">Free tier</div>
        <p className="mt-2 text-foreground">{service.tier}</p>
        {service.notes?.length ? (
          <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-foreground/70">
            {service.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        ) : null}
      </section>

      <section className="mt-6 flex flex-wrap gap-3">
        <a
          href={service.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-foreground px-4 py-2 text-background hover:opacity-90 focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:outline-none"
        >
          Open {service.name} ↗
        </a>
        {service.pricingUrl && (
          <a
            href={service.pricingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-foreground/20 px-4 py-2 hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:outline-none"
          >
            Pricing page ↗
          </a>
        )}
      </section>

      {alternatives.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Drop-in alternatives</h2>
          <p className="mt-1 text-sm text-foreground/60">
            Services that solve a similar problem if you outgrow {service.name}'s free tier.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {alternatives.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </section>
      )}

      {usedInStacks.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold tracking-tight">Used in these stacks</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {usedInStacks.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/stacks/${s.slug}`}
                  className="rounded-md border border-foreground/15 px-3 py-1 text-sm hover:bg-foreground/5"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="mt-12 text-xs text-foreground/40">
        Last verified {service.verifiedAt} · numbers change — confirm at the pricing page before
        committing.
      </p>
    </article>
  );
}
