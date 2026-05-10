import Link from "next/link";
import { ServiceCard } from "@/components/service-card";
import { StackCard } from "@/components/stack-card";
import { Reveal } from "@/components/reveal";
import { CATEGORIES } from "@/data/categories";
import { STACKS } from "@/data/stacks";
import { SERVICES } from "@/data/services";
import { getRecommendedServices, getServicesByCategory } from "@/lib/data";

const SECTION_BASE = "mx-auto w-full max-w-[var(--container-wide)] px-5 md:px-8";

function SectionEyebrow({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-2">
      <span className="text-ink">{index}</span>
      <span className="h-px w-8 bg-rule-strong" aria-hidden />
      <span>{label}</span>
    </div>
  );
}

export default function Home() {
  const recommended = getRecommendedServices();
  const [hero, ...restPicks] = recommended;
  const featuredStacks = STACKS.slice(0, 3);

  // Asymmetric category split: marquee-style first row, denser grid below.
  const primaryCategories = CATEGORIES.slice(0, 4);
  const secondaryCategories = CATEGORIES.slice(4);

  return (
    <>
      {/* ── Hero — asymmetric: prose left, meta column right ── */}
      <section className={`${SECTION_BASE} pb-16 pt-16 md:pb-24 md:pt-24`}>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16 lg:gap-24">
          <Reveal as="div" className="max-w-[22ch]">
            <SectionEyebrow index="00" label="Catalog" />
            <h1 className="mt-6 font-display text-[length:var(--text-display)] leading-[0.95] tracking-[-0.02em]">
              Ship a real product on{" "}
              <span className="italic text-accent-ink">$0/mo</span>.
            </h1>
            <p className="mt-7 max-w-[44ch] text-base leading-relaxed text-ink-2 md:text-lg">
              A curated directory of free-tier services for indie developers
              and personal projects. Hosting, databases, auth, email,
              analytics — every entry has the actual numbers and the gotcha
              you'd warn a friend about.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper transition-transform duration-[var(--duration)] hover:-translate-y-[1px] active:translate-y-0"
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
              <div>
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
                  Services
                </dt>
                <dd className="mt-2 font-display text-4xl leading-none">
                  {SERVICES.length}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
                  Categories
                </dt>
                <dd className="mt-2 font-display text-4xl leading-none">
                  {CATEGORIES.length}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
                  Stacks
                </dt>
                <dd className="mt-2 font-display text-4xl leading-none">
                  {STACKS.length}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
                  Verified
                </dt>
                <dd className="mt-2 font-mono text-base text-ink">2026-05</dd>
              </div>
            </dl>
            <p className="mt-6 max-w-[28ch] text-xs leading-relaxed text-muted md:pl-8">
              No affiliate links. No tracking. Numbers re-checked monthly —
              outdated entries are flagged in the listing, not quietly removed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Top picks — asymmetric: 1 hero card + 2-column smaller grid ── */}
      <section
        className={`${SECTION_BASE} border-t border-rule py-20 md:py-28`}
      >
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <SectionEyebrow index="01" label="Top picks" />
            <h2 className="mt-4 font-display text-[length:var(--text-h2)] leading-tight">
              What we'd reach for first.
            </h2>
            <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted">
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

      {/* ── Curated stacks — 2-column zig-zag rather than 3-equal grid ── */}
      <section
        className={`${SECTION_BASE} border-t border-rule py-20 md:py-28`}
      >
        <div className="grid gap-12 md:grid-cols-[1fr_1.7fr] md:gap-16">
          <div className="md:sticky md:top-24 md:self-start">
            <SectionEyebrow index="02" label="Stacks" />
            <h2 className="mt-4 font-display text-[length:var(--text-h2)] leading-tight">
              Pre-wired combinations.
            </h2>
            <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-muted">
              Whole architectures that hold together at $0/mo — picked so you
              don't have to compare twelve hosting options before writing the
              first line of code.
            </p>
            <Link
              href="/stacks"
              className="link-underline mt-6 inline-block text-sm text-ink-2"
            >
              All {STACKS.length} stacks
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

      {/* ── Categories — editorial index, not a card grid ── */}
      <section
        className={`${SECTION_BASE} border-t border-rule py-20 md:py-28`}
      >
        <div className="mb-10">
          <SectionEyebrow index="03" label="Index" />
          <h2 className="mt-4 font-display text-[length:var(--text-h2)] leading-tight">
            Browse by category.
          </h2>
          <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted">
            Sixteen categories, every one with at least one production-viable
            free option.
          </p>
        </div>

        <div className="grid gap-x-10 gap-y-2 md:grid-cols-2 lg:grid-cols-2">
          {primaryCategories.map((c) => {
            const count = getServicesByCategory(c.id).length;
            return (
              <Reveal key={c.id} as="div">
                <Link
                  href={`/services?category=${c.id}`}
                  className="group flex items-baseline justify-between gap-6 border-b border-rule py-5 transition-colors hover:border-ink"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-display text-2xl leading-none transition-colors group-hover:text-accent-ink md:text-3xl">
                      {c.label}
                    </span>
                    <span className="hidden text-sm text-muted md:inline">
                      {c.description}
                    </span>
                  </span>
                  <span className="font-mono text-xs text-muted-2">
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
                <span className="font-mono text-[0.7rem] text-muted-2">
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
