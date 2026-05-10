"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ServiceCard } from "@/components/service-card";
import { CategoryPills } from "@/components/category-pills";
import { CATEGORIES, type CategoryId } from "@/data/categories";
import { SERVICES } from "@/data/services";

function isCategoryId(value: string | null): value is CategoryId {
  return !!value && CATEGORIES.some((c) => c.id === value);
}

function FilteredList() {
  const params = useSearchParams();
  const raw = params.get("category");
  const active: CategoryId | "all" = isCategoryId(raw) ? raw : "all";

  const sorted = useMemo(() => {
    const filtered =
      active === "all"
        ? SERVICES
        : SERVICES.filter(
            (s) => s.category === active || s.also?.includes(active),
          );
    return [...filtered].sort((a, b) => {
      if (a.recommended !== b.recommended) return a.recommended ? -1 : 1;
      if (a.rating !== b.rating) return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });
  }, [active]);

  return (
    <>
      <div className="mb-6 flex items-center justify-between text-sm text-foreground/60">
        <span>
          {sorted.length} of {SERVICES.length} services
          {active !== "all"
            ? ` · ${CATEGORIES.find((c) => c.id === active)?.label}`
            : ""}
        </span>
      </div>

      <div className="mb-8">
        <CategoryPills active={active} />
      </div>

      {sorted.length === 0 ? (
        <p className="text-foreground/60">No services match this filter.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      )}
    </>
  );
}

export function ServicesFilter() {
  return (
    <Suspense
      fallback={
        <div className="text-sm text-foreground/50">Loading filter…</div>
      }
    >
      <FilteredList />
    </Suspense>
  );
}
