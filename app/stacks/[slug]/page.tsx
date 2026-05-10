import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceCard } from "@/components/service-card";
import { STACKS } from "@/data/stacks";
import { getServicesInStack, getStackBySlug } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return STACKS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const stack = getStackBySlug(slug);
  if (!stack) return { title: "Not found" };
  return {
    title: stack.name,
    description: stack.tagline,
  };
}

export default async function StackDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const stack = getStackBySlug(slug);
  if (!stack) notFound();

  const services = getServicesInStack(stack);

  return (
    <article className="mx-auto w-full max-w-[var(--container-wide)] px-5 pb-24 pt-10 md:px-8 md:pt-14">
      <Link
        href="/stacks"
        className="link-underline text-sm text-ink-3 hover:text-ink"
      >
        <span aria-hidden>←</span> All stacks
      </Link>

      <header className="mt-8 grid gap-10 border-b border-rule pb-12 md:grid-cols-[1.6fr_1fr] md:gap-16">
        <div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
            Stack
          </p>
          <h1 className="mt-3 text-[length:var(--text-h1)] font-bold leading-[1.05] tracking-[-0.02em] text-ink">
            {stack.name}
          </h1>
          <p className="mt-4 max-w-[55ch] text-base leading-relaxed text-ink-2 md:text-lg">
            {stack.tagline}
          </p>
        </div>
        <aside className="md:border-l md:border-rule md:pl-10">
          <dl className="space-y-5">
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
                Cost
              </dt>
              <dd className="mt-2 text-2xl font-bold leading-none text-ink">
                {stack.costEstimate}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
                First limit
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-2">
                {stack.ceiling}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
                Services
              </dt>
              <dd className="mt-2 font-mono text-sm text-ink">
                {String(stack.services.length).padStart(2, "0")}
              </dd>
            </div>
          </dl>
        </aside>
      </header>

      <section className="mt-12 grid gap-10 md:grid-cols-[14ch_1fr]">
        <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
          Why this stack
        </div>
        <div className="max-w-[65ch] whitespace-pre-line text-base leading-relaxed text-ink-2">
          {stack.description}
        </div>
      </section>

      <section className="mt-16 grid gap-10 md:grid-cols-[14ch_1fr]">
        <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-ink-3">
          Build order
        </div>
        <div>
          <h2 className="text-2xl font-bold leading-tight tracking-[-0.015em] text-ink">
            Services in this stack
          </h2>
          <p className="mt-2 max-w-[55ch] text-sm text-ink-3">
            Numbered in the order they should be set up — earlier items are
            usually dependencies for later ones.
          </p>
          <ol className="mt-6 grid gap-5 sm:grid-cols-2">
            {services.map((s, i) => (
              <li key={s.slug} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-1 -top-2 z-10 font-mono text-[0.6875rem] tracking-[0.18em] text-ink-3"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ServiceCard service={s} />
              </li>
            ))}
          </ol>
        </div>
      </section>
    </article>
  );
}
