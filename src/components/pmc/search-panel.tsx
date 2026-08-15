import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, SlidersHorizontal } from "lucide-react";
import { BEDS, DEALS, PRICES, countMatches, type SearchState } from "@/lib/listings";
import {
  SERVICE_AREAS,
  SERVICE_CATEGORIES,
  SERVICE_PRICES,
  countServiceMatches,
  type ServiceSearchState,
} from "@/lib/services-search";
import { FilterDrawer } from "./filter-drawer";

type Field = "deal" | "beds" | "price" | "city" | "category" | "budget" | null;

const MODES = [
  { id: "property", label: "Property" },
  { id: "services", label: "Services" },
] as const;

const PILLS = [
  { id: "projects", label: "Projects" },
  { id: "invest", label: "Invest" },
];

export type SearchMode = (typeof MODES)[number]["id"];

export function SearchPanel({
  mode,
  value,
  service,
  onModeChange,
  onChange,
  onServiceChange,
  onSearch,
}: {
  mode: SearchMode;
  value: SearchState;
  service: ServiceSearchState;
  onModeChange: (mode: SearchMode) => void;
  onChange: (next: SearchState) => void;
  onServiceChange: (next: ServiceSearchState) => void;
  onSearch?: (() => void) | undefined;
}) {
  const [open, setOpen] = useState<Field>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const propertyMatches = countMatches(value);
  const serviceMatches = countServiceMatches(service);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const propertyOptions: Record<
    "deal" | "beds" | "price",
    { list: readonly string[]; chosen: string; pick: (v: string) => void }
  > = {
    deal: {
      list: [...DEALS],
      chosen: value.deal,
      pick: (v) => onChange({ ...value, deal: v as "Buy" | "Rent" }),
    },
    beds: { list: BEDS, chosen: value.beds, pick: (v) => onChange({ ...value, beds: v }) },
    price: { list: PRICES, chosen: value.price, pick: (v) => onChange({ ...value, price: v }) },
  };

  const serviceOptions: Record<
    "city" | "category" | "budget",
    { list: readonly string[]; chosen: string; pick: (v: string) => void }
  > = {
    city: {
      list: ["All cities", ...SERVICE_AREAS],
      chosen: service.city || "All cities",
      pick: (v) => onServiceChange({ ...service, city: v === "All cities" ? "" : v }),
    },
    category: {
      list: SERVICE_CATEGORIES,
      chosen: service.category,
      pick: (v) => onServiceChange({ ...service, category: v }),
    },
    budget: {
      list: SERVICE_PRICES,
      chosen: service.price,
      pick: (v) => onServiceChange({ ...service, price: v }),
    },
  };

  const showOptions = (field: Exclude<Field, null>) => {
    if (mode === "property") return propertyOptions[field as "deal" | "beds" | "price"];
    return serviceOptions[field as "city" | "category" | "budget"];
  };

  const Segment = ({
    id,
    label,
    value: display,
    placeholder,
    grow,
  }: {
    id: Exclude<Field, null>;
    label: string;
    value: string;
    placeholder?: string;
    grow?: boolean;
  }) => (
    <button
      onClick={() => setOpen(open === id ? null : id)}
      className={`morph-fast group flex ${grow ? "flex-1" : ""} min-w-0 flex-col items-start gap-0.5 rounded-[12px] px-3 py-2 text-left ${
        open === id ? "bg-sand" : "hover:bg-sand/70"
      }`}
    >
      <span className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
        {label}
      </span>
      <span className="flex w-full items-center gap-1.5 truncate text-[13.5px] font-medium text-ink">
        {placeholder && !value ? (
          <span className="truncate text-ink-soft/70">{placeholder}</span>
        ) : (
          <span className="truncate">{display}</span>
        )}
        <ChevronDown
          className={`morph-fast ml-auto h-3.5 w-3.5 shrink-0 text-ink-soft ${open === id ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </span>
    </button>
  );

  return (
    <div className="w-full max-w-[620px]">
      {/* Projects / Invest pills + Property / Services switch */}
      <div className="mb-2.5 flex flex-wrap items-center justify-center gap-2">
        {PILLS.map((p) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            className="morph-fast group flex items-center gap-1 rounded-full bg-surface-raised px-4 py-1.5 hairline text-[13px] font-medium text-ink shadow-soft hover:bg-ink hover:text-background"
          >
            {p.label}
            <ArrowUpRight
              className="morph-fast h-3.5 w-3.5 text-brand group-hover:text-background"
              strokeWidth={2.4}
            />
          </a>
        ))}

        {/* Property / Services — morphing segmented switch */}
        <div className="relative flex rounded-full bg-surface-raised p-1 shadow-soft hairline">
          <span
            aria-hidden
            className="morph pointer-events-none absolute inset-y-1 left-1 z-0 w-[calc((100%-8px)/2)] rounded-full bg-ink shadow-soft"
            style={{ transform: `translateX(${MODES.findIndex((m) => m.id === mode) * 100}%)` }}
          />
          {MODES.map((m) => {
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onModeChange(m.id)}
                className={`morph-fast relative z-10 rounded-full px-5 py-1.5 text-[13px] font-semibold ${
                  active ? "text-background" : "text-ink-soft hover:text-ink"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`morph w-full rounded-[20px] bg-surface-raised p-1.5 hairline ${
          open ? "shadow-lift" : "shadow-soft"
        }`}
      >
        <div className="flex items-stretch gap-0.5">
          {mode === "property" ? (
            <>
              <Segment id="deal" label="Type" value={value.deal} grow />
              <span className="my-2 w-px bg-border" />
              <Segment id="beds" label="Beds" value={value.beds} />
              <span className="my-2 hidden w-px bg-border sm:block" />
              <div className="hidden sm:contents">
                <Segment id="price" label="Price" value={value.price} />
              </div>
            </>
          ) : (
            <>
              <Segment id="city" label="City" value={service.city || "All cities"} grow />
              <span className="my-2 w-px bg-border" />
              <Segment id="category" label="Service" value={service.category} />
              <span className="my-2 hidden w-px bg-border sm:block" />
              <div className="hidden sm:contents">
                <Segment id="budget" label="Budget" value={service.price} />
              </div>
            </>
          )}

          <button
            aria-label="Open filters"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
            className={`morph-fast ml-0.5 flex h-auto w-11 shrink-0 items-center justify-center rounded-[14px] ${
              drawerOpen ? "bg-ink text-background" : "bg-sand text-ink hover:bg-sand-deep"
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" strokeWidth={2.1} />
          </button>
          <button
            aria-label="Search"
            onClick={onSearch}
            className="morph-fast ml-0.5 flex h-auto w-11 shrink-0 items-center justify-center rounded-[14px] bg-brand text-brand-foreground hover:bg-ink"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
          </button>
        </div>

        {/* Morphs open from within the same surface — stays visually connected */}
        <div
          className={`morph grid overflow-hidden ${open ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="min-h-0">
            <div className="rounded-[15px] bg-sand/60 p-2">
              {open && (
                <div
                  key={`${mode}-${open}`}
                  className="animate-in fade-in slide-in-from-top-1 duration-300"
                >
                  <div className="flex flex-wrap gap-1.5">
                    {showOptions(open)!.list.map((opt) => {
                      const active = showOptions(open!).chosen === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => {
                            showOptions(open!).pick(opt);
                            setOpen(null);
                          }}
                          className={`morph-fast flex items-center gap-1.5 rounded-[10px] px-2.5 py-1.5 text-[12.5px] font-medium ${
                            active
                              ? "bg-ink text-background"
                              : "bg-surface-raised text-ink-soft hover:text-ink"
                          }`}
                        >
                          {active && <Check className="h-3 w-3" strokeWidth={2.6} />}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-2 pb-0.5 px-1 text-left">
                <span className="meta">
                  {mode === "property"
                    ? `${propertyMatches} listings match`
                    : `${serviceMatches} providers match`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FilterDrawer
        mode={mode}
        value={value}
        service={service}
        onChange={onChange}
        onServiceChange={onServiceChange}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSearch={onSearch}
      />
    </div>
  );
}
