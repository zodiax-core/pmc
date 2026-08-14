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
      <div className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-[minmax(0,1.1fr)_repeat(5,minmax(0,1fr))] lg:gap-x-8 lg:gap-y-0">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
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
              <ul className="mt-2.5 space-y-1.5">
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

        <div className="mt-8 flex flex-col items-center justify-between gap-2.5 border-t border-border pt-4 sm:flex-row">
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
