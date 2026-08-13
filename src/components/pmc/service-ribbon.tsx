import { useState } from "react";
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
  const [active, setActive] = useState<string | null>(null);

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

        <div className="mt-6 grid grid-cols-2 gap-2 lg:flex lg:flex-wrap lg:gap-2">
          {SERVICES.map((s) => {
            const isOpen = active === s.id;
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                onMouseEnter={() => setActive(s.id)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(isOpen ? null : s.id)}
                className={`morph overflow-hidden rounded-[18px] bg-surface-raised lg:rounded-[16px] ${
                  isOpen
                    ? "col-span-2 w-full shadow-lift lg:col-span-auto lg:w-[320px]"
                    : "w-full shadow-soft lg:w-[132px]"
                }`}
              >
                <div className="flex items-center justify-center gap-2.5 px-3.5 py-4 lg:justify-start lg:py-3">
                  <span
                    className={`morph-fast flex h-12 w-12 items-center justify-center rounded-[14px] lg:h-8 lg:w-8 lg:rounded-[10px] ${
                      isOpen ? "bg-brand text-brand-foreground" : "bg-sand text-ink"
                    }`}
                  >
                    <Icon className="h-5.5 w-5.5 lg:h-4 lg:w-4" strokeWidth={1.9} />
                  </span>
                  <span className="text-center text-[14.5px] font-semibold text-ink lg:text-left lg:text-[13.5px] lg:font-medium">
                    {s.label}
                  </span>
                </div>

                <div className={`morph grid ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="min-h-0 overflow-hidden">
                    <div className="border-t border-border px-4 py-3.5 lg:px-3.5 lg:py-3">
                      <div className="flex items-end justify-between gap-3">
                        <div>
                          <div className="meta">Starting from</div>
                          <div className="price text-[19px] text-ink">{s.from}</div>
                          <div className="meta mt-0.5">PMC / {s.provider}</div>
                        </div>
                        <button className="morph-fast rounded-[11px] bg-ink px-3 py-2 text-[12.5px] font-semibold text-background hover:bg-brand">
                          Request
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
