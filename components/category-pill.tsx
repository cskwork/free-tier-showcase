import { getCategory, type CategoryId } from "@/data/categories";

interface CategoryPillProps {
  id: CategoryId;
}

export function CategoryPill({ id }: CategoryPillProps) {
  const category = getCategory(id);
  return (
    <span className="inline-flex items-center rounded-full bg-surface-2 px-2.5 py-0.5 text-[0.6875rem] font-medium text-ink-2">
      {category.label}
    </span>
  );
}
