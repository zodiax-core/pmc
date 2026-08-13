import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToId(id: string) {
  if (lenis) {
    lenis.scrollTo(id, { offset: -90 });
  } else {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }
}

export function lockScroll() {
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  lenis?.stop();
}

export function unlockScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  lenis?.start();
}
