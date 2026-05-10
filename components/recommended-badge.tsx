/**
 * The single trust signal that replaces the previous ⭐ emoji + 5-dot rating.
 * Visual cue: orange-soft pill, chevron-up glyph (echoes PH's upvote shape),
 * "Top pick" label.
 */
export function RecommendedBadge({
  size = "default",
}: {
  size?: "default" | "compact";
}) {
  const compact = size === "compact";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-orange-soft text-orange-ink ${
        compact
          ? "px-2 py-0.5 text-[0.65rem]"
          : "px-2.5 py-0.5 text-[0.6875rem]"
      } font-medium tracking-tight`}
    >
      <svg
        viewBox="0 0 10 10"
        aria-hidden="true"
        className="h-2.5 w-2.5"
        fill="currentColor"
      >
        <path d="M5 1.5 8.5 7H1.5L5 1.5Z" />
      </svg>
      Top pick
    </span>
  );
}
