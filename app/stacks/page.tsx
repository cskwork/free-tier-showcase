import type { Metadata } from "next";
import { StackCard } from "@/components/stack-card";
import { STACKS } from "@/data/stacks";

export const metadata: Metadata = {
  title: "Curated stacks",
  description:
    "Opinionated combinations of free-tier services for indie SaaS, static blogs, AI side projects, and more.",
};

export default function StacksPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Curated stacks</h1>
        <p className="mt-2 max-w-2xl text-foreground/70">
          End-to-end combinations that work together at $0/mo. Each stack is opinionated — pick the
          one closest to your use case and swap individual services later.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STACKS.map((stack) => (
          <StackCard key={stack.slug} stack={stack} />
        ))}
      </div>
    </div>
  );
}
