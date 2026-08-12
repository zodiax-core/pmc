import { useState } from "react";
import { BadgeCheck, ChevronRight } from "lucide-react";

const ROWS = [
  ["Ownership", "Verified", "Title deed matched with LDA record"],
  ["Documents", "Reviewed", "9 of 9 documents complete"],
  ["Inspection", "12 Aug 2026", "Structural, electrical, plumbing"],
  ["Condition", "91 / 100", "Minor wear on north terrace"],
  ["3D Model", "Available", "Scanned 12 Aug 2026 · 4.1 GB"],
] as const;

export function Passport() {
  const [open, setOpen] = useState(false);

  return (
    <section id="passport" className="mx-auto max-w-[1240px] scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
        <div>
          <span className="label-eyebrow">Verification</span>
          <h2 className="mt-3 text-[clamp(1.8rem,3.2vw,2.5rem)] leading-[1.03] font-semibold text-ink">
            Every property carries a passport.
          </h2>
          <p className="mt-4 max-w-[36ch] text-[14.5px] leading-relaxed text-ink-soft">
            Not a trust badge. An auditable record attached to the address — ownership, paperwork,
            inspection date and measured condition score.
          </p>
        </div>

        <div className="rounded-[24px] bg-surface-raised p-2 shadow-soft">
          <div className="flex items-center gap-2 px-3 py-2.5">
            <BadgeCheck className="h-4 w-4 text-brand" strokeWidth={2.2} />
            <span className="text-[11px] font-semibold tracking-[0.16em] text-ink">
              PMC PROPERTY PASSPORT
            </span>
            <span className="meta ml-auto">DHA Phase 6 · PMC-4471</span>
          </div>

          <div className="rounded-[18px] bg-sand/60">
            {ROWS.map(([label, value, detail], i) => (
              <div
                key={label}
                className={`morph grid grid-cols-[1fr_auto] items-center gap-3 px-4 ${
                  open ? "py-3" : "py-2.5"
                } ${i > 0 ? "border-t border-border/70" : ""}`}
              >
                <div>
                  <div className="text-[13.5px] font-medium text-ink">{label}</div>
                  <div
                    className={`morph grid overflow-hidden ${
                      open ? "mt-1 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <span className="meta min-h-0">{detail}</span>
                  </div>
                </div>
                <span
                  className={`rounded-[9px] px-2 py-1 text-[12px] font-semibold ${
                    value === "Verified" || value === "Available" || value === "Reviewed"
                      ? "bg-brand-soft text-brand"
                      : "bg-surface-raised text-ink"
                  }`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="morph-fast mt-1 flex w-full items-center justify-between rounded-[16px] px-4 py-2.5 text-[13px] font-semibold text-brand hover:bg-sand"
          >
            {open ? "Collapse passport" : "View full passport"}
            <ChevronRight
              className={`morph-fast h-4 w-4 ${open ? "rotate-90" : ""}`}
              strokeWidth={2.2}
            />
          </button>
        </div>
      </div>
    </section>
  );
}
