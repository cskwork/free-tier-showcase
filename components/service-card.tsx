import Link from "next/link";
import type { Service } from "@/data/types";
import { CategoryPill } from "@/components/category-pill";
import { RatingDots } from "@/components/rating-dots";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      aria-label={`${service.name} — ${service.tagline}`}
      className="group flex flex-col gap-3 rounded-xl border border-foreground/15 p-5 transition-colors hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium">
          {service.name}
          {service.recommended && (
            <span
              aria-label="Recommended"
              className="ml-1.5 text-sm"
            >
              ⭐
            </span>
          )}
        </h3>
        <RatingDots rating={service.rating} />
      </div>

      <p className="line-clamp-1 text-sm text-foreground/70">
        {service.tagline}
      </p>

      <div className="flex items-center gap-2">
        <CategoryPill id={service.category} />
      </div>

      <p className="text-sm text-foreground/70">{service.tier}</p>
    </Link>
  );
}
