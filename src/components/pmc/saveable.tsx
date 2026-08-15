import { useState } from "react";
import { Bookmark, Check } from "lucide-react";

export function Saveable({ expand }: { expand?: boolean }) {
  const [saved, setSaved] = useState(false);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        setSaved((s) => !s);
      }}
      aria-label={saved ? "Saved" : "Save property"}
      className={`morph flex h-9 items-center justify-center overflow-hidden backdrop-blur-sm ${
        saved
          ? expand
            ? "w-auto gap-1.5 rounded-full bg-brand px-3 text-brand-foreground"
            : "w-9 rounded-full bg-brand text-brand-foreground"
          : "w-9 rounded-full bg-surface-raised/90 text-ink hover:bg-surface-raised"
      }`}
    >
      {saved ? (
        <Check className="h-4 w-4" strokeWidth={2.6} />
      ) : (
        <Bookmark className="h-4 w-4" strokeWidth={2} />
      )}
      <span
        className={`morph text-[11px] font-semibold ${
          saved && expand ? "max-w-[60px] opacity-100" : "max-w-0 opacity-0"
        }`}
      >
        Saved
      </span>
    </button>
  );
}
