import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  head: () => ({
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
  const [search, setSearch] = useState<SearchState>(DEFAULT_SEARCH);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero search={search} onChange={setSearch} />
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
