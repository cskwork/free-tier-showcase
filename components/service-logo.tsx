/**
 * Monogram tile that stands in for a service logo. Two-letter initials,
 * mono font for steady width. Mirrors PH's fallback when a product has
 * no uploaded logo.
 */
export function ServiceLogo({
  name,
  size = "md",
}: {
  name: string;
  size?: "sm" | "md" | "lg";
}) {
  const initials = name
    .replace(/[^A-Za-z0-9 ]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "·";

  const dim =
    size === "lg"
      ? "h-16 w-16 text-xl rounded-xl"
      : size === "sm"
        ? "h-9 w-9 text-xs rounded-md"
        : "h-12 w-12 text-sm rounded-lg";

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center bg-surface-2 font-mono font-medium text-ink-2 ring-1 ring-inset ring-rule ${dim}`}
    >
      {initials}
    </span>
  );
}
