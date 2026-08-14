import {
  AirVent,
  Brush,
  Droplets,
  Hammer,
  PaintRoller,
  ShieldCheck,
  Truck,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Service = { id: string; label: string; icon: LucideIcon; from: string; provider: string };

const SERVICES: Service[] = [
  {
    id: "cleaning",
    label: "Cleaning",
    icon: Brush,
    from: "PKR 3,200",
    provider: "Sparkle Home Co.",
  },
  {
    id: "plumbing",
    label: "Plumbing",
    icon: Droplets,
    from: "PKR 1,800",
    provider: "Rehman Plumbing",
  },
  {
    id: "electrical",
    label: "Electrical",
    icon: Zap,
    from: "PKR 2,100",
    provider: "Voltera Services",
  },
  { id: "ac", label: "AC", icon: AirVent, from: "PKR 2,500", provider: "CoolCare Verified" },
  {
    id: "painting",
    label: "Painting",
    icon: PaintRoller,
    from: "PKR 12,000",
    provider: "Finish Line Painters",
  },
  {
    id: "renovation",
    label: "Renovation",
    icon: Hammer,
    from: "PKR 85,000",
    provider: "Atelier Build",
  },
  { id: "moving", label: "Moving", icon: Truck, from: "PKR 9,500", provider: "Shift Logistics" },
  {
    id: "security",
    label: "Security",
    icon: ShieldCheck,
    from: "PKR 6,400",
    provider: "Guardline",
  },
];

export function ServiceRibbon() {
  return (
    <section id="services" className="mx-auto max-w-[1240px] scroll-mt-24 px-4 pb-20 sm:px-6">
      <div className="rounded-[26px] bg-sand/70 p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="label-eyebrow">Property services</span>
            <h2 className="mt-2 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold text-ink">
              Everything after the keys.
            </h2>
          </div>
          <span className="meta">Vetted providers · fixed PMC rates</span>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                className="group flex flex-col items-center justify-center gap-1.5 rounded-[18px] bg-surface-raised px-3 py-5 text-center shadow-soft transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className="morph-fast flex h-12 w-12 items-center justify-center rounded-full bg-sand text-ink transition-colors duration-500 group-hover:bg-brand group-hover:text-brand-foreground">
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
                </span>
                <span className="mt-1.5 text-[13.5px] font-semibold text-ink">{s.label}</span>
                <span className="price text-[12.5px] text-ink-soft">from {s.from}</span>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-[10.5px] font-semibold text-ink-soft transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-background">
                  Request
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
