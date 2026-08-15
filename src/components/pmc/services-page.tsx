import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
  Search,
  LayoutGrid,
  List,
} from "lucide-react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { LazyImage } from "./image";
import { FilterDrawer } from "./filter-drawer";
import { PACKAGES, SERVICE_GROUPS, serviceFromText } from "@/lib/services";
import {
  DEFAULT_SERVICE_SEARCH,
  SERVICE_GROUP_OPTIONS,
  SERVICE_PRICES,
  servicesForGroup,
  type ServiceSearchState,
} from "@/lib/services-search";
import roomLiving from "@/assets/room-living.jpg";
import roomKitchen from "@/assets/room-kitchen.jpg";
import roomBedroom from "@/assets/room-bedroom.jpg";
import propLarge from "@/assets/prop-large.jpg";
import propMed1 from "@/assets/prop-med-1.jpg";
import propMed2 from "@/assets/prop-med-2.jpg";
import propSmall from "@/assets/prop-small.jpg";
import heroHouse from "@/assets/hero-house-opt.jpg";

/* ---------------- WhatsApp / Message icons ---------------- */

function WhatsAppIcon({ className, strokeWidth }: { className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 21l1.65-4.9A8.5 8.5 0 1 1 7.9 19.35L3 21z" />
      <path d="M8.5 10.5c.5 2 3 4.5 5 5l1.5-1.5 2 .5" />
    </svg>
  );
}

/* ---------------- Dropdown (shared) ---------------- */

type DField = "group" | "category" | "budget" | null;

function Dropdown({
  id,
  label,
  value,
  options,
  open,
  onOpen,
  onPick,
}: {
  id: Exclude<DField, null>;
  label: string;
  value: string;
  options: readonly string[];
  open: DField;
  onOpen: (id: DField) => void;
  onPick: (v: string) => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onOpen(open === id ? null : id)}
        aria-expanded={open === id}
        className={`morph-fast flex h-11 items-center gap-2 rounded-[14px] px-3.5 text-[13px] font-medium ${
          open === id
            ? "bg-ink text-background"
            : "bg-sand/70 text-ink-soft hover:bg-sand hover:text-ink"
        }`}
      >
        <span className="truncate">
          {label}
          <span className="ml-1.5 font-semibold text-ink">{value}</span>
        </span>
        <ChevronDown
          className={`morph-fast h-3.5 w-3.5 shrink-0 ${open === id ? "rotate-180 text-background" : "text-ink-soft"}`}
          strokeWidth={2}
        />
      </button>

      {open === id && (
        <div className="absolute left-0 top-[calc(100%+10px)] z-30 max-h-[min(70vh,420px)] w-[max-content] min-w-[190px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 rounded-[18px] bg-surface-raised p-1.5 shadow-lift hairline">
          {options.map((opt) => {
            const active = opt === value;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onPick(opt);
                  onOpen(null);
                }}
                className={`morph-fast flex w-full items-center gap-2 rounded-[12px] px-2.5 py-2 text-left text-[12.5px] font-medium ${
                  active ? "bg-ink text-background" : "text-ink-soft hover:bg-sand hover:text-ink"
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
      )}
    </div>
  );
}

/* ---------------- Main search bar with category → service cascade ---------------- */

function ServiceSearchBar({
  value,
  onChange,
  onSearch,
}: {
  value: ServiceSearchState;
  onChange: (next: ServiceSearchState) => void;
  onSearch: () => void;
}) {
  const [open, setOpen] = useState<DField>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const serviceOptions = servicesForGroup(value.group);

  const pickGroup = (g: string) => {
    if (g === "All categories") {
      onChange({ ...value, group: "", category: "Any service" });
    } else {
      onChange({ ...value, group: g, category: "Any service" });
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="w-full rounded-[26px] bg-surface-raised p-2 shadow-soft hairline"
    >
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="relative min-w-0">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
            strokeWidth={2}
          />
          <input
            value={value.city}
            onChange={(e) => onChange({ ...value, city: e.target.value })}
            placeholder="City, area or society — e.g. DHA Phase 6"
            className="h-11 w-full rounded-[16px] bg-sand/70 pl-10 pr-4 text-[13.5px] font-medium text-ink outline-none placeholder:text-ink-soft/70 focus:ring-2 focus:ring-brand/30"
          />
        </div>

        <button
          type="submit"
          className="morph-fast flex h-11 shrink-0 items-center justify-center gap-2 rounded-[16px] bg-brand px-5 text-[13.5px] font-semibold text-brand-foreground hover:bg-ink"
        >
          Search
          <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
        </button>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <Dropdown
          id="group"
          label="Category"
          value={value.group || "All categories"}
          options={["All categories", ...SERVICE_GROUP_OPTIONS]}
          open={open}
          onOpen={setOpen}
          onPick={pickGroup}
        />
        <Dropdown
          id="category"
          label="Service"
          value={value.category}
          options={serviceOptions}
          open={open}
          onOpen={setOpen}
          onPick={(v) => onChange({ ...value, category: v })}
        />
        <Dropdown
          id="budget"
          label="Budget"
          value={value.price}
          options={SERVICE_PRICES}
          open={open}
          onOpen={setOpen}
          onPick={(v) => onChange({ ...value, price: v })}
        />

        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="morph-fast flex h-11 items-center gap-2 rounded-[14px] px-3.5 text-[13px] font-medium text-ink-soft hover:bg-sand hover:text-ink"
        >
          More filters
        </button>

        <span className="meta ml-auto hidden sm:block">Press Enter to search</span>
      </div>

      <FilterDrawer
        mode="services"
        value={{ area: "", beds: "Any", price: "Any price", type: "Any", deal: "Buy" }}
        service={value}
        onChange={() => {}}
        onServiceChange={onChange}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSearch={onSearch}
      />
    </form>
  );
}

/* ---------------- Service image lookup ---------------- */

const SERVICE_IMG: Record<string, string> = {
  plumbing: roomKitchen,
  electrical: propMed1,
  carpentry: propMed2,
  ac: roomLiving,
  appliance: propSmall,
  cleaning: roomLiving,
  "deep-cleaning": roomKitchen,
  pest: propMed2,
  gardening: propMed1,
  painting: roomBedroom,
  renovation: propLarge,
  interior: heroHouse,
  flooring: propLarge,
  moving: propMed2,
  packing: propSmall,
  security: propMed1,
  "water-tank": propMed2,
  solar: heroHouse,
};

function serviceImage(id: string): string {
  return SERVICE_IMG[id] ?? `https://picsum.photos/seed/svc-${id}/600/420`;
}

/* ---------------- Service cards (grid / list) ---------------- */

type ViewMode = "grid" | "list";

function ServiceCard({
  service,
  view,
  rating,
}: {
  service: { id: string; name: string; short: string; from: string };
  view: ViewMode;
  rating: number;
}) {
  const img = serviceImage(service.id);

  if (view === "list") {
    return (
      <article className="group flex flex-row items-stretch gap-2.5 rounded-[20px] bg-surface-raised p-2.5 shadow-soft hairline transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lift sm:gap-5 sm:p-5">
        <div className="w-36 shrink-0 self-stretch overflow-hidden rounded-[14px] sm:w-52 sm:rounded-[16px] lg:w-72">
          <LazyImage
            src={img}
            alt={service.name}
            className="h-full w-full"
            imgClassName="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col py-0.5">
          <div className="flex items-center gap-1.5">
            <Star
              className="h-3.5 w-3.5 shrink-0 fill-warn text-warn sm:h-4 sm:w-4"
              strokeWidth={1}
            />
            <span className="text-[11.5px] font-medium text-ink-soft sm:text-[12.5px]">
              {rating} rated
            </span>
          </div>
          <h3 className="mt-1 text-[15.5px] font-semibold text-ink sm:text-[16px]">
            {service.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-[12.5px] leading-relaxed text-ink-soft">
            {service.short}
          </p>
          <div className="meta mt-1.5">Starting from</div>
          <div className="price text-[16px] text-ink sm:text-[22px]">{service.from}</div>

          <div className="mt-auto flex items-center gap-1.5 pt-3 sm:pt-4">
            <button
              aria-label="Message"
              className="morph-fast flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-sand text-ink hover:bg-sand-deep hover:text-ink sm:h-10 sm:w-10"
            >
              <MessageCircleIcon className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              aria-label="WhatsApp"
              className="morph-fast flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] bg-sand text-ink hover:bg-sand-deep hover:text-ink sm:h-10 sm:w-10"
            >
              <WhatsAppIcon className="h-4 w-4" strokeWidth={2} />
            </button>
            <button className="morph-fast ml-auto flex h-9 shrink-0 items-center gap-1.5 rounded-[11px] bg-ink px-3 text-[11.5px] font-semibold text-background hover:bg-brand sm:h-10 sm:px-4 sm:text-[12.5px]">
              Request
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-[22px] bg-surface-raised shadow-soft hairline transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lift">
      <div className="relative h-40 shrink-0 overflow-hidden">
        <LazyImage
          src={img}
          alt={service.name}
          className="h-full w-full"
          imgClassName="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
        <span className="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-[10px] bg-surface-raised/90 px-2 py-1 text-[11px] font-semibold text-ink shadow-soft backdrop-blur-sm">
          <Star className="h-3 w-3 fill-warn text-warn" strokeWidth={1} />
          {rating}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-[17px] font-semibold text-ink">{service.name}</h3>
        <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{service.short}</p>

        <div className="mt-4 flex items-center gap-2 rounded-[14px] bg-sand/60 px-3.5 py-2.5">
          <span className="flex-1">
            <span className="meta block">Starting from</span>
            <span className="price text-[16px] text-ink">{service.from}</span>
          </span>
          <ArrowUpRight className="h-4 w-4 text-ink-soft" strokeWidth={2} />
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            aria-label="Message"
            className="morph-fast flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-sand text-ink hover:bg-sand-deep hover:text-ink"
          >
            <MessageCircleIcon className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            aria-label="WhatsApp"
            className="morph-fast flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-sand text-ink hover:bg-sand-deep hover:text-ink"
          >
            <WhatsAppIcon className="h-4 w-4" strokeWidth={2} />
          </button>
          <button className="morph-fast flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-[12px] bg-ink px-3 text-[12.5px] font-semibold text-background hover:bg-brand">
            Request
            <ArrowUpRight
              className="morph-fast h-4 w-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.2}
            />
          </button>
        </div>
      </div>
    </article>
  );
}

function MessageCircleIcon({
  className,
  strokeWidth,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth ?? 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.2 0-2.4-.25-3.5-.7L3 21l1.7-6A8.5 8.5 0 1 1 21 11.5z" />
    </svg>
  );
}

/* ---------------- Pagination ---------------- */

function Pagination({
  page,
  pageCount,
  onPage,
}: {
  page: number;
  pageCount: number;
  onPage: (p: number) => void;
}) {
  if (pageCount <= 1) return null;
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Previous page"
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="morph-fast flex h-10 w-10 items-center justify-center rounded-[12px] bg-surface-raised text-ink shadow-soft hairline hover:bg-sand disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" strokeWidth={2.2} />
      </button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onPage(n)}
          aria-current={n === page ? "page" : undefined}
          className={`morph-fast flex h-10 min-w-10 items-center justify-center rounded-[12px] px-3 text-[13px] font-semibold ${
            n === page
              ? "bg-ink text-background"
              : "bg-surface-raised text-ink-soft shadow-soft hairline hover:text-ink"
          }`}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        aria-label="Next page"
        onClick={() => onPage(Math.min(pageCount, page + 1))}
        disabled={page >= pageCount}
        className="morph-fast flex h-10 w-10 items-center justify-center rounded-[12px] bg-surface-raised text-ink shadow-soft hairline hover:bg-sand disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2.2} />
      </button>
    </div>
  );
}

/* ---------------- Sections ---------------- */

function ServicesHero({
  service,
  onChange,
  onSearch,
}: {
  service: ServiceSearchState;
  onChange: (next: ServiceSearchState) => void;
  onSearch: () => void;
}) {
  return (
    <section className="mx-auto max-w-[1240px] scroll-mt-28 px-4 pt-28 sm:px-6 sm:pt-32">
      <span className="label-eyebrow">Property services</span>
      <h1 className="mt-3 max-w-[22ch] text-[clamp(2.1rem,4.4vw,3.4rem)] leading-[0.98] font-semibold text-ink">
        Everything your property needs, done right.
      </h1>
      <p className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-ink-soft">
        Find trusted services for every job — pick a category, choose a service, and compare prices.
      </p>

      <div className="mt-8">
        <ServiceSearchBar value={service} onChange={onChange} onSearch={onSearch} />
      </div>
    </section>
  );
}

function ServicesResults({
  service,
  onChange,
}: {
  service: ServiceSearchState;
  onChange: (next: ServiceSearchState) => void;
}) {
  const [view, setView] = useState<ViewMode>("grid");
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    const q = service.city.trim().toLowerCase();
    let list = SERVICE_GROUPS.flatMap((g) => g.services).filter((s) => {
      if (service.category !== "Any service" && s.name !== service.category) return false;
      if (
        service.group &&
        !SERVICE_GROUPS.find((g) => g.title === service.group)?.services.some((x) => x.id === s.id)
      )
        return false;
      if (q && !(s.name.toLowerCase().includes(q) || s.short.toLowerCase().includes(q)))
        return false;
      return true;
    });
    if (service.price !== "Any budget") {
      const [lo, hi] =
        service.price === "Under 5k"
          ? [0, 5000]
          : service.price === "5 – 20k"
            ? [5000, 20000]
            : service.price === "20 – 50k"
              ? [20000, 50000]
              : [50000, Infinity];
      list = list.filter((s) => {
        const n = parseInt(s.from.replace(/[^\d]/g, ""), 10);
        return Number.isFinite(n) && n >= lo && n < hi;
      });
    }
    return list;
  }, [service]);

  const PAGE_SIZE = 6;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [service]);

  const goPage = (p: number) => {
    setPage(p);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const VIEWS: { id: ViewMode; icon: typeof LayoutGrid }[] = [
    { id: "grid", icon: LayoutGrid },
    { id: "list", icon: List },
  ];

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1240px] scroll-mt-28 px-4 pt-14 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="label-eyebrow">Services</span>
          <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.02] font-semibold text-ink">
            {service.category === "Any service"
              ? "What do you need?"
              : `${service.category} services`}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="meta">{filtered.length} services</span>
          {/* Grid / List toggle */}
          <div className="relative flex rounded-[12px] bg-surface-raised p-1 shadow-soft hairline">
            <span
              aria-hidden
              className="morph pointer-events-none absolute inset-y-1 left-1 z-0 w-[calc((100%-8px)/2)] rounded-[9px] bg-ink shadow-soft"
              style={{ transform: `translateX(${VIEWS.findIndex((v) => v.id === view) * 100}%)` }}
            />
            {VIEWS.map((v) => {
              const Icon = v.icon;
              const active = view === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setView(v.id)}
                  aria-label={`${v.id} view`}
                  className={`morph-fast relative z-10 flex h-8 w-8 items-center justify-center rounded-[9px] ${
                    active ? "text-background" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-[22px] bg-sand/60 p-8 text-center">
          <p className="text-[15px] font-semibold text-ink">No services match those filters.</p>
          <p className="meta mt-1">Try another category, city or budget.</p>
        </div>
      ) : view === "grid" ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {paged.map((s) => (
            <ServiceCard
              key={s.id}
              service={{ id: s.id, name: s.name, short: s.short, from: s.from }}
              view="grid"
              rating={4.8}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 space-y-3">
          {paged.map((s) => (
            <ServiceCard
              key={s.id}
              service={{ id: s.id, name: s.name, short: s.short, from: s.from }}
              view="list"
              rating={4.8}
            />
          ))}
        </div>
      )}

      <Pagination page={page} pageCount={pageCount} onPage={goPage} />
    </section>
  );
}

const TAG_FILTERS = [
  { id: "all", label: "All bundles" },
  { id: "move", label: "Move & Moving" },
  { id: "care", label: "Care & Maintenance" },
  { id: "cleaning", label: "Cleaning" },
  { id: "garden", label: "Garden" },
  { id: "security", label: "Security" },
  { id: "handyman", label: "Handyman" },
] as const;

function Packages() {
  const [tag, setTag] = useState<string>("all");
  const [fullOnly, setFullOnly] = useState(false);
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const filtered = useMemo(() => {
    let list = PACKAGES;
    if (tag !== "all") list = list.filter((p) => p.tag === tag);
    if (fullOnly) list = list.filter((p) => p.full);
    return list;
  }, [tag, fullOnly]);

  const PAGE_SIZE = 6;
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [tag, fullOnly]);

  const goPage = (p: number) => {
    setPage(p);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollBy = (dir: number) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1240px] scroll-mt-28 px-4 pt-20 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="label-eyebrow">Bundles</span>
          <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.02] font-semibold text-ink">
            Get more done in one request.
          </h2>
        </div>
        <span className="meta">Curated by PMC, delivered by verified providers</span>
      </div>

      {/* Bundle filters */}
      <div className="mt-6 flex flex-wrap items-center gap-1.5">
        {TAG_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setTag(f.id)}
            className={`morph-fast rounded-[11px] px-3 py-2 text-[12.5px] font-semibold ${
              tag === f.id
                ? "bg-ink text-background"
                : "bg-surface-raised text-ink-soft shadow-soft hairline hover:text-ink"
            }`}
          >
            {f.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => setFullOnly((v) => !v)}
          aria-pressed={fullOnly}
          className={`morph-fast flex items-center gap-1.5 rounded-[11px] px-3 py-2 text-[12.5px] font-semibold ${
            fullOnly
              ? "bg-brand text-brand-foreground"
              : "bg-surface-raised text-ink-soft shadow-soft hairline hover:text-ink"
          }`}
        >
          <Check
            className={`h-3.5 w-3.5 ${fullOnly ? "opacity-100" : "opacity-0"}`}
            strokeWidth={2.6}
          />
          Full home package
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-8 rounded-[22px] bg-sand/60 p-8 text-center">
          <p className="text-[15px] font-semibold text-ink">No bundles match that filter.</p>
          <p className="meta mt-1">Try another category or clear the full-package filter.</p>
        </div>
      ) : (
        <>
          <div className="relative mt-8">
            {/* Mobile scroll arrows */}
            <button
              type="button"
              aria-label="Scroll bundles left"
              onClick={() => scrollBy(-1)}
              className="morph-fast absolute -left-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface-raised text-ink shadow-lift hairline lg:hidden"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
            </button>
            <button
              type="button"
              aria-label="Scroll bundles right"
              onClick={() => scrollBy(1)}
              className="morph-fast absolute -right-2 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface-raised text-ink shadow-lift hairline lg:hidden"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.2} />
            </button>

            <div
              ref={scrollerRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:pb-0"
            >
              {paged.map((p) => (
                <article
                  key={p.name}
                  className="relative flex min-w-[280px] max-w-[280px] snap-start flex-col rounded-[22px] bg-surface-raised p-6 shadow-soft hairline transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lift lg:min-w-0 lg:max-w-none"
                >
                  {p.badge && (
                    <span className="absolute right-4 top-4 rounded-[9px] bg-brand px-2 py-1 text-[10px] font-semibold tracking-[0.06em] text-brand-foreground">
                      {p.badge.toUpperCase()}
                    </span>
                  )}

                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-ink text-background">
                      {p.kind === "organization" ? (
                        <Building2 className="h-5 w-5" strokeWidth={1.8} />
                      ) : (
                        <span className="text-[13px] font-bold">{initials(p.provider)}</span>
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[13.5px] font-semibold text-ink">
                        {p.provider}
                      </div>
                      <div className="meta">
                        {p.kind === "organization" ? "Organization" : "Professional"}
                      </div>
                    </div>
                  </div>

                  <h3 className="mt-4 text-[17px] font-semibold text-ink">{p.name}</h3>
                  <p className="mt-1 text-[12.5px] text-ink-soft">{p.tagline}</p>

                  <ul className="mt-4 space-y-2">
                    {p.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[13px] text-ink">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-soft text-brand">
                          <Check className="h-3 w-3" strokeWidth={2.8} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center justify-between pt-6">
                    <div className="price text-[18px] text-ink">{p.price}</div>
                    <button className="morph-fast flex items-center gap-1.5 rounded-[12px] bg-ink px-4 py-2.5 text-[12.5px] font-semibold text-background hover:bg-brand">
                      Request
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <Pagination page={page} pageCount={pageCount} onPage={goPage} />
        </>
      )}
    </section>
  );
}

function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0] ?? "")
    .join("")
    .toUpperCase();
}

function AiDiscovery() {
  const [query, setQuery] = useState("");
  const [resolved, setResolved] = useState<{ name: string; range: string } | null>(null);

  const resolve = () => {
    const s = serviceFromText(query);
    setResolved(s ? { name: s.name, range: s.range ?? s.from } : null);
  };

  return (
    <section className="mx-auto max-w-[1240px] px-4 pt-20 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div>
          <span className="label-eyebrow">AI service discovery</span>
          <h2 className="mt-3 max-w-[22ch] text-[clamp(1.8rem,3.2vw,2.5rem)] leading-[1.03] font-semibold text-ink">
            Tell PMC what you need.
          </h2>
          <p className="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-ink-soft">
            Describe the problem in your own words — PMC matches it to the right service and price
            range.
          </p>
        </div>

        <div className="rounded-[26px] bg-surface-raised p-2 shadow-soft hairline">
          <div className="flex flex-wrap items-center gap-3 rounded-[18px] bg-sand/70 p-2.5 pl-4">
            <Sparkles className="h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  resolve();
                }
              }}
              placeholder='e.g. "My kitchen sink is leaking."'
              className="min-w-0 flex-1 bg-transparent text-[13.5px] font-medium text-ink outline-none placeholder:text-ink-soft/60"
            />
            <button
              onClick={resolve}
              className="morph-fast flex shrink-0 items-center gap-1.5 rounded-[12px] bg-ink px-4 py-2 text-[12.5px] font-semibold text-background hover:bg-brand"
            >
              Resolve
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.2} />
            </button>
          </div>

          <div className="px-1.5 pb-1.5 pt-2">
            {resolved ? (
              <div className="morph-fast animate-in fade-in slide-in-from-bottom-1 duration-300 flex flex-wrap items-center gap-3 rounded-[16px] bg-brand-soft/60 p-3">
                <span className="text-[13px] font-medium text-ink">Sounds like</span>
                <span className="flex items-center gap-1.5 rounded-[10px] bg-brand px-2.5 py-1 text-[12px] font-semibold text-brand-foreground">
                  {resolved.name}
                </span>
                <span className="meta">Typical range: PKR {resolved.range}</span>
                <button className="morph-fast ml-auto flex items-center gap-1 rounded-[11px] bg-ink px-3 py-2 text-[12px] font-semibold text-background hover:bg-brand">
                  Find providers
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {[
                  "My AC isn't cooling",
                  "Deep cleaning before moving in",
                  "Paint my 10 marla house",
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="morph-fast rounded-[10px] bg-sand/70 px-2.5 py-1.5 text-left text-[11.5px] font-medium text-ink-soft hover:bg-sand hover:text-ink"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const slides = [
    { img: roomKitchen, label: "Kitchen deep clean" },
    { img: roomLiving, label: "Living room refresh" },
    { img: roomBedroom, label: "Bedroom repaint" },
  ];
  return (
    <section className="mx-auto max-w-[1240px] px-4 pt-20 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div>
          <span className="label-eyebrow">Real results</span>
          <h2 className="mt-3 max-w-[24ch] text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.02] font-semibold text-ink">
            See the work before you book.
          </h2>
          <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-ink-soft">
            Before-and-after photos from real PMC jobs on painting, cleaning, renovation and
            carpentry. What you see is what our providers deliver.
          </p>
          <button className="morph-fast mt-6 flex items-center gap-2 rounded-[13px] bg-ink px-5 py-3 text-[13px] font-semibold text-background hover:bg-brand">
            Browse project photos
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {slides.map((s) => (
            <div
              key={s.label}
              className="group overflow-hidden rounded-[20px] shadow-soft hairline"
            >
              <LazyImage
                src={s.img}
                alt={s.label}
                className="aspect-[4/5] w-full"
                imgClassName="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="bg-surface-raised px-3 py-2.5">
                <div className="truncate text-[12.5px] font-semibold text-ink">{s.label}</div>
                <div className="meta">Completed by a PMC provider</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["Tell us what you need", "Choose a category and a service."],
    ["Compare prices", "See transparent pricing across providers."],
    ["Get it done", "Book, communicate and track the service live."],
  ];
  return (
    <section className="mx-auto max-w-[1240px] px-4 pt-20 sm:px-6">
      <div className="rounded-[26px] bg-sand/70 p-6 sm:p-9">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="label-eyebrow">How it works</span>
            <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.04] font-semibold text-ink">
              Get it done in three steps.
            </h2>
          </div>
          <span className="meta">From request to resolved</span>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          {steps.map(([t, d], i) => (
            <div key={t} className="rounded-[18px] bg-surface-raised p-5 shadow-soft">
              <span className="price text-[13px] font-semibold text-brand">0{i + 1}</span>
              <div className="mt-2 text-[15px] font-semibold text-ink">{t}</div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 pt-20 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        <div className="rounded-[26px] bg-surface-raised p-6 shadow-soft hairline sm:p-8">
          <div className="flex items-end justify-between">
            <div>
              <div className="price text-[56px] leading-none text-ink">4.9</div>
              <div className="mt-2 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-warn text-warn" strokeWidth={1} />
                ))}
              </div>
            </div>
            <span className="meta">127 completed jobs</span>
          </div>
          <div className="mt-6 rounded-[16px] bg-sand/60 p-4">
            <p className="text-[14px] leading-relaxed text-ink">
              "Arrived on time and fixed the issue quickly. Clean, professional and the price was
              exactly what was quoted."
            </p>
            <div className="mt-3 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-background">
                ZA
              </span>
              <div>
                <div className="text-[12.5px] font-semibold text-ink">Zainab A.</div>
                <div className="meta">DHA Phase 6 · Plumbing</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <span className="label-eyebrow">Trusted feedback</span>
          <h2 className="mt-3 max-w-[22ch] text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.02] font-semibold text-ink">
            Reviews from real properties.
          </h2>
          <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-ink-soft">
            Every review is tied to a completed job on a verified property — not anonymous
            marketing.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              ["4.8", "Deep Cleaning", "Sana K."],
              ["4.9", "AC Service", "Omar F."],
            ].map(([r, s, n]) => (
              <div key={s} className="rounded-[18px] bg-surface-raised p-4 shadow-soft hairline">
                <div className="flex items-center gap-2">
                  <span className="price text-[20px] text-ink">{r}</span>
                  <span className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-3 w-3 fill-warn text-warn" strokeWidth={1} />
                    ))}
                  </span>
                </div>
                <div className="mt-1.5 text-[13px] font-semibold text-ink">{s}</div>
                <div className="meta">{n} · verified job</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProviderOpportunity() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 pt-20 sm:px-6">
      <div className="rounded-[26px] bg-ink p-6 text-background sm:p-9 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8">
        <div>
          <span className="label-eyebrow text-background/55">For local pros & companies</span>
          <h2 className="mt-3 max-w-[28ch] text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.04] font-semibold text-background">
            Have a skill? Get more work.
          </h2>
          <p className="mt-3 max-w-[48ch] text-[14px] leading-relaxed text-background/60">
            Individuals and organizations — PMC is your platform. You bring the skill, we bring
            verified demand, scheduling and payments.
          </p>
        </div>
        <button className="morph-fast mt-6 flex w-fit items-center gap-2 rounded-[14px] bg-background px-6 py-3.5 text-[14px] font-semibold text-ink shadow-lift hover:bg-brand hover:text-brand-foreground lg:mt-0">
          Join as a provider
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
        </button>
      </div>
    </section>
  );
}

export function ServicesPage({
  initialService = DEFAULT_SERVICE_SEARCH,
}: {
  initialService?: ServiceSearchState;
}) {
  const [service, setService] = useState<ServiceSearchState>(initialService);
  const resultsRef = useRef<HTMLDivElement | null>(null);
  const scroll = () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <ServicesHero service={service} onChange={setService} onSearch={scroll} />
        <div ref={resultsRef} id="results" className="scroll-mt-24">
          <ServicesResults service={service} onChange={setService} />
        </div>
        <Packages />
        <AiDiscovery />
        <BeforeAfter />
        <HowItWorks />
        <Reviews />
        <div className="pb-20">
          <ProviderOpportunity />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
