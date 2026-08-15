import type { ReactNode } from "react";
import { ArrowUpRight, BadgeCheck, Bath, Bed, MapPin, MessageCircle, Ruler } from "lucide-react";
import { LazyImage, BrandLogo } from "./image";
import { Saveable } from "./saveable";
import type { Listing } from "@/lib/listings";

export type CardView = "grid" | "list";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function VerifiedChip({ badge }: { badge: string | undefined }) {
  if (badge === "PMC INSPECTED") {
    return (
      <span className="flex items-center gap-0.5 rounded-[8px] bg-brand-soft px-1.5 py-0.5 text-[9.5px] font-semibold tracking-[0.06em] text-brand sm:gap-1 sm:rounded-[9px] sm:px-2 sm:py-1 sm:text-[10.5px]">
        <BadgeCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={2.4} />
        Passport
      </span>
    );
  }
  if (badge) {
    return (
      <span className="rounded-[8px] bg-sand px-1.5 py-0.5 text-[9.5px] font-semibold tracking-[0.06em] text-ink-soft sm:rounded-[9px] sm:px-2 sm:py-1 sm:text-[10.5px]">
        {badge}
      </span>
    );
  }
  return (
    <span className="flex items-center gap-0.5 rounded-[8px] bg-brand-soft/70 px-1.5 py-0.5 text-[9.5px] font-semibold tracking-[0.06em] text-brand sm:gap-1 sm:rounded-[9px] sm:px-2 sm:py-1 sm:text-[10.5px]">
      <BadgeCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={2.4} />
      Passport
    </span>
  );
}

function Detail({ icon, value }: { icon: ReactNode; value: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[11px] font-medium text-ink-soft sm:text-[12px]">
      {icon}
      {value}
    </span>
  );
}

export function PropertyCard({ p, view, eager }: { p: Listing; view: CardView; eager?: boolean }) {
  const grid = view === "grid";
  return (
    <article
      className={`group relative overflow-hidden rounded-[26px] bg-surface-raised shadow-soft transition-shadow duration-500 hover:shadow-lift ${
        grid ? "flex flex-col" : "flex flex-row items-stretch gap-2.5 p-2.5 sm:gap-5 sm:p-5"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden ${
          grid ? "" : "w-36 self-stretch rounded-[14px] sm:w-52 sm:rounded-[16px] lg:w-72"
        }`}
      >
        <LazyImage
          src={p.img}
          alt={p.alt}
          {...(eager !== undefined ? { eager } : {})}
          className="h-full w-full"
          imgClassName={
            grid
              ? "aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.05]"
              : "h-full w-full object-cover"
          }
        />

        <span className="absolute left-3 top-3 flex items-center rounded-[9px] bg-ink/85 px-2.5 py-1 text-[10px] font-semibold tracking-[0.08em] text-background backdrop-blur-sm">
          {p.type.toUpperCase()}
        </span>

        <div className="absolute right-3 top-3">
          <Saveable expand={grid} />
        </div>

        {p.seller && (
          <span
            title={`Sold by ${p.seller.name}`}
            className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-surface-raised p-0.5 shadow-lift ring-2 ring-background/70"
          >
            <BrandLogo src={p.seller.logo} name={p.seller.name} round />
          </span>
        )}
      </div>

      <div className={`flex min-w-0 flex-1 flex-col ${grid ? "p-4 sm:p-5" : "py-0.5"}`}>
        <div className="flex items-center gap-1.5">
          <MapPin className={`h-3 w-3 shrink-0 text-ink-soft sm:h-3.5 sm:w-3.5`} strokeWidth={2} />
          <span className="truncate text-[11.5px] font-medium text-ink-soft sm:text-[12.5px]">
            {p.place}
          </span>
        </div>

        <div
          className={`price mt-1.5 font-semibold tracking-tight text-ink ${
            grid ? "text-[24px] sm:text-[26px]" : "text-[16px] sm:text-[24px]"
          }`}
        >
          {p.price}
        </div>

        <h3
          className={`mt-1 font-semibold leading-snug text-ink ${grid ? "text-[16px]" : "text-[13.5px] sm:text-[16px]"}`}
        >
          {p.title}
        </h3>

        <p
          className={`mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink-soft ${
            grid ? "" : "hidden lg:block"
          }`}
        >
          {p.desc}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-1 sm:mt-3 sm:gap-2">
          <VerifiedChip badge={p.badge} />
          {p.seller && (
            <span className="flex min-w-0 items-center gap-1 text-[10px] font-medium text-ink-soft sm:gap-1.5 sm:text-[11.5px]">
              <span className="h-3.5 w-3.5 shrink-0 overflow-hidden rounded-full sm:h-4 sm:w-4">
                <BrandLogo src={p.seller.logo} name={p.seller.name} round />
              </span>
              <span className="truncate">{p.seller.name}</span>
            </span>
          )}
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-1.5 gap-y-1 sm:mt-3 sm:gap-x-2">
          {p.beds > 0 && (
            <Detail
              icon={<Bed className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.8} />}
              value={`${p.beds} Beds`}
            />
          )}
          {p.baths > 0 && (
            <Detail
              icon={<Bath className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.8} />}
              value={`${p.baths} Baths`}
            />
          )}
          <Detail
            icon={<Ruler className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.8} />}
            value={p.area}
          />
        </div>

        <div className="mt-auto pt-3 sm:pt-4">
          {grid ? (
            <div className="flex items-center gap-1.5">
              <button
                aria-label="Message seller"
                className="morph-fast flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-sand text-ink hover:bg-sand-deep hover:text-ink"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={2} />
              </button>
              <button
                aria-label="Chat on WhatsApp"
                className="morph-fast flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-sand text-ink hover:bg-sand-deep hover:text-ink"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </button>
              <button className="morph-fast group/btn flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-[14px] bg-ink text-[13.5px] font-semibold text-background hover:bg-brand">
                View
                <ArrowUpRight
                  className="morph-fast h-4 w-4 shrink-0 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  strokeWidth={2.2}
                />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                aria-label="Message seller"
                className="morph-fast flex h-8 w-8 items-center justify-center rounded-[10px] bg-sand text-ink hover:bg-sand-deep hover:text-ink sm:h-9 sm:w-9"
              >
                <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
              </button>
              <button
                aria-label="Chat on WhatsApp"
                className="morph-fast flex h-8 w-8 items-center justify-center rounded-[10px] bg-sand text-ink hover:bg-sand-deep hover:text-ink sm:h-9 sm:w-9"
              >
                <WhatsAppIcon className="h-3.5 w-3.5" />
              </button>
              <button className="morph-fast ml-auto flex h-8 items-center gap-1.5 rounded-[10px] bg-ink px-3 text-[11.5px] font-semibold text-background hover:bg-brand sm:h-9 sm:px-4 sm:text-[12.5px]">
                View
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
