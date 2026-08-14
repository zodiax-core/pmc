import { useState } from "react";
import { Check, Sparkle } from "lucide-react";

const QUERY = "Find me a quiet 5-bedroom house under 3 crore near good schools.";

const MATCHES = [
  {
    place: "DHA Phase 5 · Block H",
    price: "PKR 2.85 Cr",
    reasons: ["Within budget", "Cul-de-sac, low traffic", "LGS 400m", "PMC inspected"],
  },
  {
    place: "Bahria Town · Overseas B",
    price: "PKR 2.4 Cr",
    reasons: ["Within budget", "Park-facing", "Roots Millennium 700m", "PMC inspected"],
  },
  {
    place: "Model Town · Block N",
    price: "PKR 2.95 Cr",
    reasons: ["Within budget", "Quiet interior street", "Beaconhouse 1.1km", "PMC inspected"],
  },
  {
    place: "Wapda Town · Sector J2",
    price: "PKR 2.2 Cr",
    reasons: ["Under budget", "Low noise index 24", "3 schools within 1km", "PMC inspected"],
  },
];

export function AiSearch() {
  const [run, setRun] = useState(false);

  return (
    <section className="mx-auto max-w-[1240px] px-4 pb-20 sm:px-6">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
        <div className="min-w-0">
          <span className="label-eyebrow">Search intelligence</span>
          <h2 className="mt-3 text-[clamp(1.8rem,3.2vw,2.5rem)] leading-[1.03] font-semibold text-ink">
            Say what you mean.
          </h2>
          <p className="mt-4 max-w-[34ch] text-[14.5px] leading-relaxed text-ink-soft">
            PMC reads intent — budget, quiet, schools — and resolves it against inspection data,
            noise indices and school proximity. No chat window.
          </p>
        </div>

        <div className="w-full min-w-0 rounded-[24px] bg-surface-raised p-2 shadow-soft">
          <div className="flex flex-wrap items-center gap-3 rounded-[18px] bg-sand/70 px-4 py-3.5">
            <Sparkle className="h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
            <p className="min-w-0 flex-1 truncate text-[14px] text-ink">{QUERY}</p>
            <button
              onClick={() => setRun((r) => !r)}
              className="morph-fast shrink-0 rounded-[11px] bg-ink px-3 py-1.5 text-[12.5px] font-semibold text-background hover:bg-brand"
            >
              {run ? "Reset" : "Resolve"}
            </button>
          </div>

          <div className={`morph grid ${run ? "mt-2 grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
            <div className="min-h-0 overflow-hidden">
              <div className="space-y-1">
                {MATCHES.map((m, i) => (
                  <div
                    key={m.place}
                    className="morph flex flex-wrap items-center gap-x-4 gap-y-2 rounded-[16px] px-4 py-3 hover:bg-sand/60"
                    style={{ transitionDelay: run ? `${i * 70}ms` : "0ms", opacity: run ? 1 : 0 }}
                  >
                    <div className="min-w-[150px]">
                      <div className="meta">{m.place}</div>
                      <div className="price text-[19px] text-ink">{m.price}</div>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {m.reasons.map((r) => (
                        <span
                          key={r}
                          className="flex items-center gap-1.5 text-[12px] text-ink-soft"
                        >
                          <Check className="h-3 w-3 text-brand" strokeWidth={3} />
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p
            className={`morph meta overflow-hidden px-4 ${run ? "h-0 py-0 opacity-0" : "h-9 py-2.5 opacity-100"}`}
          >
            4 strong matches ready · resolved from 2,418 inspected listings
          </p>
        </div>
      </div>
    </section>
  );
}
