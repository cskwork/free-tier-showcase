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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
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
    <article className="mx-auto w-full max-w-[var(--container-wide)] px-5 pb-24 pt-12 md:px-8 md:pt-16">
      <Link
        href="/stacks"
        className="link-underline text-sm text-muted hover:text-ink"
      >
        <span aria-hidden>←</span> All stacks
      </Link>

      <header className="mt-10 grid gap-8 border-b border-rule pb-12 md:grid-cols-[1.6fr_1fr] md:gap-16">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-2">
            Stack
          </p>
          <h1 className="mt-4 font-display text-[length:var(--text-h1)] leading-[1.02]">
            {stack.name}
          </h1>
          <p className="mt-5 max-w-[55ch] text-lg leading-relaxed text-ink-2">
            {stack.tagline}
          </p>
        </div>
        <aside className="md:border-l md:border-rule md:pl-10">
          <dl className="space-y-5">
            <div>
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
                Cost
              </dt>
              <dd className="mt-2 font-display text-2xl leading-none text-ink">
                {stack.costEstimate}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
                First limit
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-2">
                {stack.ceiling}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-2">
                Services
              </dt>
              <dd className="mt-2 font-mono text-sm text-ink">
                {String(stack.services.length).padStart(2, "0")}
              </dd>
            </div>
          </dl>
        </aside>
      </header>

      <section className="mt-14 grid gap-12 md:grid-cols-[14ch_1fr]">
        <div className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-2">
          Why this stack
        </div>
        <div className="max-w-[65ch] whitespace-pre-line text-base leading-relaxed text-ink-2">
          {stack.description}
        </div>
      </section>

      <section className="mt-20 grid gap-12 md:grid-cols-[14ch_1fr]">
        <div className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-2">
          Build order
        </div>
        <div>
          <h2 className="font-display text-2xl leading-tight">
            Services in this stack
          </h2>
          <p className="mt-2 max-w-[55ch] text-sm text-muted">
            Numbered in the order they should be set up — earlier items are
            usually dependencies for later ones.
          </p>
          <ol className="mt-6 grid gap-5 sm:grid-cols-2">
            {services.map((s, i) => (
              <li key={s.slug} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-1 -top-2 z-10 font-mono text-[0.7rem] tracking-[0.18em] text-muted-2"
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
