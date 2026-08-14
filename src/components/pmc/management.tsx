import { useLayoutEffect, useRef, useState } from "react";

const TABS = ["Pay", "Request", "Documents", "Manage"] as const;

type Tab = (typeof TABS)[number];

const TAB_STATUS: Record<Tab, string> = {
  Pay: "AUTO-DEBIT ACTIVE",
  Request: "1 OPEN REQUEST",
  Documents: "3 ACTIVE",
  Manage: "PMC MANAGED",
};

const TAB_FOOTER: Record<Tab, string> = {
  Pay: "Auto-debit set for 18 Aug · Meezan •••• 4402",
  Request: "Average response from PMC providers: 3h 12m",
  Documents: "Lease expires 31 Mar 2027 · renewal reminder on",
  Manage: "Owner: Zainab A. · Managed by PMC since Feb 2025",
};

const TAB_STATS: Record<
  Tab,
  { label: string; value: string; sub: string; tone?: "warn" | "ok" }[]
> = {
  Pay: [
    { label: "Rent", value: "PKR 85,000", sub: "Due in 6 days", tone: "warn" },
    { label: "Auto-debit", value: "18 Aug", sub: "Meezan •••• 4402", tone: "ok" },
    { label: "Pending", value: "NIL", sub: "Nothing due this cycle" },
  ],
  Request: [
    { label: "Maintenance", value: "AC inspection", sub: "Scheduled 19 Aug" },
    { label: "Cleaning", value: "1 open", sub: "~2 days to next slot" },
    { label: "Support", value: "3h 12m", sub: "avg. provider response" },
  ],
  Documents: [
    { label: "Lease", value: "31 Mar 2027", sub: "renewal reminder on" },
    { label: "NOC", value: "On file", sub: "issued 12 Jan 2026" },
    { label: "Utility", value: "3 bills", sub: "auto-filed each month" },
  ],
  Manage: [
    { label: "Owner", value: "Zainab A.", sub: "contact on record" },
    { label: "Managed by", value: "PMC", sub: "Manager M. Khan" },
    { label: "Health", value: "9.2", sub: "5-yr maintenance score" },
  ],
};

export function Management() {
  const [tab, setTab] = useState<Tab>("Pay");

  const tabRef = useRef<HTMLDivElement>(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const measure = () => {
      const nav = tabRef.current;
      const btn = nav?.querySelector<HTMLElement>(`[data-tab="${tab}"]`);
      if (nav && btn) setPill({ left: btn.offsetLeft, width: btn.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [tab]);

  const stats = TAB_STATS[tab];

  return (
    <section className="mx-auto max-w-[1240px] px-4 pb-20 sm:px-6">
      <div className="grid gap-4 rounded-[26px] bg-ink p-5 text-background sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:items-center">
        <div>
          <span className="label-eyebrow text-background/55">After the sale</span>
          <h2 className="mt-3 max-w-[16ch] text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.04] font-semibold text-background">
            The property keeps running itself.
          </h2>
          <p className="mt-4 max-w-[34ch] text-[14px] leading-relaxed text-background/60">
            Rent, maintenance and paperwork stay attached to the same address you bought — one
            continuous record.
          </p>
        </div>

        <div className="rounded-[22px] bg-background p-2 text-ink">
          <div className="flex items-center justify-between px-3 py-2.5">
            <span className="text-[13.5px] font-semibold">DHA Phase 6 · House 44-C</span>
            <span className="rounded-[8px] bg-brand-soft px-2 py-1 text-[10.5px] font-semibold tracking-[0.08em] text-brand">
              {TAB_STATUS[tab]}
            </span>
          </div>

          <div
            key={tab}
            className="grid gap-1 animate-in fade-in slide-in-from-top-1 duration-300 sm:grid-cols-3"
          >
            {stats.map((s) => (
              <div key={s.label} className="rounded-[16px] bg-sand/70 px-3.5 py-3">
                <div className="meta">{s.label}</div>
                <div className="mt-0.5 text-[17px] font-semibold text-ink">{s.value}</div>
                <div
                  className={`mt-1 text-[11.5px] font-medium ${
                    s.tone === "warn"
                      ? "text-warn"
                      : s.tone === "ok"
                        ? "text-signal"
                        : "text-ink-soft"
                  }`}
                >
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          <div
            ref={tabRef}
            className="relative mt-1 flex items-center gap-1 rounded-[16px] bg-sand/50 p-1"
          >
            <span
              className="morph absolute top-1 bottom-1 rounded-[12px] bg-ink shadow-soft"
              style={{ left: pill.left, width: pill.width }}
            />
            {TABS.map((t) => (
              <button
                key={t}
                data-tab={t}
                onClick={() => setTab(t)}
                className={`morph-fast relative z-10 flex-1 rounded-[12px] px-3 py-2 text-[12.5px] font-semibold ${
                  tab === t ? "text-background" : "text-ink-soft hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="px-4 py-3">
            <p key={tab} className="meta animate-in fade-in slide-in-from-bottom-1 duration-300">
              {TAB_FOOTER[tab]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
