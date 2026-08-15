import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/pmc/site-header";
import { Hero } from "@/components/pmc/hero";
import { BrowseProperties } from "@/components/pmc/browse-properties";
import { Passport } from "@/components/pmc/passport";
import { ServiceRibbon } from "@/components/pmc/service-ribbon";
import { ExploreMore } from "@/components/pmc/explore-more";
import { Projects, Invest } from "@/components/pmc/opportunities";
import { Agencies } from "@/components/pmc/agencies";
import { AiSearch } from "@/components/pmc/ai-search";
import { Management } from "@/components/pmc/management";
import { AppCta, Partners } from "@/components/pmc/bottom-ctas";
import { SiteFooter } from "@/components/pmc/site-footer";
import { DEFAULT_SEARCH, type SearchState } from "@/lib/listings";
import { DEFAULT_SERVICE_SEARCH, type ServiceSearchState } from "@/lib/services-search";
import type { SearchMode } from "@/components/pmc/search-panel";
import heroHouse from "@/assets/hero-house-opt.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "preload", as: "image", href: heroHouse }],
    meta: [
      { title: "PMC — Inspected homes, digital twins, property management" },
      {
        name: "description",
        content:
          "PMC lists inspected properties with verified ownership, documented condition and 3D digital twins — plus rent, maintenance and services after you move in.",
      },
      { property: "og:title", content: "PMC — Know the property before you go" },
      {
        property: "og:description",
        content:
          "Inspected listings, property passports and 3D digital twins across Lahore, Karachi and Islamabad.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [mode, setMode] = useState<SearchMode>("property");
  const [search, setSearch] = useState<SearchState>(DEFAULT_SEARCH);
  const [service, setService] = useState<ServiceSearchState>(DEFAULT_SERVICE_SEARCH);
  const navigate = useNavigate();

  const goSearch = () => {
    if (mode === "property") {
      navigate({
        to: "/properties",
        search: {
          deal: search.deal,
          area: search.area,
          beds: search.beds,
          price: search.price,
          type: search.type,
          page: 1,
          view: "grid",
          sort: "popular",
        },
      });
    } else {
      navigate({
        to: "/services",
        search: {
          city: service.city,
          category: service.category,
          price: service.price,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero
          mode={mode}
          search={search}
          service={service}
          onModeChange={setMode}
          onChange={setSearch}
          onServiceChange={setService}
          onSearch={goSearch}
        />
        <BrowseProperties search={search} onChange={setSearch} />
        <ExploreMore />
        <ServiceRibbon />
        <Projects />
        <Invest />
        <Passport />
        <Agencies />
        <AiSearch />
        <Management />
        <AppCta />
        <Partners />
      </main>
      <SiteFooter />
    </div>
  );
}
