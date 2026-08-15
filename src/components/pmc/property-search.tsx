import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { BEDS, DEALS, PRICES, TYPES, type SearchState } from "@/lib/listings";
import { FilterDrawer } from "./filter-drawer";

function Select({
  label,
  options,
  chosen,
  active,
  onPick,
}: {
  label: string;
  options: readonly string[];
  chosen: string;
  active: boolean;
  onPick: (v: string) => void;
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

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`morph-fast flex h-11 items-center gap-2 rounded-[14px] px-3.5 text-[13px] font-medium ${
          open
            ? "bg-ink text-background"
            : active
              ? "bg-sand text-ink"
              : "bg-sand/70 text-ink-soft hover:bg-sand hover:text-ink"
        }`}
      >
        <span className={open || active ? "text-background/70" : ""}>
          {label}
          {active && (
            <span
              className={
                open ? "ml-1.5 font-semibold text-background" : "ml-1.5 font-semibold text-ink"
              }
            >
              {chosen}
            </span>
          )}
        </span>
        <ChevronDown
          className={`morph-fast h-3.5 w-3.5 ${open ? "rotate-180 text-background" : "text-ink-soft"}`}
          strokeWidth={2}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+10px)] z-30 w-[max-content] min-w-[168px] animate-in fade-in slide-in-from-top-2 duration-200 rounded-[18px] bg-surface-raised p-1.5 shadow-lift hairline">
          {options.map((opt) => {
            const isActive = opt === chosen;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onPick(opt);
                  setOpen(false);
                }}
                className={`morph-fast flex w-full items-center gap-2 rounded-[12px] px-2.5 py-2 text-left text-[12.5px] font-medium ${
                  isActive ? "bg-ink text-background" : "text-ink-soft hover:bg-sand hover:text-ink"
                }`}
              >
                <Check
                  className={`h-3.5 w-3.5 shrink-0 ${isActive ? "opacity-100" : "opacity-0"}`}
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

export function PropertySearch({
  value,
  onChange,
  onSearch,
}: {
  value: SearchState;
  onChange: (next: SearchState) => void;
  onSearch: () => void;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
      className="w-full rounded-[26px] bg-surface-raised p-2 shadow-soft hairline"
    >
      <div className="grid gap-2 sm:grid-cols-[auto_minmax(0,1fr)_auto]">
        {/* Buy / Rent segmented — sliding pill */}
        <div className="relative flex shrink-0 rounded-[16px] bg-sand/70 p-1">
          <span
            aria-hidden
            className="morph pointer-events-none absolute inset-y-1 left-1 z-0 w-[calc((100%-8px)/2)] rounded-[12px] bg-ink shadow-soft"
            style={{ transform: `translateX(${DEALS.indexOf(value.deal) * 100}%)` }}
          />
          {DEALS.map((d) => {
            const active = value.deal === d;
            return (
              <button
                key={d}
                type="button"
                onClick={() => onChange({ ...value, deal: d })}
                className={`morph-fast relative z-10 flex-1 rounded-[12px] px-3 py-2 text-[13px] font-semibold sm:px-5 ${
                  active ? "text-background" : "text-ink-soft hover:text-ink"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>

        {/* Location */}
        <div className="relative min-w-0">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft"
            strokeWidth={2}
          />
          <input
            value={value.area}
            onChange={(e) => onChange({ ...value, area: e.target.value })}
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
        <Select
          label="Type"
          options={TYPES}
          chosen={value.type}
          active={value.type !== "Any"}
          onPick={(v) => onChange({ ...value, type: v })}
        />
        <Select
          label="Price"
          options={PRICES}
          chosen={value.price}
          active={value.price !== "Any price"}
          onPick={(v) => onChange({ ...value, price: v })}
        />
        <Select
          label="Beds"
          options={BEDS}
          chosen={value.beds}
          active={value.beds !== "Any"}
          onPick={(v) => onChange({ ...value, beds: v })}
        />

        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="morph-fast flex h-11 items-center gap-2 rounded-[14px] px-3.5 text-[13px] font-medium text-ink-soft hover:bg-sand hover:text-ink"
        >
          <SlidersHorizontal className="h-4 w-4" strokeWidth={2.1} />
          More filters
        </button>

        <span className="meta ml-auto hidden sm:block">Press Enter to search</span>
      </div>

      <FilterDrawer
        value={value}
        onChange={onChange}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSearch={onSearch}
      />
    </form>
  );
}
