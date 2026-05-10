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

  const activeLabel =
    active === "all"
      ? "Everything"
      : (CATEGORIES.find((c) => c.id === active)?.label ?? "Everything");

  return (
    <>
      <div className="sticky top-16 z-30 -mx-5 border-y border-rule bg-[color-mix(in_oklab,var(--cream)_88%,transparent)] px-5 py-4 backdrop-blur md:-mx-8 md:px-8">
        <CategoryPills active={active} />
      </div>

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-rule pb-4">
        <p className="text-2xl font-bold leading-none tracking-[-0.015em] text-ink">
          {activeLabel}
        </p>
        <p className="font-mono text-xs text-ink-3">
          {String(sorted.length).padStart(2, "0")}
          <span className="text-ink-3/70">
            {" "}
            / {String(SERVICES.length).padStart(2, "0")}
          </span>{" "}
          shown
        </p>
      </div>

      {sorted.length === 0 ? (
        <div className="mt-12 rounded-xl border border-dashed border-rule-strong bg-surface p-10 text-center">
          <p className="text-2xl font-semibold leading-tight text-ink-2">
            No services in this slice yet.
          </p>
          <p className="mx-auto mt-2 max-w-[40ch] text-sm text-ink-3">
            Try a neighbouring category, or open a PR if you know a free-tier
            option that should be listed here.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
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
        <div className="space-y-4">
          <div className="h-10 w-full animate-pulse rounded-md bg-surface-2" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-44 animate-pulse rounded-xl border border-rule bg-surface-2"
              />
            ))}
          </div>
        </div>
      }
    >
      <FilteredList />
    </Suspense>
  );
}
