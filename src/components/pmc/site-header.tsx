import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight, Home, Menu, Search, X } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { scrollToId } from "@/lib/scroll";

type NavLink = { label: string; desc?: string; target?: string; path?: string };
type NavGroup = { label: string; tagline: string; links: NavLink[]; path?: string };

const toPropsPath = (deal: "Buy" | "Rent", type?: string) =>
  `/properties?deal=${deal}&beds=Any&price=${encodeURIComponent("Any price")}&type=${type ? encodeURIComponent(type) : "Any"}&area=&page=1&view=grid&sort=popular`;

const NAV: NavGroup[] = [
  {
    label: "Properties",
    tagline: "Inspected · verified · precise",
    path: toPropsPath("Buy"),
    links: [
      { label: "Buy", desc: "Houses, apartments & plots", path: toPropsPath("Buy") },
      { label: "Rent", desc: "Long & short-term rentals", path: toPropsPath("Rent") },
      { label: "New Projects", desc: "Developments modelled in 3D", target: "#projects" },
      { label: "Plots", desc: "Verified titles, clear records", path: toPropsPath("Buy", "Plots") },
      { label: "Invest", desc: "Yield-backed opportunities", target: "#invest" },
    ],
  },
  {
    label: "Services",
    tagline: "Everything after the keys",
    path: "/services",
    links: [
      { label: "Cleaning", desc: "Vetted teams, fixed PMC rates", path: "/services" },
      { label: "Maintenance", desc: "Repairs & upkeep on schedule", path: "/services" },
      { label: "Renovation", desc: "Quoted, documented, delivered", path: "/services" },
      { label: "Moving", desc: "Door-to-door, insured", path: "/services" },
    ],
  },
  {
    label: "Organizations",
    tagline: "Built for the industry",
    links: [
      { label: "Agencies", desc: "List directly on PMC", target: "#agencies" },
      { label: "Developers", desc: "Projects with digital twins", target: "#projects" },
      { label: "Providers", desc: "Offer services to owners", path: "/services" },
      { label: "Partners", desc: "Banks, financers, insurers", target: "#partners" },
    ],
  },
  {
    label: "Discover",
    tagline: "Know it before you go",
    links: [
      { label: "Area Guides", desc: "Housing societies in Pakistan", target: "#tools" },
      { label: "Property Trends", desc: "Prices by locality", target: "#tools" },
      { label: "Market Reports", desc: "Price indices by locality", target: "#tools" },
      { label: "Inspection Standard", desc: "How every listing is verified", target: "#passport" },
    ],
  },
  {
    label: "Explore",
    tagline: "Tools & calculators",
    links: [
      { label: "New Projects", desc: "Best opportunities", target: "#projects" },
      { label: "Construction Cost Calculator", desc: "Estimate your build", target: "#tools" },
      { label: "Home Loan Calculator", desc: "Affordable loan packages", target: "#tools" },
      { label: "Area Unit Converter", desc: "Convert any unit instantly", target: "#tools" },
      { label: "Plot Finder", desc: "Plots in any society", target: "#browse" },
      { label: "Property Index", desc: "Track price changes", target: "#tools" },
    ],
  },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const navigate = useNavigate();

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openOn = (label: string) => {
    clearCloseTimer();
    setOpen(label);
  };

  const closeAfter = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => {
      setOpen(null);
      closeTimer.current = null;
    }, 350);
  };

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearCloseTimer();
        setOpen(null);
        setMobileOpen(false);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!open && !mobileOpen) return;
      if (!(e.target as Element).closest("[data-nav]")) {
        clearCloseTimer();
        setOpen(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
      clearCloseTimer();
    };
  }, [open, mobileOpen]);

  const go = (target?: string) => {
    clearCloseTimer();
    setOpen(null);
    setMobileOpen(false);
    if (!target) return;
    if (document.querySelector(target)) {
      scrollToId(target);
    } else {
      // Section lives on the home page — jump there; native scroll-margin handles the offset.
      window.location.href = `/${target}`;
    }
  };

  // Client-side navigation to routed pages (properties / services) with filters carried in the path.
  const navigateTo = (path: string) => {
    const [to, qs] = path.split("?");
    if (to === "/services") {
      navigate({ to: "/services" });
      return;
    }
    if (to === "/properties") {
      const p = new URLSearchParams(qs ?? "");
      navigate({
        to: "/properties",
        search: {
          deal: p.get("deal") as "Buy" | "Rent",
          beds: p.get("beds") ?? "Any",
          price: p.get("price") ?? "Any price",
          type: p.get("type") ?? "Any",
          area: p.get("area") ?? "",
          page: Number(p.get("page")) || 1,
          view: (p.get("view") ?? "grid") as "grid" | "list",
          sort: (p.get("sort") ?? "popular") as "popular" | "price-asc" | "price-desc" | "newest",
        },
      });
    }
  };

  const goLink = (l: NavLink) => {
    clearCloseTimer();
    setOpen(null);
    setMobileOpen(false);
    if (l.path) {
      navigateTo(l.path);
    } else if (l.target) {
      go(l.target);
    }
  };

  return (
    <header data-nav className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <div
        className={`morph relative mx-auto flex max-w-[1240px] items-center rounded-[18px] px-4 py-2.5 ${
          scrolled || open !== null || mobileOpen
            ? "bg-white shadow-soft hairline"
            : "bg-transparent"
        }`}
      >
        <div className="flex w-full items-center gap-5">
          {/* Brand */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate({ to: "/" });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="PMC Property — home"
            className="morph-fast group flex shrink-0 items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-ink text-background shadow-soft transition-colors duration-500 group-hover:bg-brand">
              <Home className="h-4.5 w-4.5" strokeWidth={2.1} />
            </span>
            <span className="hidden sm:block">
              <span className="block text-[14.5px] font-semibold leading-none tracking-tight text-ink">
                PMC
              </span>
              <span className="mt-1 block text-[9.5px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                Property
              </span>
            </span>
          </a>

          {/* Desktop dropdown nav — overlays, never pushes content */}
          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV.map((g) => (
              <div
                key={g.label}
                className="relative"
                onMouseEnter={() => openOn(g.label)}
                onMouseLeave={closeAfter}
              >
                <button
                  onClick={() => {
                    if (g.path) {
                      clearCloseTimer();
                      setOpen(null);
                      setMobileOpen(false);
                      navigateTo(g.path);
                    } else if (open === g.label) {
                      closeAfter();
                    } else {
                      openOn(g.label);
                    }
                  }}
                  aria-expanded={open === g.label}
                  className={`morph-fast flex items-center gap-1 rounded-[10px] px-3 py-1.5 text-[13.5px] font-medium ${
                    open === g.label
                      ? "bg-sand text-ink"
                      : "text-ink-soft hover:bg-sand hover:text-ink"
                  }`}
                >
                  {g.label}
                  <ChevronDown
                    className={`morph-fast h-3.5 w-3.5 ${open === g.label ? "rotate-180" : ""}`}
                    strokeWidth={2}
                  />
                </button>

                {/* invisible bridge so the cursor crossing the gap keeps the menu open */}
                <span
                  aria-hidden
                  className="absolute -bottom-3 left-0 right-0 h-3 rounded-b-[10px]"
                />

                <div
                  className={`morph absolute left-1/2 top-[calc(100%+12px)] w-72 -translate-x-1/2 rounded-[18px] bg-white p-2 shadow-lift hairline ${
                    open === g.label
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-2 opacity-0"
                  }`}
                >
                  <div
                    key={open === g.label ? g.label : "none"}
                    className={
                      open === g.label ? "animate-in fade-in slide-in-from-top-2 duration-300" : ""
                    }
                  >
                    <div className="flex items-baseline justify-between gap-2 px-2.5 pb-2 pt-1">
                      <span className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                        {g.label}
                      </span>
                      <span className="truncate text-[10px] text-ink-soft/70">{g.tagline}</span>
                    </div>
                    {g.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.path ?? l.target ?? "#"}
                        onClick={(e) => {
                          e.preventDefault();
                          goLink(l);
                        }}
                        className="morph-fast group flex items-center gap-3 rounded-[12px] px-2.5 py-2 hover:bg-sand"
                      >
                        <span className="min-w-0">
                          <span className="block text-[13px] font-medium text-ink">{l.label}</span>
                          {l.desc && (
                            <span className="block truncate text-[11.5px] text-ink-soft">
                              {l.desc}
                            </span>
                          )}
                        </span>
                        <ChevronRight
                          className="ml-auto h-3.5 w-3.5 shrink-0 text-ink-soft/40 group-hover:translate-x-0.5 group-hover:text-brand"
                          strokeWidth={2}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              aria-label="Search"
              className="morph-fast flex h-9 w-9 items-center justify-center rounded-[11px] text-ink-soft hover:bg-sand hover:text-ink"
            >
              <Search className="h-4 w-4" strokeWidth={1.9} />
            </button>
            <button className="morph-fast hidden rounded-[11px] px-3 py-1.5 text-[13.5px] font-medium text-ink-soft hover:text-ink sm:block">
              Sign In
            </button>
            <button className="morph-fast hidden rounded-[12px] bg-ink px-3.5 py-2 text-[13px] font-semibold text-background hover:bg-brand sm:block">
              Join Today
            </button>

            {/* Mobile menu */}
            <div className="relative md:hidden">
              <button
                aria-label="Menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((o) => !o)}
                className="morph-fast flex h-9 w-9 items-center justify-center rounded-[11px] text-ink-soft hover:bg-sand hover:text-ink"
              >
                {mobileOpen ? (
                  <X className="h-4 w-4" strokeWidth={1.9} />
                ) : (
                  <Menu className="h-4 w-4" strokeWidth={1.9} />
                )}
              </button>

              <div
                className={`morph absolute right-0 top-[calc(100%+16px)] max-h-[min(75vh,560px)] w-[min(86vw,340px)] overflow-y-auto rounded-[18px] bg-white p-2 shadow-lift hairline ${
                  mobileOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-2 opacity-0"
                }`}
              >
                <div>
                  {NAV.map((g) => (
                    <MobileGroup key={g.label} group={g} onGo={goLink} />
                  ))}
                  <div className="mt-1 flex gap-1.5 border-t border-border pt-2">
                    <button className="morph-fast flex-1 rounded-[11px] px-3 py-2 text-[13px] font-medium text-ink-soft hover:text-ink">
                      Sign In
                    </button>
                    <button className="morph-fast flex-1 rounded-[11px] bg-ink px-3 py-2 text-[13px] font-semibold text-background hover:bg-brand">
                      Join Today
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileGroup({ group, onGo }: { group: NavGroup; onGo: (l: NavLink) => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="overflow-hidden rounded-[12px]">
      <button
        onClick={() => setExpanded((e) => !e)}
        aria-expanded={expanded}
        className="morph-fast flex w-full items-center justify-between rounded-[12px] px-2.5 py-2.5 text-[13.5px] font-medium text-ink hover:bg-sand"
      >
        {group.label}
        <ChevronDown
          className={`morph-fast h-4 w-4 text-ink-soft ${expanded ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>
      <div
        className={`morph grid ${expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="px-2 pb-2">
            {group.links.map((l) => (
              <a
                key={l.label}
                href={l.path ?? l.target ?? "#"}
                onClick={(e) => {
                  e.preventDefault();
                  onGo(l);
                }}
                className="morph-fast flex items-center justify-between rounded-[10px] px-2.5 py-2 text-[13px] text-ink-soft hover:bg-sand hover:text-ink"
              >
                {l.label}
                {l.desc && <span className="truncate pl-3 text-[11px]">{l.desc}</span>}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
