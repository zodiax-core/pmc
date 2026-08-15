import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FeaturedProperty } from "./featured-property";
import type { Listing } from "@/lib/listings";

const AUTO_MS = 3000;

export function FeaturedCarousel({ items }: { items: Listing[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [coarse, setCoarse] = useState(false);

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Render two copies so scrolling wraps seamlessly (loop).
  const doubled = [...items, ...items];

  const stepPx = () => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 0;
    return first.offsetWidth + 16; // gap-4
  };

  const goTo = (pos: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: pos * stepPx(), behavior: "smooth" });
  };

  // Auto-advance every 3s — loops by jumping to the duplicate copy.
  useEffect(() => {
    if (coarse || paused || items.length < 2) return;
    const track = trackRef.current;
    if (!track) return;

    const id = window.setInterval(() => {
      const step = stepPx();
      if (!step) return;
      const next = track.scrollLeft + step;
      // Reached the start of the duplicate copy → snap back to the real start.
      if (next >= step * items.length) {
        track.scrollTo({ left: 0, behavior: "auto" });
      } else {
        track.scrollTo({ left: next, behavior: "smooth" });
      }
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [coarse, paused, items.length]);

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    const step = stepPx();
    if (!track || !step) return;
    const pos = track.scrollLeft / step;
    if (dir === 1 && Math.floor(pos + 0.5) >= items.length) {
      track.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      track.scrollBy({ left: dir * step, behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex flex-wrap items-end justify-between gap-3 px-1">
        <div>
          <span className="label-eyebrow">Featured listings</span>
          <h3 className="mt-2 text-[20px] font-semibold text-ink">Hand-picked, inspected first.</h3>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            aria-label="Previous featured"
            onClick={() => scroll(-1)}
            className="morph-fast flex h-9 w-9 items-center justify-center rounded-[12px] bg-surface-raised text-ink-soft shadow-soft hover:bg-sand hover:text-ink"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2.2} />
          </button>
          <button
            aria-label="Next featured"
            onClick={() => scroll(1)}
            className="morph-fast flex h-9 w-9 items-center justify-center rounded-[12px] bg-surface-raised text-ink-soft shadow-soft hover:bg-sand hover:text-ink"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {doubled.map((l, i) => (
          <div
            key={`${l.id}-${i}`}
            className="w-[min(94vw,820px)] shrink-0 snap-start"
            aria-hidden={i >= items.length}
          >
            <FeaturedProperty p={l} />
          </div>
        ))}
      </div>
    </div>
  );
}
