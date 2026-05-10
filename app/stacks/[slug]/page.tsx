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
    <article className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/stacks"
        className="text-sm text-foreground/60 underline-offset-4 hover:underline"
      >
        ← All stacks
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{stack.name}</h1>
        <p className="mt-3 text-lg text-foreground/70">{stack.tagline}</p>
      </header>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-foreground/15 p-5">
          <div className="text-xs uppercase tracking-wide text-foreground/50">Cost</div>
          <p className="mt-2 font-medium">{stack.costEstimate}</p>
        </div>
        <div className="rounded-xl border border-foreground/15 p-5">
          <div className="text-xs uppercase tracking-wide text-foreground/50">First limit</div>
          <p className="mt-2 text-sm text-foreground/80">{stack.ceiling}</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Why this stack</h2>
        <div className="mt-3 whitespace-pre-line text-foreground/80">{stack.description}</div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold tracking-tight">Services in this stack</h2>
        <p className="mt-1 text-sm text-foreground/60">In order of setup.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>
    </article>
  );
}
