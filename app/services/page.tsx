import type { Metadata } from "next";
import { ServicesFilter } from "./services-filter";

export const metadata: Metadata = {
  title: "All services",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] px-5 pb-24 pt-14 md:px-8 md:pt-20">
      <header className="mb-10 max-w-[60ch]">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
          Catalog · Services
        </p>
        <h1 className="mt-4 text-[length:var(--text-h1)] font-bold leading-[1.1] tracking-[-0.02em] text-ink">
          Every free-tier service we&apos;ve vetted.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-2">
          Filter by what you need — hosting, database, auth, the rest. Each
          card surfaces the actual quota; the detail page lists the caveats.
        </p>
      </header>
      <ServicesFilter />
    </div>
  );
}
