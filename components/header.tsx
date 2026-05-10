"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/stacks", label: "Stacks" },
  { href: "/about", label: "About" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-[color-mix(in_oklab,var(--paper)_85%,transparent)] backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_oklab,var(--paper)_72%,transparent)]">
      <div className="mx-auto flex h-16 w-full max-w-[var(--container-wide)] items-center gap-6 px-5 md:px-8">
        <Link
          href="/"
          aria-label="Free Tier Showcase — home"
          className="group flex items-baseline gap-2"
        >
          <span className="font-display text-[1.45rem] leading-none">
            Free Tier
          </span>
          <span className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">
            showcase
          </span>
        </Link>

        <span className="hidden h-5 w-px bg-rule md:block" aria-hidden />

        <nav className="ml-auto flex items-center gap-1 md:ml-0 md:mr-auto">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-md px-3 py-1.5 text-sm transition-colors duration-[var(--duration-fast)] ${
                  active
                    ? "text-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-px h-px bg-ink"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub repository"
          className="hidden items-center gap-2 rounded-full border border-rule px-3 py-1.5 text-xs text-muted transition-colors hover:border-rule-strong hover:text-ink md:inline-flex"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4"
            fill="currentColor"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.69 1.24 3.34.95.1-.74.4-1.24.72-1.53-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.16 1.18a10.95 10.95 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.26 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
          </svg>
          Source
        </a>
      </div>
    </header>
  );
}
