import Link from "next/link";
import type { Service } from "@/data/types";
import { CategoryPill } from "@/components/category-pill";
import { RatingDots } from "@/components/rating-dots";

interface ServiceCardProps {
  service: Service;
  /** Larger treatment for hero/featured slots — bigger title, longer tier copy. */
  featured?: boolean;
}

export function ServiceCard({ service, featured = false }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      aria-label={`${service.name} — ${service.tagline}`}
      className={`group relative flex flex-col gap-4 rounded-xl border border-rule bg-paper px-5 py-5 transition-[border-color,transform,box-shadow] duration-[var(--duration)] ease-[var(--ease-out-quart)] hover:-translate-y-[1px] hover:border-rule-strong hover:shadow-[var(--shadow-md)] active:translate-y-0 ${
        featured ? "md:px-7 md:py-7" : ""
      }`}
    >
      {service.recommended && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent-ink">
          <span aria-hidden className="h-1 w-1 rounded-full bg-accent" />
          Top pick
        </span>
      )}

      <div className="flex items-start justify-between gap-3 pr-20">
        <h3
          className={
            featured
              ? "font-display text-2xl leading-tight md:text-3xl"
              : "text-base font-medium tracking-tight text-ink"
          }
        >
          {service.name}
        </h3>
      </div>

      <p
        className={`text-muted ${
          featured ? "text-base leading-relaxed" : "line-clamp-2 text-sm leading-relaxed"
        }`}
      >
        {service.tagline}
      </p>

      <div className="mt-auto flex flex-col gap-3 border-t border-rule pt-3">
        <p className="font-mono text-xs leading-relaxed text-ink-2">
          {service.tier}
        </p>
        <div className="flex items-center justify-between gap-3">
          <CategoryPill id={service.category} />
          <RatingDots rating={service.rating} />
        </div>
      </div>
    </Link>
  );
}
