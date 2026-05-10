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
    <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {ITEMS.map((item) => {
        const isActive = item.id === active;
        const baseClass =
          "shrink-0 rounded-md px-3 py-1 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40";
        const activeClass = isActive
          ? "bg-foreground text-background"
          : "border border-foreground/15 text-foreground/70 hover:bg-foreground/5";
        const className = `${baseClass} ${activeClass}`;

        if (onChange) {
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isActive}
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
