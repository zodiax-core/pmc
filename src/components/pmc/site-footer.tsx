const COLUMNS: [string, string[]][] = [
  ["Properties", ["Buy", "Rent", "New projects", "Plots"]],
  ["Services", ["Cleaning", "Maintenance", "Renovation", "Moving"]],
  ["Organizations", ["Agencies", "Developers", "Providers", "Partners"]],
  ["PMC", ["About", "Inspection standard", "Careers", "Press"]],
  ["Support", ["Help centre", "Contact", "Report a listing", "Status"]],
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-[1240px] px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_repeat(5,auto)] lg:gap-12">
          <div>
            <span className="font-display text-[19px] font-bold tracking-[-0.06em] text-ink">
              PMC
            </span>
            <p className="mt-2 max-w-[26ch] text-[12.5px] leading-relaxed text-ink-soft">
              Property Management Company. Inspected listings, digital twins and lifetime property
              records.
            </p>
          </div>
          {COLUMNS.map(([title, links]) => (
            <div key={title}>
              <div className="text-[12px] font-semibold text-ink">{title}</div>
              <ul className="mt-3 space-y-1.5">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[12.5px] text-ink-soft hover:text-brand">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
          <span className="meta">© 2026 PMC · Lahore · Karachi · Islamabad</span>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Accessibility"].map((l) => (
              <a key={l} href="#" className="meta hover:text-ink">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
