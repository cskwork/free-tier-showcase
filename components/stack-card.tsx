import Link from "next/link";
import type { Stack } from "@/data/types";

interface StackCardProps {
  stack: Stack;
  index?: number;
}

export function StackCard({ stack, index }: StackCardProps) {
  return (
    <Link
      href={`/stacks/${stack.slug}`}
      aria-label={`${stack.name} — ${stack.tagline}`}
      className="group relative flex flex-col gap-4 rounded-xl border border-rule bg-paper p-6 transition-[border-color,transform,box-shadow] duration-[var(--duration)] ease-[var(--ease-out-quart)] hover:-translate-y-[1px] hover:border-rule-strong hover:shadow-[var(--shadow-md)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-baseline gap-3">
          {typeof index === "number" && (
            <span
              aria-hidden
              className="font-mono text-[0.7rem] tracking-[0.18em] text-muted-2"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <h3 className="font-display text-2xl leading-tight">{stack.name}</h3>
        </div>
        <span className="shrink-0 rounded-full border border-rule px-2.5 py-0.5 font-mono text-[0.7rem] tracking-tight text-ink-2">
          {stack.costEstimate}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-muted">{stack.tagline}</p>

      <div className="mt-auto flex flex-wrap gap-1.5 border-t border-rule pt-4">
        {stack.services.map((slug) => (
          <span
            key={slug}
            className="inline-flex items-center rounded-md bg-paper-2 px-2 py-0.5 font-mono text-[0.7rem] tracking-tight text-ink-2"
          >
            {slug}
          </span>
        ))}
      </div>
    </Link>
  );
}
