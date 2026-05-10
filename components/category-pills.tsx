"use client";

import Link from "next/link";
import { CATEGORIES, type CategoryId } from "@/data/categories";

interface CategoryPillsProps {
  active: CategoryId | "all";
  onChange?: (id: CategoryId | "all") => void;
}

interface PillItem {
  id: CategoryId | "all";
  label: string;
}

const ITEMS: PillItem[] = [
  { id: "all", label: "All" },
  ...CATEGORIES.map((c) => ({ id: c.id, label: c.label })),
];

export function CategoryPills({ active, onChange }: CategoryPillsProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter by category"
      className="-mx-5 flex gap-1.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:-mx-8 md:px-8"
    >
      {ITEMS.map((item) => {
        const isActive = item.id === active;
        const baseClass =
          "shrink-0 rounded-full px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-[var(--duration-fast)] focus-visible:outline-none";
        const stateClass = isActive
          ? "bg-ink text-cream"
          : "border border-rule text-ink-3 hover:border-rule-strong hover:text-ink";
        const className = `${baseClass} ${stateClass}`;

        if (onChange) {
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(item.id)}
              className={className}
            >
              {item.label}
            </button>
          );
        }

        const href =
          item.id === "all" ? "/services" : `/services?category=${item.id}`;
        return (
          <Link
            key={item.id}
            href={href}
            role="tab"
            aria-selected={isActive}
            aria-current={isActive ? "page" : undefined}
            className={className}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
