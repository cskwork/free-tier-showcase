import Link from "next/link";
import type { Stack } from "@/data/types";

interface StackCardProps {
  stack: Stack;
}

export function StackCard({ stack }: StackCardProps) {
  return (
    <Link
      href={`/stacks/${stack.slug}`}
      aria-label={`${stack.name} — ${stack.tagline}`}
      className="group flex flex-col gap-3 rounded-xl border border-foreground/15 p-5 transition-colors hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium">{stack.name}</h3>
        <span className="shrink-0 rounded-md bg-foreground/5 px-2 py-0.5 text-xs font-medium text-foreground">
          {stack.costEstimate}
        </span>
      </div>

      <p className="text-sm text-foreground/70">{stack.tagline}</p>

      <div className="flex flex-wrap gap-1.5">
        {stack.services.map((slug) => (
          <span
            key={slug}
            className="inline-flex items-center rounded-md border border-foreground/15 px-2 py-0.5 text-xs text-foreground/70"
          >
            {slug}
          </span>
        ))}
      </div>
    </Link>
  );
}
