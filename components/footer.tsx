import Link from "next/link";
import { SERVICES } from "@/data/services";
import { CATEGORIES } from "@/data/categories";
import { STACKS } from "@/data/stacks";

export function Footer() {
  return (
    <footer className="relative z-[1] mt-24 border-t border-rule">
      <div className="mx-auto w-full max-w-[var(--container-wide)] px-5 pb-12 pt-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-[34ch] space-y-3">
            <p className="font-display text-2xl leading-tight">
              Free Tier <span className="italic">Showcase</span>
            </p>
            <p className="text-sm leading-relaxed text-muted">
              A curated list of genuinely free-tier services and the
              opinionated stacks that hold them together. No affiliates, no
              tracking — just the numbers, checked.
            </p>
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
              {SERVICES.length} services · {CATEGORIES.length} categories ·{" "}
              {STACKS.length} stacks
            </p>
          </div>

          <nav aria-label="Site" className="space-y-3 text-sm">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
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
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
              Verified
            </p>
            <p className="text-ink-2">
              Numbers re-checked{" "}
              <span className="font-mono text-ink">2026-05</span>. Free tiers
              shift constantly — confirm at the pricing page before launch.
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="link-underline inline-block text-ink-2"
            >
              Open a correction
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-rule pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            Built as a static export. No analytics, no cookies, no auth.
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em]">
            MIT licensed
          </p>
        </div>
      </div>
    </footer>
  );
}
