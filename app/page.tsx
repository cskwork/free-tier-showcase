import Link from "next/link";
import { ServiceCard } from "@/components/service-card";
import { StackCard } from "@/components/stack-card";
import { Reveal } from "@/components/reveal";
import { CATEGORIES } from "@/data/categories";
import { STACKS } from "@/data/stacks";
import { SERVICES } from "@/data/services";
import { getRecommendedServices, getServicesByCategory } from "@/lib/data";

const SECTION_BASE = "mx-auto w-full max-w-[var(--container-wide)] px-5 md:px-8";

const VERIFIED_AT = "May 2026";

function TodayEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
      <span className="text-ink">{label}</span>
      <span className="h-px w-8 bg-rule-strong" aria-hidden />
      <span>{VERIFIED_AT}</span>
    </div>
  );
}

export default function Home() {
  const recommended = getRecommendedServices();
  const [hero, ...restPicks] = recommended;
  const featuredStacks = STACKS.slice(0, 3);

  // Editorial category split: top-4 prominent, rest dense.
  const primaryCategories = CATEGORIES.slice(0, 4);
  const secondaryCategories = CATEGORIES.slice(4);

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className={`${SECTION_BASE} pb-14 pt-14 md:pb-20 md:pt-20`}>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <Reveal as="div">
            <TodayEyebrow label="Today" />
            <h1 className="mt-6 max-w-[18ch] text-balance text-[length:var(--text-display)] font-bold leading-[1.05] tracking-[-0.025em] text-ink">
              Ship a real product on{" "}
              <span className="whitespace-nowrap text-orange-deep">
                $0/mo
              </span>
              .
            </h1>
            <p className="mt-6 max-w-[44ch] text-pretty text-base leading-relaxed text-ink-2 md:text-[1.0625rem]">
              A curated directory of free-tier services for indie developers.
              Hosting, databases, auth, email, analytics — every entry has the
              actual numbers and the gotcha you&apos;d warn a friend about.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full bg-orange px-5 py-2.5 text-[0.875rem] font-medium text-on-orange shadow-[var(--shadow-1)] transition-[background-color,transform] duration-[var(--duration)] hover:-translate-y-[1px] hover:bg-orange-deep active:translate-y-0"
              >
                Browse {SERVICES.length} services
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/stacks"
                className="link-underline text-sm text-ink-2"
              >
                Or start from a curated stack
              </Link>
            </div>
          </Reveal>

          <Reveal as="aside" delay={120} className="md:pt-2">
            <dl className="grid grid-cols-2 gap-y-6 border-t border-rule pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              {[
                { dt: "Services", dd: SERVICES.length },
                { dt: "Categories", dd: CATEGORIES.length },
                { dt: "Stacks", dd: STACKS.length },
                { dt: "Verified", dd: "2026-05" },
              ].map((row) => (
                <div key={row.dt}>
                  <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
                    {row.dt}
                  </dt>
                  <dd
                    className={
                      typeof row.dd === "number"
                        ? "mt-2 text-3xl font-bold leading-none text-ink md:text-4xl"
                        : "mt-2 font-mono text-base text-ink"
                    }
                  >
                    {row.dd}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 max-w-[28ch] text-xs leading-relaxed text-ink-3 md:pl-8">
              No affiliate links. No tracking. Numbers re-checked monthly —
              outdated entries are flagged in the listing, not quietly removed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Top picks — feed-style with hero + grid ─────────────── */}
      <section
        className={`${SECTION_BASE} border-t border-rule py-16 md:py-20`}
      >
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <TodayEyebrow label="Today's leaders" />
            <h2 className="mt-3 text-[length:var(--text-h2)] font-bold leading-tight tracking-[-0.02em] text-ink">
              What we&apos;d reach for first.
            </h2>
            <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-ink-2">
              One opinionated pick per category. The rest of the catalog is
              ranked behind it.
            </p>
          </div>
          <Link
            href="/services"
            className="link-underline shrink-0 text-sm text-ink-2"
          >
            All services
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:grid-rows-[auto_auto] lg:gap-6">
          {hero && (
            <Reveal className="md:col-span-2 md:row-span-2">
              <ServiceCard service={hero} featured />
            </Reveal>
          )}
          {restPicks.slice(0, 4).map((service, i) => (
            <Reveal key={service.slug} delay={80 + i * 60}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>

        {restPicks.length > 4 && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {restPicks.slice(4).map((service, i) => (
              <Reveal key={service.slug} delay={i * 60}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ── Curated stacks — sticky title left, cards stacked right ── */}
      <section
        className={`${SECTION_BASE} border-t border-rule py-16 md:py-20`}
      >
        <div className="grid gap-12 md:grid-cols-[1fr_1.7fr] md:gap-16">
          <div className="md:sticky md:top-24 md:self-start">
            <TodayEyebrow label="Stacks" />
            <h2 className="mt-3 text-[length:var(--text-h2)] font-bold leading-tight tracking-[-0.02em] text-ink">
              Pre-wired combinations.
            </h2>
            <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-ink-2">
              Whole architectures that hold together at $0/mo — picked so you
              don&apos;t have to compare twelve hosting options before writing
              the first line of code.
            </p>
            <Link
              href="/stacks"
              className="link-underline mt-5 inline-block text-sm text-ink-2"
            >
              All {STACKS.length} stacks →
            </Link>
          </div>

          <div className="grid gap-5">
            {featuredStacks.map((stack, i) => (
              <Reveal key={stack.slug} delay={i * 80}>
                <StackCard stack={stack} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories — editorial index ─────────────────────────── */}
      <section
        className={`${SECTION_BASE} border-t border-rule py-16 md:py-20`}
      >
        <div className="mb-8">
          <TodayEyebrow label="Browse" />
          <h2 className="mt-3 text-[length:var(--text-h2)] font-bold leading-tight tracking-[-0.02em] text-ink">
            By category.
          </h2>
          <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-ink-2">
            Sixteen categories, every one with at least one production-viable
            free option.
          </p>
        </div>

        <div className="grid gap-x-10 gap-y-1 md:grid-cols-2">
          {primaryCategories.map((c) => {
            const count = getServicesByCategory(c.id).length;
            return (
              <Reveal key={c.id} as="div">
                <Link
                  href={`/services?category=${c.id}`}
                  className="group flex items-baseline justify-between gap-6 border-b border-rule py-5 transition-colors hover:border-ink"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="text-2xl font-semibold tracking-[-0.015em] text-ink transition-colors group-hover:text-orange-deep md:text-[1.625rem]">
                      {c.label}
                    </span>
                    <span className="hidden text-sm text-ink-3 md:inline">
                      {c.description}
                    </span>
                  </span>
                  <span className="font-mono text-xs text-ink-3">
                    {String(count).padStart(2, "0")}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 grid gap-x-8 gap-y-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {secondaryCategories.map((c) => {
            const count = getServicesByCategory(c.id).length;
            return (
              <Link
                key={c.id}
                href={`/services?category=${c.id}`}
                className="group flex items-baseline justify-between gap-3 border-b border-rule py-3 text-sm transition-colors hover:border-ink"
              >
                <span className="text-ink-2 group-hover:text-ink">
                  {c.label}
                </span>
                <span className="font-mono text-[0.6875rem] text-ink-3">
                  {String(count).padStart(2, "0")}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
