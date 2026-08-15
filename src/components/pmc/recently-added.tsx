import { Boxes, MapPin } from "lucide-react";
import { LazyImage } from "./image";
import { LISTINGS } from "@/lib/listings";

export function RecentlyAdded() {
  const recentlyAdded = [...LISTINGS]
    .sort((a, b) => +new Date(b.addedAt) - +new Date(a.addedAt))
    .slice(0, 8);

  return (
    <div className="rounded-[26px] bg-surface-raised p-5 shadow-soft hairline sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <span className="label-eyebrow">Recently added</span>
          <h3 className="mt-2 text-[20px] font-semibold text-ink">Fresh on the market.</h3>
        </div>
        <span className="meta">Newest first</span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {recentlyAdded.map((l) => (
          <article
            key={l.id}
            className="group overflow-hidden rounded-[18px] bg-sand/50 transition-shadow duration-500 hover:shadow-soft"
          >
            <div className="relative overflow-hidden">
              <LazyImage
                src={l.img}
                alt={l.alt}
                className="aspect-[16/10] w-full"
                imgClassName="transition-transform duration-700 group-hover:scale-[1.05]"
              />
              {l.has3d && (
                <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-ink/85 text-background backdrop-blur-sm">
                  <Boxes className="h-3.5 w-3.5" strokeWidth={2.2} />
                </span>
              )}
            </div>
            <div className="p-3.5">
              <div className="flex items-center gap-1 text-[11.5px] font-medium text-ink-soft">
                <MapPin className="h-3 w-3" strokeWidth={2} />
                <span className="truncate">{l.place}</span>
              </div>
              <div className="price mt-1 text-[16px] font-semibold text-ink">{l.price}</div>
              <div className="truncate text-[12px] text-ink-soft">{l.title}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
