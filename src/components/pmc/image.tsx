import { useState, type Ref } from "react";

type ImageState = "loading" | "loaded" | "error";

export function LazyImage({
  src,
  alt,
  className,
  imgClassName,
  eager,
  imgRef,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  imgRef?: Ref<HTMLImageElement>;
}) {
  const [state, setState] = useState<ImageState>("loading");

  return (
    <div className={`relative overflow-hidden bg-sand ${className ?? ""}`}>
      {state === "loading" && (
        <div aria-hidden className="absolute inset-0 animate-pulse bg-sand-deep/40" />
      )}
      {state === "error" && (
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-sand to-sand-deep/60" />
      )}
      {state !== "error" && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          {...(eager ? { fetchPriority: "high" as const } : {})}
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
          className={`morph h-full w-full object-cover ${
            state === "loaded" ? "opacity-100" : "opacity-0"
          } ${imgClassName ?? ""}`}
        />
      )}
    </div>
  );
}

export function BrandLogo({
  src,
  name,
  className,
  imgClassName,
  round,
}: {
  src?: string;
  name: string;
  className?: string;
  imgClassName?: string;
  round?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showImg = !!src && !failed;

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <span
      className={`flex items-center justify-center overflow-hidden ${
        round ? "rounded-full" : "rounded-[9px]"
      } ${className ?? ""}`}
    >
      {showImg ? (
        <img
          src={src}
          alt={name}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-contain ${round ? "rounded-full" : ""} ${imgClassName ?? ""}`}
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center bg-ink text-[10px] font-bold text-background">
          {initials}
        </span>
      )}
    </span>
  );
}
