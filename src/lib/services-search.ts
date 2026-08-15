import { ALL_SERVICES, PROVIDERS, SERVICE_GROUPS } from "./services";

export const SERVICE_AREAS = ["Lahore", "Karachi", "Islamabad"];

export const SERVICE_GROUP_OPTIONS = SERVICE_GROUPS.map((g) => g.title);

export const SERVICE_CATEGORIES = ["Any service", ...ALL_SERVICES.map((s) => s.name)];

export function servicesForGroup(group: string): string[] {
  if (!group) return SERVICE_CATEGORIES;
  const g = SERVICE_GROUPS.find((x) => x.title === group);
  return g ? ["Any service", ...g.services.map((s) => s.name)] : SERVICE_CATEGORIES;
}

export const SERVICE_PRICES = ["Any budget", "Under 5k", "5 – 20k", "20 – 50k", "50k +"];

export type ServiceSearchState = {
  city: string;
  group: string;
  category: string;
  price: string;
};

export const DEFAULT_SERVICE_SEARCH: ServiceSearchState = {
  city: "",
  group: "",
  category: "Any service",
  price: "Any budget",
};

function servicePriceRange(option: string): [number, number] {
  switch (option) {
    case "Under 5k":
      return [0, 5000];
    case "5 – 20k":
      return [5000, 20000];
    case "20 – 50k":
      return [20000, 50000];
    case "50k +":
      return [50000, Infinity];
    default:
      return [0, Infinity];
  }
}

export function filterProviders(search: ServiceSearchState) {
  const [lo, hi] = servicePriceRange(search.price);
  const q = search.city.trim().toLowerCase();
  const groupServices = search.group
    ? new Set(
        SERVICE_GROUPS.find((g) => g.title === search.group)?.services.map((s) => s.name) ?? [],
      )
    : null;

  return PROVIDERS.filter((p) => {
    if (search.category !== "Any service" && p.category !== search.category) return false;
    if (search.category === "Any service" && groupServices && !groupServices.has(p.category))
      return false;
    if (p.fromNum < lo || p.fromNum >= hi) return false;
    if (q && !p.city.toLowerCase().includes(q)) return false;
    return true;
  });
}

export function countServiceMatches(search: ServiceSearchState): number {
  return filterProviders(search).length;
}

export function hasActiveServiceFilters(search: ServiceSearchState): boolean {
  return (
    search.city.trim() !== "" ||
    search.group !== "" ||
    search.category !== "Any service" ||
    search.price !== "Any budget"
  );
}

export function serviceCategoryFromText(query: string): string {
  const q = query.toLowerCase();
  const match = ALL_SERVICES.find(
    (s) => q.includes(s.name.toLowerCase()) || (s.short && q.includes(s.short.toLowerCase())),
  );
  return match ? match.name : "Any service";
}
