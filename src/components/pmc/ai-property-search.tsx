import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { parseAiQuery, type SearchState } from "@/lib/listings";

const SUGGESTIONS = [
  "quiet 5-bed house under 3 crore in DHA",
  "2 bed apartment for rent in Clifton",
  "commercial shop below 2.5 crore in Gulberg",
  "3 bedroom plot? no — 5 marla plot in Bahria Town",
];

function chipFor(label: string, value: string) {
  if (value === "Any" || value === "Any price" || value === "") return null;
  return { label, value };
}

export function AiPropertySearch({
  value,
  onChange,
  onSearch,
}: {
  value: SearchState;
  onChange: (next: SearchState) => void;
  onSearch: () => void;
}) {
  const [query, setQuery] = useState("");
  const [used, setUsed] = useState(false);

  const resolve = () => {
    const parsed = parseAiQuery(query);
    if (parsed) {
      onChange(parsed.search);
      setUsed(true);
      onSearch();
    } else {
      setUsed(false);
    }
  };

  const chips = [
    chipFor("Deal", value.deal),
    chipFor("Type", value.type === "Homes" ? "House / Apt" : value.type),
    chipFor("Price", value.price),
    chipFor("Beds", value.beds),
    chipFor("Area", value.area),
  ].filter((c): c is { label: string; value: string } => !!c);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
      <div>
        <span className="label-eyebrow">AI property discovery</span>
        <h2 className="mt-3 text-[clamp(1.8rem,3.2vw,2.5rem)] leading-[1.03] font-semibold text-ink">
          Describe it. We'll filter it.
        </h2>
        <p className="mt-3 max-w-[42ch] text-[14px] leading-relaxed text-ink-soft">
          Type a natural sentence — budget, beds, area, type — and PMC resolves it against the
          listings automatically.
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
            placeholder='e.g. "5-bed house under 3 crore in DHA Phase 6"'
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

        {chips.length > 0 && (
          <div className="morph mt-2 flex flex-wrap items-center gap-1.5 px-1.5 pb-1.5">
            <span className="meta mr-1">Applied{used ? " · from your search" : ""}</span>
            {chips.map((c) => (
              <span
                key={c.label}
                className="flex items-center gap-1 rounded-[10px] bg-brand-soft px-2.5 py-1 text-[11.5px] font-semibold text-brand"
              >
                <Check className="h-3 w-3" strokeWidth={2.8} />
                {c.label}: {c.value}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 px-1.5 pb-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setQuery(s)}
              className="morph-fast rounded-[10px] bg-sand/70 px-2.5 py-1.5 text-left text-[11.5px] font-medium text-ink-soft hover:bg-sand hover:text-ink"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
