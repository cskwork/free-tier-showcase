import Link from "next/link";
import type { Stack } from "@/data/types";
import { getServiceBySlug } from "@/lib/data";

interface StackCardProps {
  stack: Stack;
  index?: number;
}

export function StackCard({ stack, index }: StackCardProps) {
  const names = stack.services
    .map((slug) => getServiceBySlug(slug)?.name ?? slug)
    .slice(0, 5);
  const remainder = stack.services.length - names.length;

  return (
    <Link
      href={`/stacks/${stack.slug}`}
      aria-label={`${stack.name} — ${stack.tagline}`}
      className="group relative flex h-full flex-col gap-4 rounded-xl border border-rule bg-surface p-6 transition-[transform,border-color,box-shadow] duration-[var(--duration)] ease-[var(--ease-out-quart)] hover:-translate-y-[1px] hover:border-rule-strong hover:shadow-[var(--shadow-2)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-baseline gap-3">
          {typeof index === "number" && (
            <span
              aria-hidden
              className="font-mono text-[0.6875rem] tracking-[0.18em] text-ink-3"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
          <h3 className="text-xl font-bold tracking-[-0.01em] text-ink">
            {stack.name}
          </h3>
        </div>
        <span className="shrink-0 rounded-full border border-rule px-2.5 py-0.5 font-mono text-[0.6875rem] text-ink-2">
          {stack.costEstimate}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-ink-2">{stack.tagline}</p>

      <div className="mt-auto flex flex-wrap gap-1.5 border-t border-rule pt-4">
        {names.map((name) => (
          <span
            key={name}
            className="inline-flex items-center rounded-full bg-surface-2 px-2 py-0.5 text-[0.6875rem] font-medium text-ink-2"
          >
            {name}
          </span>
        ))}
        {remainder > 0 && (
          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[0.6875rem] font-medium text-ink-3">
            +{remainder} more
          </span>
        )}
      </div>
    </Link>
  );
}
