import { useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PropertyPage } from "@/components/pmc/property-page";
import { toParams, type PageState, type PropertiesParams } from "@/lib/properties";

const searchSchema = z.object({
  area: z.string().optional().default(""),
  beds: z.string().optional().default("Any"),
  price: z.string().optional().default("Any price"),
  type: z.string().optional().default("Any"),
  deal: z.enum(["Buy", "Rent"]).optional().default("Buy"),
  page: z.coerce.number().int().min(1).optional().default(1),
  view: z.enum(["grid", "list"]).optional().default("grid"),
  sort: z.enum(["popular", "price-asc", "price-desc", "newest"]).optional().default("popular"),
});

export const Route = createFileRoute("/properties")({
  validateSearch: searchSchema.parse,
  head: () => ({
    meta: [
      { title: "Properties — PMC | Inspected listings with maps & 3D tours" },
      {
        name: "description",
        content:
          "Browse PMC's inspected properties across Lahore, Karachi and Islamabad. Filter by deal, area, type, price and beds — view as grid, list or live map.",
      },
      { property: "og:title", content: "Properties — PMC" },
      {
        property: "og:description",
        content:
          "Inspected listings with maps and 3D digital twins across Lahore, Karachi and Islamabad.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PropertiesRoute,
});

function PropertiesRoute() {
  const params = Route.useSearch() as PropertiesParams;
  const navigate = Route.useNavigate();
  const commit = useCallback(
    (s: PageState) => navigate({ search: toParams(s), replace: true }),
    [navigate],
  );
  return <PropertyPage params={params} commit={commit} />;
}
