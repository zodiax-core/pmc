import type { SearchState, SortKey } from "./listings";

export type ViewMode = "grid" | "list";

export type PropertiesParams = {
  area: string;
  beds: string;
  price: string;
  type: string;
  deal: "Buy" | "Rent";
  page: number;
  view: ViewMode;
  sort: SortKey;
};

export type PageState = {
  search: SearchState;
  page: number;
  view: ViewMode;
  sort: SortKey;
};

export function initFromParams(p: PropertiesParams): PageState {
  return {
    search: { area: p.area, beds: p.beds, price: p.price, type: p.type, deal: p.deal },
    page: p.page,
    view: p.view,
    sort: p.sort,
  };
}

export function toParams(s: PageState): PropertiesParams {
  return { ...s.search, page: s.page, view: s.view, sort: s.sort };
}

export function sameParams(a: PageState, p: PropertiesParams) {
  return (
    a.search.area === p.area &&
    a.search.beds === p.beds &&
    a.search.price === p.price &&
    a.search.type === p.type &&
    a.search.deal === p.deal &&
    a.page === p.page &&
    a.view === p.view &&
    a.sort === p.sort
  );
}
