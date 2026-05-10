import type { Metadata } from "next";
import { ServiceCard } from "@/components/service-card";
import { CategoryPills } from "@/components/category-pills";
import { CATEGORIES, type CategoryId } from "@/data/categories";
import { SERVICES } from "@/data/services";

export const metadata: Metadata = {
  title: "All services",
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

function isCategoryId(value: string | undefined): value is CategoryId {
  return !!value && CATEGORIES.some((c) => c.id === value);
}

export default async function ServicesPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const active: CategoryId | "all" = isCategoryId(category) ? category : "all";

  const filtered = active === "all"
    ? SERVICES
    : SERVICES.filter((s) => s.category === active || s.also?.includes(active));

  // Sort: recommended first, then by rating desc, then name
  const sorted = [...filtered].sort((a, b) => {
    if (a.recommended !== b.recommended) return a.recommended ? -1 : 1;
    if (a.rating !== b.rating) return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Services</h1>
        <p className="mt-2 text-foreground/70">
          {filtered.length} of {SERVICES.length} services
          {active !== "all" ? ` · filtered by ${CATEGORIES.find((c) => c.id === active)?.label}` : ""}
        </p>
      </header>

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
    </div>
  );
}
