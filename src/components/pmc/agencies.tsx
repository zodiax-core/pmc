import { useState } from "react";
import { ArrowUpRight, BadgeCheck, Building2, ListChecks, MapPin, Star } from "lucide-react";
import { LazyImage } from "./image";

const AGENCIES = [
  {
    name: "Zameen Realty",
    location: "Lahore · DHA",
    rating: "4.9",
    listings: 214,
    badge: "TOP AGENCY",
    logo: "https://logo.clearbit.com/zameen.com",
    banner: "https://picsum.photos/seed/pmc-agency-a/640/256",
  },
  {
    name: "Century 21",
    location: "Karachi · Clifton",
    rating: "4.8",
    listings: 168,
    logo: "https://logo.clearbit.com/century21.com",
    banner: "https://picsum.photos/seed/pmc-agency-b/640/256",
  },
  {
    name: "RE/MAX",
    location: "Islamabad · F-7",
    rating: "4.7",
    listings: 141,
    badge: "PMC VERIFIED",
    logo: "https://logo.clearbit.com/remax.com",
    banner: "https://picsum.photos/seed/pmc-agency-c/640/256",
  },
  {
    name: "Compass",
    location: "Lahore · Gulberg",
    rating: "4.6",
    listings: 96,
    logo: "https://logo.clearbit.com/compass.com",
    banner: "https://picsum.photos/seed/pmc-agency-d/640/256",
  },
] as const;

function Logo({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <span className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-sand text-ink">
        <Building2 className="h-6 w-6" strokeWidth={1.8} />
      </span>
    );
  }
  return (
    <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[16px] bg-surface-raised p-1.5 shadow-lift ring-4 ring-background">
      <img
        src={src}
        alt={name}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

export function Agencies() {
  return (
    <section id="agencies" className="mx-auto max-w-[1240px] scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="label-eyebrow">Agencies</span>
          <h2 className="mt-3 text-[clamp(1.9rem,3.4vw,2.7rem)] leading-[1.02] font-semibold text-ink">
            Trusted partners, real record.
          </h2>
        </div>
        <span className="meta">Each agency carries a public performance record</span>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {AGENCIES.map((a) => (
          <article
            key={a.name}
            className="group flex flex-col overflow-hidden rounded-[22px] bg-surface-raised shadow-soft transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-lift"
          >
            {/* Banner header */}
            <div className="relative h-24 shrink-0 overflow-hidden">
              <LazyImage
                src={a.banner}
                alt=""
                className="h-24 w-full"
                imgClassName="object-cover group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/25" />
              {a.badge && (
                <span
                  className={`absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full px-2 py-1 text-[9.5px] font-semibold tracking-[0.08em] backdrop-blur-sm ${
                    a.badge === "PMC VERIFIED"
                      ? "bg-brand-soft/95 text-brand"
                      : "bg-surface-raised/90 text-ink-soft"
                  }`}
                >
                  {a.badge === "PMC VERIFIED" && (
                    <BadgeCheck className="h-3 w-3" strokeWidth={2.4} />
                  )}
                  {a.badge}
                </span>
              )}
            </div>

            {/* Logo overlapping the banner */}
            <div className="relative z-10 -mt-8 flex justify-center">
              <Logo src={a.logo} name={a.name} />
            </div>

            {/* Content on clean card surface */}
            <div className="flex flex-1 flex-col items-center px-4 pb-4 pt-2.5 text-center">
              <h3 className="max-w-full truncate text-[15.5px] font-semibold text-ink">{a.name}</h3>
              <div className="mt-0.5 flex items-center gap-1 text-[12px] text-ink-soft">
                <MapPin className="h-3 w-3 shrink-0" strokeWidth={2} />
                <span className="truncate">{a.location}</span>
              </div>

              <div className="mt-3.5 grid w-full grid-cols-2 gap-2">
                <div className="flex items-center gap-2 rounded-[12px] bg-sand px-3 py-2.5">
                  <Star className="h-4 w-4 shrink-0 fill-warn text-warn" strokeWidth={1} />
                  <div className="min-w-0 text-left">
                    <div className="price text-[15px] leading-none text-ink">{a.rating}</div>
                    <div className="meta mt-0.5">Rating</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-[12px] bg-sand px-3 py-2.5">
                  <Building2 className="h-4 w-4 shrink-0 text-brand" strokeWidth={2} />
                  <div className="min-w-0 text-left">
                    <div className="price text-[15px] leading-none text-ink">{a.listings}</div>
                    <div className="meta mt-0.5">Listings</div>
                  </div>
                </div>
              </div>

              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="morph-fast mt-3.5 flex w-full items-center justify-center gap-1.5 rounded-[13px] bg-ink px-3 py-2.5 text-[12.5px] font-semibold text-background hover:bg-brand"
              >
                <ListChecks className="h-3.5 w-3.5" strokeWidth={2.2} />
                View agency
                <ArrowUpRight
                  className="morph-fast h-3.5 w-3.5 opacity-60 group-hover:translate-x-0.5"
                  strokeWidth={2.4}
                />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
