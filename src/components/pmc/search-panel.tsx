import { useState } from "react";
import { ArrowRight, ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { AREAS, BEDS, PRICES, TYPES, countMatches, type SearchState } from "@/lib/listings";

type Field = "area" | "beds" | "price" | "type" | null;

const PILLS = [
  { id: "projects", label: "Projects" },
  { id: "invest", label: "Invest" },
];

export function SearchPanel({
  value,
  onChange,
  onSearch,
}: {
  value: SearchState;
  onChange: (next: SearchState) => void;
  onSearch?: () => void;
}) {
  const [open, setOpen] = useState<Field>(null);
  const matches = countMatches(value);

  const options: Record<
    Exclude<Field, null>,
    { list: string[]; chosen: string; pick: (v: string) => void }
  > = {
    area: {
      list: AREAS,
      chosen: value.area || "Anywhere",
      pick: (v) => onChange({ ...value, area: v }),
    },
    beds: { list: BEDS, chosen: value.beds, pick: (v) => onChange({ ...value, beds: v }) },
    price: { list: PRICES, chosen: value.price, pick: (v) => onChange({ ...value, price: v }) },
    type: { list: TYPES, chosen: value.type, pick: (v) => onChange({ ...value, type: v }) },
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
      {/* Projects / Invest — lead to separate pages */}
      <div className="mb-2.5 flex items-center justify-center gap-2">
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
      </div>

      <div
        className={`morph w-full rounded-[20px] bg-surface-raised p-1.5 hairline ${
          open ? "shadow-lift" : "shadow-soft"
        }`}
      >
        <div className="flex items-stretch gap-0.5">
          <Segment
            id="area"
            label="Where"
            value={value.area}
            placeholder="Enter city or area"
            grow
          />
          <span className="my-2 w-px bg-border" />
          <Segment id="beds" label="Beds" value={value.beds} />
          <span className="my-2 hidden w-px bg-border sm:block" />
          <div className="hidden sm:contents">
            <Segment id="price" label="Price" value={value.price} />
          </div>
          <Segment id="type" label="Type" value={value.type} />
          <button
            aria-label="Search properties"
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
                <div key={open} className="animate-in fade-in slide-in-from-top-1 duration-300">
                  {open === "area" && (
                    <>
                      <input
                        value={value.area}
                        onChange={(e) => onChange({ ...value, area: e.target.value })}
                        placeholder="Try 'DHA Phase 6', 'Gulberg', 'Clifton'…"
                        className="w-full rounded-[11px] bg-surface-raised px-3 py-2.5 text-[13px] font-medium text-ink outline-none placeholder:text-ink-soft/70 focus:ring-2 focus:ring-brand/30"
                      />
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {AREAS.map((opt) => (
                          <span
                            key={opt}
                            onClick={() => onChange({ ...value, area: opt })}
                            className={`morph-fast flex cursor-pointer select-none items-center gap-1.5 rounded-[10px] px-2.5 py-1.5 text-[12.5px] font-medium ${
                              value.area === opt
                                ? "bg-ink text-background"
                                : "bg-surface-raised text-ink-soft hover:text-ink"
                            }`}
                          >
                            {value.area === opt && <Check className="h-3 w-3" strokeWidth={2.6} />}
                            {opt}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                  {open !== "area" && (
                    <div className="flex flex-wrap gap-1.5">
                      {options[open]!.list.map((opt) => {
                        const active = options[open!].chosen === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => {
                              options[open!].pick(opt);
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
                  )}
                </div>
              )}

              <div className="mt-2 pb-0.5 px-1 text-left">
                <span className="meta">{matches} listings match</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
