import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { LISTINGS, POPULAR_AREAS, DEFAULT_SEARCH, type SearchState } from "@/lib/listings";

export function DiscoverySections({
  search,
  onFilter,
}: {
  search: SearchState;
  onFilter: (next: SearchState) => void;
}) {
  const inspected = LISTINGS.filter((l) => l.badge === "PMC INSPECTED").length;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Popular areas */}
      <div className="rounded-[26px] bg-surface-raised p-6 shadow-soft hairline">
        <span className="label-eyebrow">Popular areas</span>
        <h3 className="mt-2 text-[20px] font-semibold text-ink">Start with a neighbourhood.</h3>
        <div className="mt-5 flex flex-wrap gap-2">
          {POPULAR_AREAS.map((area) => {
            const count = LISTINGS.filter((l) =>
              l.place.toLowerCase().includes(area.toLowerCase()),
            ).length;
            const active = search.area.toLowerCase() === area.toLowerCase();
            return (
              <button
                key={area}
                onClick={() => onFilter({ ...search, area: active ? "" : area })}
                className={`morph-fast flex items-center gap-2 rounded-[13px] px-3.5 py-2 text-[13px] font-medium ${
                  active
                    ? "bg-ink text-background"
                    : "bg-sand/70 text-ink-soft hover:bg-sand hover:text-ink"
                }`}
              >
                {area}
                <span
                  className={`text-[11px] font-semibold ${active ? "text-background/60" : "text-ink-soft/70"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PMC-inspected callout */}
      <div className="flex flex-col justify-between gap-6 rounded-[26px] bg-brand-soft/70 p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-brand text-brand-foreground shadow-soft">
            <BadgeCheck className="h-6 w-6" strokeWidth={2.2} />
          </span>
          <ArrowUpRight className="h-5 w-5 text-brand" strokeWidth={2.2} />
        </div>
        <div>
          <h3 className="text-[22px] leading-tight font-semibold text-ink">
            {inspected} inspected listings
            <span className="text-brand"> live on PMC.</span>
          </h3>
          <p className="mt-2 max-w-[42ch] text-[13.5px] leading-relaxed text-ink-soft">
            Every one verified, documented and — where available — walked through in 3D.
          </p>
          <button
            onClick={() => onFilter({ ...DEFAULT_SEARCH })}
            className="morph-fast mt-5 rounded-[14px] bg-ink px-5 py-2.5 text-[13px] font-semibold text-background hover:bg-brand"
          >
            Browse everything
          </button>
        </div>
      </div>
    </div>
  );
}
