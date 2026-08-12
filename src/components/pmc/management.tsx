import { useState } from "react";

const TABS = ["Pay", "Request", "Documents", "Manage"] as const;

export function Management() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Pay");

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
              ACTIVE TENANCY
            </span>
          </div>

          <div className="grid gap-1 sm:grid-cols-3">
            <div className="rounded-[16px] bg-sand/70 px-3.5 py-3">
              <div className="meta">Rent</div>
              <div className="price mt-0.5 text-[20px] text-ink">PKR 85,000</div>
              <div className="mt-1 text-[11.5px] font-medium text-warn">Due in 6 days</div>
            </div>
            <div className="rounded-[16px] bg-sand/70 px-3.5 py-3">
              <div className="meta">Maintenance</div>
              <div className="mt-1 text-[13.5px] font-medium text-ink">AC inspection</div>
              <div className="mt-1 text-[11.5px] text-ink-soft">Scheduled 19 Aug</div>
            </div>
            <div className="rounded-[16px] bg-sand/70 px-3.5 py-3">
              <div className="meta">Documents</div>
              <div className="mt-1 text-[13.5px] font-medium text-ink">3 active</div>
              <div className="mt-1 text-[11.5px] text-ink-soft">Lease · NOC · Utility</div>
            </div>
          </div>

          <div className="mt-1 flex items-center gap-1 rounded-[16px] bg-sand/50 p-1">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`morph-fast flex-1 rounded-[12px] px-3 py-2 text-[12.5px] font-semibold ${
                  tab === t ? "bg-ink text-background shadow-soft" : "text-ink-soft hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="px-4 py-3">
            <p className="meta">
              {tab === "Pay" && "Auto-debit set for 18 Aug · Meezan •••• 4402"}
              {tab === "Request" && "Average response from PMC providers: 3h 12m"}
              {tab === "Documents" && "Lease expires 31 Mar 2027 · renewal reminder on"}
              {tab === "Manage" && "Owner: Zainab A. · Managed by PMC since Feb 2025"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
