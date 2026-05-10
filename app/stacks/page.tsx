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
    <div className="mx-auto w-full max-w-[var(--container-wide)] px-5 pb-24 pt-16 md:px-8 md:pt-24">
      <header className="mb-14 max-w-[60ch]">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-2">
          Catalog · Stacks
        </p>
        <h1 className="mt-4 font-display text-[length:var(--text-h1)] leading-[1.05]">
          End-to-end at <span className="italic text-accent-ink">$0/mo</span>.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-2">
          Pre-wired combinations that work together on free tiers. Each stack
          is opinionated — pick the closest match and swap individual services
          later.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {STACKS.map((stack, i) => (
          <StackCard key={stack.slug} stack={stack} index={i} />
        ))}
      </div>
    </div>
  );
}
