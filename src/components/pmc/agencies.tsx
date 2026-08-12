import { ArrowUpRight, BadgeCheck, MapPin, Star } from "lucide-react";

const AGENCIES = [
  {
    name: "Zameen Realty",
    initials: "ZR",
    location: "Lahore · DHA",
    rating: "4.9",
    listings: 214,
    badge: "TOP AGENCY",
  },
  {
    name: "Pace Agencies",
    initials: "PA",
    location: "Karachi · Clifton",
    rating: "4.8",
    listings: 168,
  },
  {
    name: "Everest Properties",
    initials: "EP",
    location: "Islamabad · F-7",
    rating: "4.7",
    listings: 141,
    badge: "PMC VERIFIED",
  },
  {
    name: "Rivera Homes",
    initials: "RH",
    location: "Lahore · Gulberg",
    rating: "4.6",
    listings: 96,
  },
] as const;

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
            className="group flex flex-col rounded-[22px] bg-surface-raised p-4 shadow-soft hover:shadow-lift"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-sand font-display text-[15px] font-bold text-ink">
                {a.initials}
              </span>
              <div className="min-w-0">
                <h3 className="truncate text-[14.5px] font-semibold text-ink">{a.name}</h3>
                <div className="mt-0.5 flex items-center gap-1 text-[12px] text-ink-soft">
                  <MapPin className="h-3 w-3" strokeWidth={2} />
                  {a.location}
                </div>
              </div>
            </div>

            {a.badge && (
              <div className="mt-3 flex items-center gap-1.5">
                <BadgeCheck className="h-3.5 w-3.5 text-brand" strokeWidth={2.2} />
                <span className="text-[10.5px] font-semibold tracking-[0.07em] text-brand">
                  {a.badge}
                </span>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <div className="flex items-center gap-1 text-[13px] font-semibold text-ink">
                <Star className="h-3.5 w-3.5 fill-warn text-warn" strokeWidth={1} />
                {a.rating}
                <span className="meta font-normal">· {a.listings} listings</span>
              </div>
              <ArrowUpRight
                className="h-4 w-4 text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                strokeWidth={2.2}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
