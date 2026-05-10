interface RatingDotsProps {
  rating: 1 | 2 | 3 | 4 | 5;
}

export function RatingDots({ rating }: RatingDotsProps) {
  return (
    <div
      className="inline-flex items-center gap-1"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={
            i <= rating
              ? "h-1.5 w-1.5 rounded-full bg-foreground"
              : "h-1.5 w-1.5 rounded-full bg-foreground/20"
          }
        />
      ))}
    </div>
  );
}
