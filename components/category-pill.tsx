import { getCategory, type CategoryId } from "@/data/categories";

interface CategoryPillProps {
  id: CategoryId;
}

export function CategoryPill({ id }: CategoryPillProps) {
  const category = getCategory(id);
  return (
    <span className="inline-flex items-center font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">
      {category.label}
    </span>
  );
}
