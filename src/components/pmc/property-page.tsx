import { useEffect, useMemo, useRef, useState } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { PropertySearch } from "./property-search";
import { PropertiesResults } from "./properties-results";
import { AiPropertySearch } from "./ai-property-search";
import { DiscoverySections } from "./discovery-sections";
import { RecentlyAdded } from "./recently-added";
import {
  filterListings,
  paginate,
  sortListings,
  type SearchState,
  type SortKey,
} from "@/lib/listings";
import {
  initFromParams,
  sameParams,
  type PageState,
  type PropertiesParams,
  type ViewMode,
} from "@/lib/properties";

export function PropertyPage({
  params,
  commit,
}: {
  params: PropertiesParams;
  commit: (s: PageState) => void;
}) {
  const [state, setState] = useState<PageState>(() => initFromParams(params));
  const resultsRef = useRef<HTMLDivElement>(null);

  // Push state → URL (replace keeps history clean, no spam).
  useEffect(() => {
    commit(state);
  }, [state, commit]);

  // Back / forward navigation — sync URL back into state without looping.
  useEffect(() => {
    setState((cur) => (sameParams(cur, params) ? cur : initFromParams(params)));
  }, [params]);

  const updateSearch = (search: SearchState) => {
    setState((cur) => ({ ...cur, search, page: 1 }));
  };

  const changeView = (view: ViewMode) => {
    setState((cur) => ({ ...cur, view }));
  };

  const changeSort = (sort: SortKey) => {
    setState((cur) => ({ ...cur, sort, page: 1 }));
  };

  const goPage = (page: number) => {
    setState((cur) => ({ ...cur, page }));
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const runSearch = () => {
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filtered = useMemo(() => filterListings(state.search), [state.search]);
  const sorted = useMemo(() => sortListings(filtered, state.sort), [filtered, state.sort]);
  const featuredList = sorted.filter((l) => l.featured);
  const pageList = useMemo(() => sorted.filter((l) => !l.featured), [sorted]);
  const slice = useMemo(() => paginate(pageList, state.page), [pageList, state.page]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        {/* Discovery header */}
        <section className="mx-auto max-w-[1240px] scroll-mt-28 px-4 pt-28 sm:px-6 sm:pt-32">
          <span className="label-eyebrow">Property discovery</span>
          <h1 className="mt-3 max-w-[20ch] text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[0.98] font-semibold text-ink">
            Every listing, inspected and mapped.
          </h1>
          <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-ink-soft">
            Search across PMC's inspected listings — filter by deal, area, type, price and beds,
            then flip between grid, list and a live map.
          </p>

          <div className="mt-8">
            <PropertySearch value={state.search} onChange={updateSearch} onSearch={runSearch} />
          </div>
        </section>

        {/* Results */}
        <section
          ref={resultsRef}
          id="results"
          className="mx-auto max-w-[1240px] scroll-mt-28 px-4 py-14 sm:px-6"
        >
          <PropertiesResults
            search={state.search}
            onChange={updateSearch}
            slice={slice}
            totalCount={slice.total + featuredList.length}
            onPageChange={goPage}
            view={state.view}
            onViewChange={changeView}
            sort={state.sort}
            onSortChange={changeSort}
            featured={featuredList}
          />
        </section>

        {/* Recently added */}
        <section className="mx-auto max-w-[1240px] scroll-mt-28 px-4 pb-16 sm:px-6">
          <RecentlyAdded />
        </section>

        {/* AI property discovery + popular areas */}
        <section className="mx-auto max-w-[1240px] space-y-12 px-4 pb-20 sm:px-6">
          <AiPropertySearch value={state.search} onChange={updateSearch} onSearch={runSearch} />
          <DiscoverySections search={state.search} onFilter={updateSearch} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
