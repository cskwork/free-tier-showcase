import type { Metadata } from "next";
import { ServicesFilter } from "./services-filter";

export const metadata: Metadata = {
  title: "All services",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Services</h1>
        <p className="mt-2 text-foreground/70">
          Browse free-tier services. Use the category pills to filter.
        </p>
      </header>
      <ServicesFilter />
    </div>
  );
}
