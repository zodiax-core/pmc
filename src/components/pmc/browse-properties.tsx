import { useMemo, useState } from "react";
import {
  ArrowUpDown,
  BadgeCheck,
  Bed,
  Bath,
  Bookmark,
  Check,
  MapPin,
  RotateCcw,
} from "lucide-react";
import {
  LISTINGS,
  filterListings,
  hasActiveFilters,
  type Listing,
  type SearchState,
} from "@/lib/listings";

type Category = "All" | "Homes" | "Plots" | "Commercial";
type SortMode = "Popular" | "Area" | "Area size";

const CATEGORIES: Category[] = ["All", "Homes", "Plots", "Commercial"];
const SORTS: SortMode[] = ["Popular", "Area", "Area size"];

const CATEGORY_MATCH: Record<Exclude<Category, "All">, Listing["type"][]> = {
  Homes: ["House", "Apartment"],
  Plots: ["Plot"],
  Commercial: ["Commercial"],
};

function Saveable() {
  const [saved, setSaved] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setSaved((s) => !s);
      }}
      aria-label={saved ? "Saved" : "Save property"}
      className={`morph flex h-8 items-center gap-1.5 overflow-hidden px-2.5 ${
        saved
          ? "rounded-[10px] bg-brand text-brand-foreground"
          : "w-8 justify-center rounded-[14px] bg-surface-raised/90 text-ink backdrop-blur-sm"
      }`}
    >
      {saved ? (
        <Check className="h-3.5 w-3.5" strokeWidth={2.6} />
      ) : (
        <Bookmark className="h-3.5 w-3.5" strokeWidth={1.9} />
      )}
      <span
        className={`morph text-[11px] font-semibold ${saved ? "max-w-[60px] opacity-100" : "max-w-0 opacity-0"}`}
      >
        Saved
      </span>
    </button>
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

export function BrowseProperties({
  search,
  onChange,
}: {
  search: SearchState;
  onChange: (next: SearchState) => void;
}) {
  const [category, setCategory] = useState<Category>("All");
  const [sort, setSort] = useState<SortMode>("Popular");

  const results = useMemo(() => {
    const rs = filterListings(search).filter((l) =>
      category === "All"
        ? true
        : CATEGORY_MATCH[category as Exclude<Category, "All">].includes(l.type),
    );
    return [...rs].sort((a, b) => {
      if (sort === "Popular") return b.popularity - a.popularity;
      if (sort === "Area size") return a.sqft - b.sqft;
      return a.place.localeCompare(b.place);
    });
  }, [search, category, sort]);

  const filtered = hasActiveFilters(search);

  const chip = (key: keyof SearchState, label?: string) => ({
    active:
      key === "area"
        ? search.area.trim() !== ""
        : search[key] !== "Any" && search[key] !== "Any price",
    label: label ?? String(search[key]),
    clear: () => onChange({ ...search, [key]: key === "area" ? "" : "Any" }),
  });

  return (
    <section id="browse" className="mx-auto max-w-[1240px] scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <span className="label-eyebrow">Browse properties</span>
          <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.02] font-semibold text-ink">
            Results, matched to your intent.
          </h2>
          <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-ink-soft">
            {filtered
              ? `${results.length} of ${LISTINGS.length} preview listings match your search — set above. 2,418 inspected listings live on PMC.`
              : `Showing ${results.length} featured previews from 2,418 inspected listings — use the search above to narrow by area, beds, price or type.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {filtered && (
            <>
              <FilterChip {...chip("area")} />
              <FilterChip {...chip("beds")} />
              <FilterChip {...chip("price")} />
              <FilterChip {...chip("type")} />
              <button
                onClick={() =>
                  onChange({ ...search, area: "", beds: "Any", price: "Any price", type: "Any" })
                }
                className="morph-fast flex items-center gap-1.5 rounded-[10px] px-2.5 py-1.5 text-[12.5px] font-semibold text-brand hover:bg-sand"
              >
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.2} /> Clear all
              </button>
            </>
          )}
        </div>
      </div>

      {/* Category + sort controls */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 rounded-[14px] bg-surface-raised p-1 shadow-soft">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`morph-fast rounded-[11px] px-3.5 py-1.5 text-[13px] font-medium ${
                category === c ? "bg-ink text-background" : "text-ink-soft hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mx-1 hidden h-5 w-px bg-border sm:block" />

        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="h-3.5 w-3.5 text-ink-soft" strokeWidth={2} />
          {SORTS.map((s) => (
            <button
              key={s}
              onClick={() => setSort(s)}
              className={`morph-fast rounded-[10px] px-3 py-1.5 text-[12.5px] font-medium ${
                sort === s ? "bg-sand text-ink" : "text-ink-soft hover:text-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((p) => (
            <article
              key={p.id}
              className="group relative overflow-hidden rounded-[22px] bg-surface-raised shadow-soft"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.img}
                  alt={p.alt}
                  width={800}
                  height={600}
                  loading="lazy"
                  className="morph aspect-[4/3] h-full w-full object-cover group-hover:scale-[1.04]"
                />
                {p.badge && (
                  <span
                    className={`absolute left-3 top-3 flex items-center gap-1 rounded-[9px] px-2 py-1 text-[10px] font-semibold tracking-[0.08em] backdrop-blur-sm ${
                      p.badge === "PMC INSPECTED"
                        ? "bg-brand-soft/95 text-brand"
                        : "bg-ink/85 text-background"
                    }`}
                  >
                    {p.badge === "PMC INSPECTED" && (
                      <BadgeCheck className="h-3 w-3" strokeWidth={2.4} />
                    )}
                    {p.badge}
                  </span>
                )}
                <div className="absolute right-3 top-3">
                  <Saveable />
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 shrink-0 text-ink-soft" strokeWidth={2} />
                  <span className="meta truncate">{p.place}</span>
                </div>
                <div className="price mt-1 text-[21px] text-ink">{p.price}</div>
                <div className="mt-2.5 flex items-center gap-3 border-t border-border pt-2.5 text-[12px] font-medium text-ink-soft">
                  {p.beds > 0 && (
                    <span className="flex items-center gap-1">
                      <Bed className="h-3.5 w-3.5" strokeWidth={1.8} />
                      {p.beds}
                    </span>
                  )}
                  {p.baths > 0 && (
                    <span className="flex items-center gap-1">
                      <Bath className="h-3.5 w-3.5" strokeWidth={1.8} />
                      {p.baths}
                    </span>
                  )}
                  <span className="truncate">{p.area}</span>
                  <span className="ml-auto rounded-[8px] bg-sand px-2 py-0.5 text-[10.5px] font-semibold text-ink-soft">
                    {p.type}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-[24px] border border-dashed border-border bg-sand/50 p-12 text-center">
          <h3 className="text-[18px] font-semibold text-ink">
            No listings match these filters yet.
          </h3>
          <p className="mx-auto mt-2 max-w-[38ch] text-[13.5px] text-ink-soft">
            Try widening the price range, dropping the bed count, or clearing the area.
          </p>
          <button
            onClick={() =>
              onChange({ ...search, area: "", beds: "Any", price: "Any price", type: "Any" })
            }
            className="morph-fast mt-5 rounded-[12px] bg-ink px-4 py-2.5 text-[13px] font-semibold text-background hover:bg-brand"
          >
            Clear all filters
          </button>
        </div>
      )}
    </section>
  );
}
