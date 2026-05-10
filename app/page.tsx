import Link from "next/link";
import { ServiceCard } from "@/components/service-card";
import { StackCard } from "@/components/stack-card";
import { CATEGORIES } from "@/data/categories";
import { STACKS } from "@/data/stacks";
import { SERVICES } from "@/data/services";
import { getRecommendedServices } from "@/lib/data";

export default function Home() {
  const recommended = getRecommendedServices();
  const featuredStacks = STACKS.slice(0, 3);

  return (
    <>
      <section className="border-b border-foreground/10">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            Build production products on <span className="underline decoration-foreground/30 underline-offset-4">$0/mo</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/70">
            A curated directory of free-tier services for indie developers and personal projects.
            Hosting, databases, auth, email, analytics — every entry has a single-line summary
            of what you actually get for free, and a link out to verify.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="rounded-md bg-foreground px-4 py-2 text-background hover:opacity-90 focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:outline-none"
            >
              Browse {SERVICES.length} services
            </Link>
            <Link
              href="/stacks"
              className="rounded-md border border-foreground/20 px-4 py-2 hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:outline-none"
            >
              See curated stacks
            </Link>
          </div>
          <p className="mt-6 text-xs text-foreground/50">
            Last verified 2026-05 · {CATEGORIES.length} categories · {STACKS.length} curated stacks
          </p>
        </div>
      </section>

      <section className="border-b border-foreground/10">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <header className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Top picks</h2>
              <p className="mt-1 text-sm text-foreground/70">
                What we'd reach for first in each category.
              </p>
            </div>
            <Link
              href="/services"
              className="text-sm text-foreground/70 underline-offset-4 hover:underline"
            >
              All services →
            </Link>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-foreground/10">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <header className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">Curated stacks</h2>
              <p className="mt-1 text-sm text-foreground/70">
                Opinionated combinations for specific use cases.
              </p>
            </div>
            <Link
              href="/stacks"
              className="text-sm text-foreground/70 underline-offset-4 hover:underline"
            >
              All stacks →
            </Link>
          </header>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredStacks.map((stack) => (
              <StackCard key={stack.slug} stack={stack} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">Browse by category</h2>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                href={`/services?category=${c.id}`}
                className="rounded-lg border border-foreground/15 p-4 hover:bg-foreground/5 focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:outline-none"
              >
                <div className="font-medium">{c.label}</div>
                <div className="mt-1 text-xs text-foreground/60">{c.description}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
