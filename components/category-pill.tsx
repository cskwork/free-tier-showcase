import { getCategory, type CategoryId } from "@/data/categories";

interface CategoryPillProps {
  id: CategoryId;
}

export function CategoryPill({ id }: CategoryPillProps) {
  const category = getCategory(id);
  return (
    <span className="inline-flex items-center rounded-md border border-foreground/15 px-2 py-0.5 text-xs text-foreground/70">
      {category.label}
    </span>
  );
}
