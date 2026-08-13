import { useEffect } from "react";
import { Check, X } from "lucide-react";
import { AREAS, TYPES, countMatches, type SearchState } from "@/lib/listings";
import { lockScroll, unlockScroll } from "@/lib/scroll";

export function FilterDrawer({
  value,
  onChange,
  open,
  onClose,
  onSearch,
}: {
  value: SearchState;
  onChange: (next: SearchState) => void;
  open: boolean;
  onClose: () => void;
  onSearch?: () => void;
}) {
  const matches = countMatches(value);

  useEffect(() => {
    if (open) lockScroll();
    else unlockScroll();
    return () => unlockScroll();
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-[60] ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
      inert={!open}
    >
      {/* Backdrop — blur fades in and out smoothly, mobile + desktop */}
      <div
        onClick={onClose}
        className={`morph absolute inset-0 ${
          open
            ? "bg-ink/25 opacity-100 backdrop-blur-[10px]"
            : "bg-ink/0 opacity-0 backdrop-blur-[0px]"
        }`}
      />

      {/* Panel — slides in from the left, floating, rounded, margined on all sides */}
      <aside
        data-lenis-prevent
        className={`morph absolute left-3 top-1/2 z-10 flex max-h-[min(86vh,720px)] w-[min(92vw,384px)] -translate-y-1/2 flex-col rounded-[28px] bg-surface-raised p-5 shadow-lift hairline ${
          open ? "translate-x-0 opacity-100" : "-translate-x-[130%] opacity-0"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="label-eyebrow">Filters</span>
            <h3 className="mt-1 text-[19px] leading-none font-semibold text-ink">Deep search</h3>
          </div>
          <button
            aria-label="Close filters"
            onClick={onClose}
            className="morph-fast flex h-9 w-9 items-center justify-center rounded-[12px] text-ink-soft hover:bg-sand hover:text-ink"
          >
            <X className="h-4.5 w-4.5" strokeWidth={2.1} />
          </button>
        </div>

        <div className="mt-5 min-h-0 flex-1 overflow-y-auto">
          {/* Where */}
          <div>
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Where
            </span>
            <input
              value={value.area}
              onChange={(e) => onChange({ ...value, area: e.target.value })}
              placeholder="City, area or society"
              className="mt-2 w-full rounded-[14px] bg-sand/70 px-3.5 py-2.5 text-[13.5px] font-medium text-ink outline-none placeholder:text-ink-soft/70 focus:ring-2 focus:ring-brand/30"
            />
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              {AREAS.map((opt) => {
                const active = value.area === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => onChange({ ...value, area: active ? "" : opt })}
                    className={`morph-fast flex items-center gap-1.5 rounded-[11px] px-2.5 py-1.5 text-[12.5px] font-medium ${
                      active ? "bg-ink text-background" : "bg-sand/70 text-ink-soft hover:text-ink"
                    }`}
                  >
                    {active && <Check className="h-3 w-3" strokeWidth={2.6} />}
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Property type */}
          <div className="mt-6">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              Property type
            </span>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {TYPES.map((opt) => {
                const active = value.type === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => onChange({ ...value, type: opt })}
                    className={`morph-fast flex items-center gap-1.5 rounded-[11px] px-2.5 py-1.5 text-[12.5px] font-medium ${
                      active ? "bg-ink text-background" : "bg-sand/70 text-ink-soft hover:text-ink"
                    }`}
                  >
                    {active && <Check className="h-3 w-3" strokeWidth={2.6} />}
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
          <span className="meta">{matches} listings match</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                onChange({ ...value, area: "", beds: "Any", price: "Any price", type: "Any" })
              }
              className="morph-fast rounded-[12px] px-3 py-2 text-[12.5px] font-semibold text-ink-soft hover:bg-sand hover:text-ink"
            >
              Clear
            </button>
            <button
              onClick={() => {
                onClose();
                onSearch?.();
              }}
              className="morph-fast rounded-[12px] bg-ink px-4 py-2 text-[13px] font-semibold text-background hover:bg-brand"
            >
              Show results
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
