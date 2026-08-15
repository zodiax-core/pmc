import { ArrowUpRight, BadgeCheck, Bath, Bed, MapPin, Ruler } from "lucide-react";
import { LazyImage, BrandLogo } from "./image";
import { Saveable } from "./saveable";
import type { Listing } from "@/lib/listings";

export function FeaturedProperty({ p }: { p: Listing }) {
  return (
    <article className="group relative grid overflow-hidden rounded-[28px] bg-surface-raised shadow-lift md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <div className="relative overflow-hidden">
        <LazyImage
          src={p.img}
          alt={p.alt}
          eager
          className="h-full w-full"
          imgClassName="aspect-[16/11] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] md:aspect-auto md:min-h-[300px]"
        />
        <span className="absolute left-4 top-4 flex items-center gap-1 rounded-[11px] bg-brand px-3 py-1.5 text-[10.5px] font-semibold tracking-[0.1em] text-brand-foreground shadow-soft">
          <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
          PMC FEATURED
        </span>
        <div className="absolute right-4 top-4">
          <Saveable expand />
        </div>
      </div>

      <div className="flex flex-col p-5 pt-4 sm:p-6 sm:pt-5 lg:p-7">
        <span className="label-eyebrow">Featured property</span>
        <h3 className="mt-2 text-[clamp(1.4rem,2.4vw,1.9rem)] leading-[1.05] font-semibold text-ink">
          {p.title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-ink-soft" strokeWidth={2} />
          <span className="text-[13px] font-medium text-ink-soft">{p.place}</span>
        </div>

        <div className="price mt-4 text-[clamp(1.9rem,3vw,2.4rem)] font-semibold tracking-tight text-ink">
          {p.price}
        </div>

        <p className="mt-3 max-w-[52ch] text-[14px] leading-relaxed text-ink-soft">{p.desc}</p>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          {p.beds > 0 && (
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-ink">
              <Bed className="h-4 w-4 text-ink-soft" strokeWidth={1.8} />
              {p.beds} Beds
            </span>
          )}
          {p.baths > 0 && (
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-ink">
              <Bath className="h-4 w-4 text-ink-soft" strokeWidth={1.8} />
              {p.baths} Baths
            </span>
          )}
          <span className="flex items-center gap-1.5 text-[13px] font-medium text-ink">
            <Ruler className="h-4 w-4 text-ink-soft" strokeWidth={1.8} />
            {p.area}
          </span>
        </div>

        <div className="mt-5 mb-5 flex flex-wrap items-center gap-3">
          {p.seller && (
            <span className="flex items-center gap-2 rounded-[12px] bg-sand px-3 py-2 text-[12.5px] font-medium text-ink">
              <span className="h-5 w-5 overflow-hidden rounded-full">
                <BrandLogo src={p.seller.logo} name={p.seller.name} round />
              </span>
              {p.seller.name}
            </span>
          )}
          <span className="flex items-center gap-1.5 rounded-[12px] bg-brand-soft px-3 py-2 text-[12px] font-semibold tracking-[0.04em] text-brand">
            <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.4} />
            Passport
          </span>
        </div>

        <button className="morph-fast group/btn mt-auto flex h-12 w-fit items-center gap-2 rounded-[15px] bg-ink px-6 text-[14px] font-semibold text-background hover:bg-brand">
          View
          <ArrowUpRight
            className="morph-fast h-4.5 w-4.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            strokeWidth={2.2}
          />
        </button>
      </div>
    </article>
  );
}
