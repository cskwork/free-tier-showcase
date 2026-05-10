import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-foreground/15">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-10 text-sm text-foreground/70 sm:grid-cols-3">
        <div className="space-y-2">
          <p className="font-medium text-foreground">Free Tier Starter</p>
          <p>
            A curated list of genuinely free-tier services and the stacks
            that hold them together.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-foreground">Navigate</p>
          <ul className="space-y-1">
            <li>
              <Link
                href="/services"
                className="rounded-md hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/stacks"
                className="rounded-md hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
              >
                Stacks
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="rounded-md hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-foreground">Verified</p>
          <p>Last verified: 2026-05</p>
          <p>
            Free tiers shift constantly — claims are best-effort. Found one
            that drifted?{" "}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-md underline underline-offset-2 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
            >
              PRs welcome
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
