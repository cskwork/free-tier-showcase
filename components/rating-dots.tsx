interface RatingDotsProps {
  rating: 1 | 2 | 3 | 4 | 5;
}

export function RatingDots({ rating }: RatingDotsProps) {
  return (
    <div
      className="inline-flex items-center gap-[3px]"
      role="img"
      aria-label={`Generosity rated ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`h-1 w-3 rounded-[1px] transition-colors ${
            i <= rating ? "bg-ink" : "bg-rule-strong/60"
          }`}
        />
      ))}
    </div>
  );
}
