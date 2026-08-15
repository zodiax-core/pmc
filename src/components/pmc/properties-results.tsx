import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Check,
  LayoutGrid,
  List,
  RotateCcw,
} from "lucide-react";
import { PropertyCard, type CardView } from "./property-card";
import { FeaturedCarousel } from "./featured-carousel";
import {
  SORTS,
  pageNumbers,
  type Listing,
  type PageSlice,
  type SearchState,
  type SortKey,
} from "@/lib/listings";

export type ViewMode = CardView;

const VIEWS: { key: ViewMode; label: string; icon: typeof LayoutGrid }[] = [
  { key: "grid", label: "Grid view", icon: LayoutGrid },
  { key: "list", label: "List view", icon: List },
];

function SortSelect({ sort, onChange }: { sort: SortKey; onChange: (s: SortKey) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const label = SORTS.find((s) => s.key === sort)?.label ?? "Sort";

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`morph-fast flex h-9 items-center gap-1.5 rounded-[12px] px-3 text-[12.5px] font-medium ${
          open
            ? "bg-ink text-background"
            : "bg-surface-raised text-ink-soft hover:bg-sand hover:text-ink"
        }`}
      >
        {label}
        <ChevronDown
          className={`morph-fast h-3.5 w-3.5 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+10px)] z-30 w-[max-content] min-w-[190px] animate-in fade-in slide-in-from-top-2 duration-200 rounded-[18px] bg-surface-raised p-1.5 shadow-lift hairline">
          {SORTS.map((s) => {
            const active = s.key === sort;
            return (
              <button
                key={s.key}
                onClick={() => {
                  onChange(s.key);
                  setOpen(false);
                }}
                className={`morph-fast flex w-full items-center gap-2 rounded-[12px] px-2.5 py-2 text-left text-[12.5px] font-medium ${
                  active ? "bg-ink text-background" : "text-ink-soft hover:bg-sand hover:text-ink"
                }`}
              >
                <Check
                  className={`h-3.5 w-3.5 ${active ? "opacity-100" : "opacity-0"}`}
                  strokeWidth={2.6}
                />
                {s.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="morph-fast flex items-center gap-1.5 rounded-[10px] bg-ink px-2.5 py-1.5 text-[12px] font-medium text-background">
      {label}
      <button
        onClick={onClear}
        aria-label={`Clear ${label}`}
        className="text-background/60 hover:text-background"
      >
        ×
      </button>
    </span>
  );
}

export function PropertiesResults({
  search,
  onChange,
  slice,
  totalCount,
  onPageChange,
  view,
  onViewChange,
  sort,
  onSortChange,
  featured,
}: {
  search: SearchState;
  onChange: (next: SearchState) => void;
  slice: PageSlice;
  totalCount: number;
  onPageChange: (page: number) => void;
  view: ViewMode;
  onViewChange: (v: ViewMode) => void;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
  featured: Listing[];
}) {
  const resetArea = () => onChange({ ...search, area: "" });
  const resetBeds = () => onChange({ ...search, beds: "Any" });
  const resetPrice = () => onChange({ ...search, price: "Any price" });
  const resetType = () => onChange({ ...search, type: "Any" });
  const clearAll = () =>
    onChange({ ...search, area: "", beds: "Any", price: "Any price", type: "Any" });

  const showChips =
    search.area.trim() !== "" ||
    search.beds !== "Any" ||
    search.price !== "Any price" ||
    search.type !== "Any";

  const crumbs = pageNumbers(slice.page, slice.totalPages);

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[14px] font-medium text-ink">
          {totalCount}
          <span className="text-ink-soft"> listings</span>
        </span>

        {showChips && (
          <div className="flex flex-wrap items-center gap-1.5">
            {search.area.trim() !== "" && <FilterChip label={search.area} onClear={resetArea} />}
            {search.beds !== "Any" && (
              <FilterChip label={`${search.beds} bed`} onClear={resetBeds} />
            )}
            {search.price !== "Any price" && (
              <FilterChip label={search.price} onClear={resetPrice} />
            )}
            {search.type !== "Any" && <FilterChip label={search.type} onClear={resetType} />}
            <button
              onClick={clearAll}
              className="morph-fast flex items-center gap-1.5 rounded-[10px] px-2.5 py-1.5 text-[12.5px] font-semibold text-brand hover:bg-sand"
            >
              <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.2} />
              Clear all
            </button>
          </div>
        )}

        <div className="ml-auto flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end">
          <SortSelect sort={sort} onChange={onSortChange} />

          <div className="relative flex items-center gap-1 rounded-[12px] bg-surface-raised p-1 shadow-soft">
            <span
              aria-hidden
              className="morph pointer-events-none absolute inset-y-1 left-1 z-0 w-8 rounded-[9px] bg-ink shadow-soft"
              style={{
                transform: `translateX(${VIEWS.findIndex((v) => v.key === view) * 36}px)`,
              }}
            />
            {VIEWS.map((v) => {
              const Icon = v.icon;
              const active = view === v.key;
              return (
                <button
                  key={v.key}
                  aria-label={v.label}
                  title={v.label}
                  onClick={() => onViewChange(v.key)}
                  className={`morph-fast relative z-10 flex h-8 w-8 items-center justify-center rounded-[9px] ${
                    active ? "text-background" : "text-ink-soft hover:bg-sand hover:text-ink"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured carousel */}
      {featured.length > 0 && <FeaturedCarousel items={featured} />}

      {/* Content */}
      {slice.items.length > 0 ? (
        <div
          key={view}
          className={`animate-in fade-in duration-300 ${view === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-4"}`}
        >
          {slice.items.map((p, i) => (
            <PropertyCard key={p.id} p={p} view={view} eager={i < 3} />
          ))}
        </div>
      ) : (
        <div className="rounded-[24px] border border-dashed border-border bg-sand/50 p-12 text-center">
          <h3 className="text-[18px] font-semibold text-ink">
            No listings match these filters yet.
          </h3>
          <p className="mx-auto mt-2 max-w-[38ch] text-[13.5px] text-ink-soft">
            Try widening the price range, dropping the bed count, or clearing the area.
          </p>
          <button
            onClick={clearAll}
            className="morph-fast mt-5 rounded-[12px] bg-ink px-4 py-2.5 text-[13px] font-semibold text-background hover:bg-brand"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {slice.totalPages > 1 && (
        <nav
          aria-label="Pagination"
          className="flex flex-wrap items-center justify-center gap-1.5 pt-2"
        >
          <button
            onClick={() => onPageChange(slice.page - 1)}
            disabled={slice.page === 1}
            aria-label="Previous page"
            className="morph-fast flex h-10 w-10 items-center justify-center rounded-[12px] bg-surface-raised text-ink-soft shadow-soft hover:bg-sand hover:text-ink disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          </button>

          {crumbs.map((c, i) =>
            c === "…" ? (
              <span key={`gap-${i}`} className="px-1 text-[13px] text-ink-soft">
                …
              </span>
            ) : (
              <button
                key={c}
                onClick={() => onPageChange(c)}
                aria-current={c === slice.page ? "page" : undefined}
                className={`morph-fast flex h-10 min-w-10 items-center justify-center rounded-[12px] px-2 text-[13px] font-semibold ${
                  c === slice.page
                    ? "bg-ink text-background"
                    : "bg-surface-raised text-ink-soft shadow-soft hover:bg-sand hover:text-ink"
                }`}
              >
                {c}
              </button>
            ),
          )}

          <button
            onClick={() => onPageChange(slice.page + 1)}
            disabled={slice.page === slice.totalPages}
            aria-label="Next page"
            className="morph-fast flex h-10 w-10 items-center justify-center rounded-[12px] bg-surface-raised text-ink-soft shadow-soft hover:bg-sand hover:text-ink disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </nav>
      )}
    </div>
  );
}
