import Link from "next/link";
import { SERVICES } from "@/data/services";
import { CATEGORIES } from "@/data/categories";
import { STACKS } from "@/data/stacks";

const REPO_URL = "https://github.com/cskwork/free-tier-showcase";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-rule bg-surface">
      <div className="mx-auto w-full max-w-[var(--container-wide)] px-5 pb-12 pt-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-[34ch] space-y-3">
            <p className="flex items-center gap-2 text-lg font-bold tracking-[-0.015em] text-ink">
              <span
                aria-hidden
                className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-orange text-on-orange"
              >
                <svg
                  viewBox="0 0 12 12"
                  className="h-2.5 w-2.5"
                  fill="currentColor"
                >
                  <path d="M6 1.5 11 10H1L6 1.5Z" />
                </svg>
              </span>
              Free Tier Showcase
            </p>
            <p className="text-sm leading-relaxed text-ink-2">
              A curated list of genuinely free-tier services and the
              opinionated stacks that hold them together. No affiliates, no
              tracking — just the numbers, checked.
            </p>
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
              {SERVICES.length} services · {CATEGORIES.length} categories ·{" "}
              {STACKS.length} stacks
            </p>
          </div>

          <nav aria-label="Site" className="space-y-3 text-sm">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
              Browse
            </p>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-ink-2 hover:text-ink">
                  All services
                </Link>
              </li>
              <li>
                <Link href="/stacks" className="text-ink-2 hover:text-ink">
                  Curated stacks
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-ink-2 hover:text-ink">
                  About this site
                </Link>
              </li>
            </ul>
          </nav>

          <div className="space-y-3 text-sm">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
              Verified
            </p>
            <p className="text-ink-2">
              Numbers re-checked{" "}
              <span className="font-mono text-ink">2026-05</span>. Free tiers
              shift constantly — confirm at the pricing page before launch.
            </p>
            <a
              href={`${REPO_URL}/issues/new`}
              target="_blank"
              rel="noreferrer"
              className="link-underline inline-block text-ink-2"
            >
              Open a correction
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-rule pt-6 text-xs text-ink-3 md:flex-row md:items-center md:justify-between">
          <p>
            Built as a static export. No analytics, no cookies, no auth.
          </p>
          <p className="flex items-center gap-3">
            <a
              href={REPO_URL}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ink"
            >
              GitHub
            </a>
            <span aria-hidden>·</span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em]">
              MIT licensed
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
