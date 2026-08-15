import { ArrowUpRight, MapPin, TrendingUp } from "lucide-react";
import { LazyImage, BrandLogo } from "./image";
import propMed1 from "@/assets/prop-med-1.jpg";
import propMed2 from "@/assets/prop-med-2.jpg";
import roomKitchen from "@/assets/room-kitchen.jpg";
import heroHouse from "@/assets/hero-house-opt.jpg";

const PROJECTS = [
  {
    name: "Canal View Residences",
    developer: "Skyline Developers",
    logo: "https://logo.clearbit.com/skyline.com.pk",
    city: "Lahore",
    start: "PKR 9.5M",
    status: "Pre-launch",
    img: propMed1,
  },
  {
    name: "Bahria Heights Tower",
    developer: "Bahria Town",
    logo: "https://logo.clearbit.com/bahria.com",
    city: "Karachi",
    start: "PKR 12.0M",
    status: "Booking open",
    img: propMed2,
  },
  {
    name: "Margalla Greens",
    developer: "Hillmark Builders",
    logo: "https://logo.clearbit.com/hillmark.com",
    city: "Islamabad",
    start: "PKR 7.8M",
    status: "Under construction",
    img: roomKitchen,
  },
  {
    name: "Ravi Waterfront",
    developer: "Delta Estates",
    logo: "https://logo.clearbit.com/deltaestates.com",
    city: "Lahore",
    start: "PKR 5.2M",
    status: "Launching soon",
    img: heroHouse,
  },
] as const;

export function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-[1240px] scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="label-eyebrow">New projects</span>
          <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.02] font-semibold text-ink">
            The best investment opportunities.
          </h2>
        </div>
        <a href="#tools" className="text-[13.5px] font-semibold text-brand hover:underline">
          View all projects →
        </a>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROJECTS.map((p) => (
          <article
            key={p.name}
            className="group overflow-hidden rounded-[22px] bg-surface-raised shadow-soft"
          >
            <div className="relative overflow-hidden">
              <LazyImage
                src={p.img}
                alt={`${p.name} — ${p.city}`}
                className="aspect-[16/10] w-full"
                imgClassName="group-hover:scale-[1.04]"
              />
              <span className="absolute left-3 top-3 rounded-[9px] bg-ink/85 px-2 py-1 text-[10px] font-semibold tracking-[0.08em] text-background backdrop-blur-sm">
                {p.status.toUpperCase()}
              </span>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-1.5">
                <BrandLogo
                  src={p.logo}
                  name={p.developer}
                  round
                  className="h-5 w-5 shrink-0 bg-sand"
                />
                <span className="meta truncate">{p.developer}</span>
              </div>
              <h3 className="mt-1 text-[15.5px] font-semibold text-ink">{p.name}</h3>
              <div className="mt-1 flex items-center gap-1.5 text-[12px] text-ink-soft">
                <MapPin className="h-3 w-3" strokeWidth={2} />
                {p.city}
              </div>
              <div className="mt-3 flex items-center justify-between pt-3">
                <div>
                  <div className="meta">Starting from</div>
                  <div className="price text-[17px] text-ink">{p.start}</div>
                </div>
                <ArrowUpRight
                  className="h-4 w-4 text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                  strokeWidth={2.2}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const INVEST = [
  {
    name: "Rent-ready apartment — Gulberg",
    yield: "9.2%",
    min: "PKR 1.2M",
    term: "12 mo",
    flavor: "Rental yield",
  },
  {
    name: "Pre-launch plot — DHA Phase 8",
    yield: "14.6%",
    min: "PKR 2.5M",
    term: "18 mo",
    flavor: "Capital growth",
  },
  {
    name: "Commercial shop — Clifton",
    yield: "11.4%",
    min: "PKR 4.0M",
    term: "24 mo",
    flavor: "Lease-backed",
  },
  {
    name: "Portfolio — 3 serviced flats",
    yield: "10.1%",
    min: "PKR 3.6M",
    term: "12 mo",
    flavor: "Managed by PMC",
  },
] as const;

export function Invest() {
  return (
    <section id="invest" className="mx-auto max-w-[1240px] scroll-mt-24 px-4 pb-20 sm:px-6">
      <div className="grid gap-4 rounded-[26px] bg-sand/70 p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="label-eyebrow">Invest</span>
            <h2 className="mt-3 text-[clamp(1.7rem,3vw,2.35rem)] leading-[1.04] font-semibold text-ink">
              Verified yield, managed for you.
            </h2>
          </div>
          <span className="meta">Projected returns · indicative only</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {INVEST.map((i) => (
            <article key={i.name} className="rounded-[20px] bg-surface-raised p-4 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="rounded-[9px] bg-brand-soft px-2 py-1 text-[10px] font-semibold tracking-[0.06em] text-brand">
                  {i.flavor.toUpperCase()}
                </span>
                <TrendingUp className="h-4 w-4 text-brand" strokeWidth={2} />
              </div>
              <div className="price mt-3 text-[30px] text-ink">{i.yield}</div>
              <div className="mt-1 text-[13px] font-medium text-ink">{i.name}</div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="meta">from {i.min}</span>
                <span className="text-[12px] font-semibold text-ink">{i.term}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
