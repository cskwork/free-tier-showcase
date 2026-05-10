import { SERVICES } from "@/data/services";
import { STACKS } from "@/data/stacks";
import type { Service, Stack } from "@/data/types";
import type { CategoryId } from "@/data/categories";

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getStackBySlug(slug: string): Stack | undefined {
  return STACKS.find((s) => s.slug === slug);
}

export function getServicesByCategory(category: CategoryId): Service[] {
  return SERVICES.filter(
    (s) => s.category === category || s.also?.includes(category),
  );
}

export function getRecommendedServices(): Service[] {
  return SERVICES.filter((s) => s.recommended);
}

export function getServicesInStack(stack: Stack): Service[] {
  return stack.services
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is Service => Boolean(s));
}

export function getAlternatives(service: Service): Service[] {
  if (!service.alternativeTo?.length) return [];
  return service.alternativeTo
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is Service => Boolean(s));
}
