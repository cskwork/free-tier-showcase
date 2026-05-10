import Link from "next/link";
import type { Service } from "@/data/types";
import { CategoryPill } from "@/components/category-pill";
import { RecommendedBadge } from "@/components/recommended-badge";
import { ServiceLogo } from "@/components/service-logo";

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
      className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-rule bg-surface px-5 py-5 transition-[transform,border-color,box-shadow] duration-[var(--duration)] ease-[var(--ease-out-quart)] hover:-translate-y-[1px] hover:border-rule-strong hover:shadow-[var(--shadow-2)] active:translate-y-0 ${
        featured ? "md:px-7 md:py-7" : ""
      } ${service.recommended && featured ? "featured-tint" : ""}`}
    >
      {service.recommended && (
        <span className="absolute right-4 top-4">
          <RecommendedBadge size={featured ? "default" : "compact"} />
        </span>
      )}

      <div
        className={`flex items-start gap-4 ${
          service.recommended ? "pr-24" : ""
        }`}
      >
        <ServiceLogo name={service.name} size={featured ? "lg" : "md"} />
        <div className="min-w-0 flex-1">
          <h3
            className={
              featured
                ? "text-xl font-bold tracking-[-0.015em] text-ink md:text-2xl"
                : "text-base font-semibold tracking-[-0.01em] text-ink"
            }
          >
            {service.name}
          </h3>
          <p
            className={`mt-1.5 text-ink-2 ${
              featured
                ? "text-base leading-relaxed"
                : "line-clamp-2 text-sm leading-relaxed"
            }`}
          >
            {service.tagline}
          </p>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-3 border-t border-rule pt-4">
        <p className="font-mono text-[0.8125rem] leading-relaxed text-ink">
          {service.tier}
        </p>
        <div className="flex items-center justify-between gap-3">
          <CategoryPill id={service.category} />
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink-3">
            {service.verifiedAt}
          </span>
        </div>
      </div>
    </Link>
  );
}
