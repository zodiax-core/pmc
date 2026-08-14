import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  BadgeCheck,
  Bed,
  Bath,
  Bookmark,
  Check,
  ChevronDown,
  LayoutGrid,
  List,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  RotateCcw,
} from "lucide-react";
import { LazyImage, BrandLogo } from "./image";
import {
  LISTINGS,
  filterListings,
  hasActiveFilters,
  type Listing,
  type SearchState,
} from "@/lib/listings";

type Category = "All" | "Homes" | "Plots" | "Commercial";
type ViewMode = "grid" | "list";

const CATEGORIES: Category[] = ["All", "Homes", "Plots", "Commercial"];

const POPULAR_OPTIONS = [
  "Small Offices",
  "New Offices",
  "On Instalments",
  "Shops",
  "Small Shops",
  "New Shops",
  "Running Shops",
];

const AREA_OPTIONS = ["15+", "10", "5", "3"];

const CATEGORY_MATCH: Record<Exclude<Category, "All">, Listing["type"][]> = {
  Homes: ["House", "Apartment"],
  Plots: ["Plot"],
  Commercial: ["Commercial"],
};

function DrawerSelect({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", onDown);
    return () => window.removeEventListener("pointerdown", onDown);
  }, []);

  const chosen = options.includes(selected) ? selected : "";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`morph-fast flex items-center gap-2 rounded-[12px] bg-surface-raised px-3.5 py-2 text-[13px] font-medium shadow-soft ${
          open ? "ring-2 ring-brand/30" : "hover:bg-sand/60"
        }`}
      >
        <span className={chosen ? "text-ink-soft" : "text-ink"}>
          {label}
          {chosen && <span className="ml-1.5 font-semibold text-ink">{chosen}</span>}
        </span>
        <ChevronDown
          className={`morph-fast h-3.5 w-3.5 text-ink-soft ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {/* Drawer-style panel — slides out left → right from under the trigger */}
      <div className="absolute left-0 top-[calc(100%+10px)] z-20">
        <div
          className={`morph origin-left rounded-[16px] bg-surface-raised p-1.5 shadow-lift hairline ${
            open
              ? "pointer-events-auto translate-x-0 scale-x-100 opacity-100"
              : "pointer-events-none -translate-x-3 scale-x-90 opacity-0"
          }`}
        >
          <div
            className={`morph grid overflow-hidden ${
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0">
              <div className="w-[max-content] min-w-[168px] max-w-[240px] py-0.5">
                {options.map((opt) => {
                  const active = opt === chosen;
                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        onSelect(active ? "" : opt);
                        setOpen(false);
                      }}
                      className={`morph-fast flex w-full items-center gap-2 rounded-[11px] px-2.5 py-2 text-left text-[12.5px] font-medium ${
                        active
                          ? "bg-ink text-background"
                          : "text-ink-soft hover:bg-sand hover:text-ink"
                      }`}
                    >
                      <Check
                        className={`h-3.5 w-3.5 shrink-0 ${active ? "opacity-100" : "opacity-0"}`}
                        strokeWidth={2.6}
                      />
                      <span className="truncate">{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function SellerBadge({ seller }: { seller?: { name: string; logo: string } }) {
  if (!seller) return null;
  return (
    <span
      title={`Sold by ${seller.name}`}
      className="absolute bottom-3 left-3 flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-surface-raised p-0.5 shadow-lift ring-2 ring-background/70"
    >
      <BrandLogo src={seller.logo} name={seller.name} round />
    </span>
  );
}

function ListingActions({ compact }: { compact?: boolean }) {
  const iconBtn = compact ? "h-8 w-8" : "h-9 w-9";
  return (
    <div className={`flex items-center ${compact ? "gap-1" : "gap-1.5"}`}>
      <button
        aria-label="Message seller"
        title="Message"
        className={`morph-fast flex ${iconBtn} items-center justify-center rounded-full bg-sand text-ink hover:bg-sand-deep hover:text-ink`}
      >
        <MessageCircle className="h-4 w-4" strokeWidth={2} />
      </button>
      <button
        aria-label="Call seller"
        title="Call"
        className={`morph-fast flex ${iconBtn} items-center justify-center rounded-full bg-sand text-ink hover:bg-sand-deep hover:text-ink`}
      >
        <Phone className="h-4 w-4" strokeWidth={2} />
      </button>
      <button
        aria-label="Chat on WhatsApp"
        title="WhatsApp"
        className={`morph-fast flex ${iconBtn} items-center justify-center rounded-full bg-sand text-ink hover:bg-sand-deep hover:text-ink`}
      >
        <WhatsAppIcon className="h-4 w-4" />
      </button>
      <button
        className={`morph-fast ml-auto flex items-center gap-1.5 rounded-[11px] bg-ink text-background hover:bg-brand ${
          compact ? "h-8 px-3 text-[12px]" : "h-9 px-3.5 text-[12.5px]"
        } font-semibold`}
      >
        <Mail className="h-3.5 w-3.5" strokeWidth={2.2} />
        Email
      </button>
    </div>
  );
}

function ListingCard({ p, view }: { p: Listing; view: ViewMode }) {
  const grid = view === "grid";
  return (
    <article
      className={`group relative overflow-hidden rounded-[22px] bg-surface-raised shadow-soft ${
        grid ? "flex flex-col" : "flex flex-row items-stretch gap-3 p-3 sm:gap-4 sm:p-4"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden ${
          grid ? "" : "w-28 self-stretch rounded-[14px] sm:w-56"
        }`}
      >
        <LazyImage
          src={p.img}
          alt={p.alt}
          className="h-full w-full"
          imgClassName={
            grid ? "aspect-[4/3] group-hover:scale-[1.04]" : "h-full w-full object-cover"
          }
        />
        {p.badge && grid && (
          <span
            className={`absolute left-3 top-3 flex items-center gap-1 rounded-[9px] px-2 py-1 text-[10px] font-semibold tracking-[0.08em] backdrop-blur-sm ${
              p.badge === "PMC INSPECTED"
                ? "bg-brand-soft/95 text-brand"
                : "bg-ink/85 text-background"
            }`}
          >
            {p.badge === "PMC INSPECTED" && <BadgeCheck className="h-3 w-3" strokeWidth={2.4} />}
            {p.badge}
          </span>
        )}
        <SellerBadge seller={p.seller} />
        <div className="absolute right-2 top-2">
          <Saveable expand={grid} />
        </div>
      </div>

      <div className={`flex min-w-0 flex-1 flex-col ${grid ? "p-4" : "py-0.5"}`}>
        <div className="flex items-center gap-1.5">
          <MapPin className="h-3 w-3 shrink-0 text-ink-soft" strokeWidth={2} />
          <span className="meta truncate">{p.place}</span>
          {p.badge && !grid && (
            <span
              className={`ml-auto flex shrink-0 items-center gap-1 rounded-[8px] px-1.5 py-0.5 text-[9.5px] font-semibold tracking-[0.06em] ${
                p.badge === "PMC INSPECTED" ? "bg-brand-soft text-brand" : "bg-sand text-ink-soft"
              }`}
            >
              {p.badge === "PMC INSPECTED" && (
                <BadgeCheck className="h-2.5 w-2.5" strokeWidth={2.4} />
              )}
              {p.badge}
            </span>
          )}
        </div>
        <div className={`price mt-1 text-ink ${grid ? "text-[21px]" : "text-[19px]"}`}>
          {p.price}
        </div>
        <div className="mt-2 flex items-center gap-2 text-[12px] font-medium text-ink-soft sm:gap-3">
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
          <span
            className={`ml-auto shrink-0 rounded-[8px] bg-sand px-2 py-0.5 text-[10.5px] font-semibold text-ink-soft ${
              grid ? "flex" : "hidden sm:flex"
            }`}
          >
            {p.type}
          </span>
        </div>

        <div className="mt-auto border-t border-border pt-3">
          <ListingActions compact={!grid} />
        </div>
      </div>
    </article>
  );
}

function Saveable({ expand }: { expand?: boolean }) {
  const [saved, setSaved] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setSaved((s) => !s);
      }}
      aria-label={saved ? "Saved" : "Save property"}
      className={`morph flex h-9 items-center justify-center overflow-hidden backdrop-blur-sm ${
        saved
          ? expand
            ? "w-auto gap-1.5 rounded-full bg-brand px-3 text-brand-foreground"
            : "w-9 rounded-full bg-brand text-brand-foreground"
          : "w-9 rounded-full bg-surface-raised/90 text-ink hover:bg-surface-raised"
      }`}
    >
      {saved ? (
        <Check className="h-4 w-4" strokeWidth={2.6} />
      ) : (
        <Bookmark className="h-4 w-4" strokeWidth={2} />
      )}
      <span
        className={`morph text-[11px] font-semibold ${
          saved && expand ? "max-w-[60px] opacity-100" : "max-w-0 opacity-0"
        }`}
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
  const [popular, setPopular] = useState("");
  const [areaSize, setAreaSize] = useState("");
  const [view, setView] = useState<ViewMode>("grid");

  const catRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const nav = catRef.current;
      const btn = nav?.querySelector<HTMLElement>('[data-cat="true"]');
      if (nav && btn) setPill({ left: btn.offsetLeft, width: btn.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [category]);

  const results = useMemo(() => {
    const rs = filterListings(search).filter((l) =>
      category === "All"
        ? true
        : CATEGORY_MATCH[category as Exclude<Category, "All">].includes(l.type),
    );
    return [...rs].sort((a, b) => {
      if (areaSize) return a.sqft - b.sqft;
      return b.popularity - a.popularity;
    });
  }, [search, category, areaSize]);

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
        <div
          ref={catRef}
          className="relative flex items-center gap-1 rounded-[14px] bg-surface-raised p-1 shadow-soft"
        >
          <span
            aria-hidden
            className="morph pointer-events-none absolute bottom-1 top-1 rounded-[11px] bg-ink"
            style={{ left: pill.left, width: pill.width }}
          />
          {CATEGORIES.map((c) => (
            <button
              key={c}
              data-cat={category === c}
              onClick={() => setCategory(c)}
              className={`morph-fast relative z-10 rounded-[11px] px-3.5 py-1.5 text-[13px] font-medium ${
                category === c ? "text-background" : "text-ink-soft hover:text-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mx-1 hidden h-5 w-px bg-border sm:block" />

        <div className="flex items-center gap-2">
          <DrawerSelect
            label="Popular"
            options={POPULAR_OPTIONS}
            selected={popular}
            onSelect={setPopular}
          />
          <DrawerSelect
            label="Area"
            options={AREA_OPTIONS}
            selected={areaSize}
            onSelect={setAreaSize}
          />
        </div>

        {/* Grid / list view toggle */}
        <div className="ml-auto flex items-center gap-1 rounded-[12px] bg-surface-raised p-1 shadow-soft">
          <button
            aria-label="Grid view"
            onClick={() => setView("grid")}
            className={`morph-fast flex h-8 w-8 items-center justify-center rounded-[9px] ${
              view === "grid" ? "bg-ink text-background" : "text-ink-soft hover:text-ink"
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
          <button
            aria-label="List view"
            onClick={() => setView("list")}
            className={`morph-fast flex h-8 w-8 items-center justify-center rounded-[9px] ${
              view === "list" ? "bg-ink text-background" : "text-ink-soft hover:text-ink"
            }`}
          >
            <List className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
      </div>

      {results.length > 0 ? (
        <div
          key={view}
          className={`animate-in fade-in duration-300 mt-6 grid gap-4 ${
            view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : ""
          }`}
        >
          {results.map((p) => (
            <ListingCard key={p.id} p={p} view={view} />
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
