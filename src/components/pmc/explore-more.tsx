import {
  ArrowUpRight,
  Building2,
  Calculator,
  Crosshair,
  Landmark,
  LineChart,
  Map,
  Ruler,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const TOOLS: { icon: LucideIcon; title: string; desc: string; href: string }[] = [
  {
    icon: Building2,
    title: "New Projects",
    desc: "The best investment opportunities",
    href: "#projects",
  },
  {
    icon: Calculator,
    title: "Construction Cost Calculator",
    desc: "Get construction cost estimate",
    href: "#tools",
  },
  {
    icon: Landmark,
    title: "Home Loan Calculator",
    desc: "Find affordable loan packages",
    href: "#tools",
  },
  {
    icon: Map,
    title: "Area Guides",
    desc: "Explore housing societies in Pakistan",
    href: "#tools",
  },
  {
    icon: Crosshair,
    title: "Plot Finder",
    desc: "Find plots in any housing society",
    href: "#browse",
  },
  {
    icon: LineChart,
    title: "Property Index",
    desc: "Track changes in real estate prices",
    href: "#tools",
  },
  {
    icon: Ruler,
    title: "Area Unit Converter",
    desc: "Convert any area unit instantly",
    href: "#tools",
  },
  {
    icon: TrendingUp,
    title: "Property Trends",
    desc: "Find popular areas to buy property",
    href: "#tools",
  },
];

export function ExploreMore() {
  return (
    <section id="tools" className="mx-auto max-w-[1240px] scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="label-eyebrow">Explore more on PMC</span>
          <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.02] font-semibold text-ink">
            Tools for every step of the deal.
          </h2>
        </div>
        <span className="meta">Calculators · guides · market data</span>
      </div>

      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((t) => {
          const Icon = t.icon;
          return (
            <a
              key={t.title}
              href={t.href === "#" ? "#tools" : t.href}
              className="morph-fast group flex items-start gap-3.5 rounded-[20px] bg-surface-raised p-4 shadow-soft hover:bg-ink hover:shadow-lift"
            >
              <span className="morph-fast flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-sand text-ink group-hover:bg-brand group-hover:text-brand-foreground">
                <Icon className="h-4.5 w-4.5" strokeWidth={1.9} />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-1 text-[14px] font-semibold text-ink group-hover:text-background">
                  {t.title}
                  <ArrowUpRight
                    className="morph-fast h-3.5 w-3.5 text-brand opacity-0 group-hover:translate-x-0.5 group-hover:opacity-100 group-hover:text-background"
                    strokeWidth={2.4}
                  />
                </span>
                <span className="mt-0.5 block text-[12px] leading-snug text-ink-soft group-hover:text-background/60">
                  {t.desc}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
