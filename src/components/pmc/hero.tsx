import { useEffect, useRef } from "react";
import { BadgeCheck, Boxes } from "lucide-react";
import heroHouse from "@/assets/hero-house-opt.jpg";
import { SearchPanel } from "./search-panel";
import { scrollToId } from "@/lib/scroll";
import type { SearchState } from "@/lib/listings";

const STATS = [
  ["12,480", "Inspected homes"],
  ["3,910", "3D twins"],
  ["98.2%", "Document match"],
] as const;

export function Hero({
  search,
  onChange,
}: {
  search: SearchState;
  onChange: (next: SearchState) => void;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let ticking = false;
    let stageTop = 0;
    let travel = window.innerHeight * 0.7;

    const measure = () => {
      const stage = stageRef.current;
      if (!stage) return;
      stageTop = stage.getBoundingClientRect().top + window.scrollY;
      travel = window.innerHeight * 0.7;
    };

    const update = () => {
      ticking = false;
      const stage = stageRef.current;
      const card = cardRef.current;
      const img = imgRef.current;
      if (!stage || !card || !img) return;

      measure();
      // t = 0 the moment the card pins at the top of the viewport,
      // t = 1 exactly when its bottom edge reaches the viewport bottom,
      // then the next section slides over it edge-to-edge.
      const t = Math.min(1, Math.max(0, (window.scrollY - stageTop) / travel));

      // 0.84 (inset, rounded, margined) → 1 (full screen)
      card.style.transform = `scale(${(0.84 + 0.16 * t).toFixed(3)})`;
      card.style.borderRadius = `${Math.round(32 * (1 - t))}px`;
      // subtle parallax drift inside the image
      img.style.transform = `scale(1.12) translateY(${(-t * 90).toFixed(1)}px)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="relative">
      {/* Centered intro + search + stats */}
      <div className="mx-auto flex max-w-[1240px] flex-col items-center px-4 pt-28 text-center sm:px-6 sm:pt-32">
        <span className="label-eyebrow">Property, reimagined</span>
        <h1 className="mt-5 text-[clamp(2.5rem,5.4vw,4.15rem)] leading-[0.94] font-semibold text-ink">
          Find a place.
          <span className="block text-ink-soft">Know it before you go.</span>
        </h1>
        <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-ink-soft">
          Every PMC listing is inspected, documented and modelled in 3D — so what you see on screen
          is what you walk into.
        </p>

        <div className="mt-9 flex w-full justify-center">
          <SearchPanel value={search} onChange={onChange} onSearch={() => scrollToId("#browse")} />
        </div>

        {/* Stats — centered under the search field */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-y-3">
          {STATS.map(([n, l], i) => (
            <div
              key={l}
              className={`flex items-center ${i > 0 ? "border-l border-border pl-7 sm:pl-9" : ""} ${i > 0 ? "ml-7 sm:ml-9" : ""}`}
            >
              <div>
                <div className="price text-[19px] text-ink">{n}</div>
                <div className="meta">{l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image — inset rounded card that expands to full screen on scroll,
          then scrolls away as the page below takes over. */}
      <div ref={stageRef} className="mt-14 h-[170vh]">
        <div
          ref={cardRef}
          className="sticky top-0 h-[100svh] origin-center overflow-hidden bg-sand shadow-lift will-change-transform"
        >
          <img
            ref={imgRef}
            src={heroHouse}
            alt="Modern travertine and timber residence in DHA Phase 6, Lahore"
            width={1200}
            height={1504}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover will-change-transform"
          />

          <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-[12px] bg-surface-raised/92 px-2.5 py-1.5 shadow-soft backdrop-blur-sm">
            <BadgeCheck className="h-3.5 w-3.5 text-brand" strokeWidth={2.2} />
            <span className="text-[11px] font-semibold tracking-[0.06em] text-ink">
              PMC VERIFIED
            </span>
          </div>

          <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-[12px] bg-ink/85 px-2.5 py-1.5 text-background backdrop-blur-sm">
            <Boxes className="h-3.5 w-3.5" strokeWidth={2} />
            <span className="text-[11px] font-semibold tracking-[0.06em]">3D AVAILABLE</span>
          </div>
        </div>
      </div>
    </section>
  );
}
