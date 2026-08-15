import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ServicesPage } from "@/components/pmc/services-page";

const searchSchema = z.object({
  q: z.string().optional(),
  service: z.string().optional(),
  city: z.string().optional(),
  category: z.string().optional(),
  price: z.string().optional(),
});

export const Route = createFileRoute("/services")({
  validateSearch: searchSchema.parse,
  head: () => ({
    meta: [
      { title: "Services — PMC | Property services & maintenance" },
      {
        name: "description",
        content:
          "Book trusted property services through PMC — cleaning, maintenance, renovation, moving and more from verified providers across Pakistan.",
      },
      { property: "og:title", content: "Services — PMC" },
      {
        property: "og:description",
        content:
          "Everything your property needs. Cleaning, maintenance, renovation and moving from verified providers.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ServicesRoute,
});

function ServicesRoute() {
  const params = Route.useSearch();
  const service = {
    city: params.city ?? "",
    group: "",
    category: params.category ?? "Any service",
    price: params.price ?? "Any budget",
  };
  return <ServicesPage initialService={service} />;
}
