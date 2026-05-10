import type { Metadata } from "next";
import { ServicesFilter } from "./services-filter";

export const metadata: Metadata = {
  title: "All services",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-[var(--container-wide)] px-5 pb-24 pt-16 md:px-8 md:pt-24">
      <header className="mb-12 max-w-[60ch]">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-2">
          Catalog · Services
        </p>
        <h1 className="mt-4 font-display text-[length:var(--text-h1)] leading-[1.05]">
          Every free-tier service we've vetted.
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
