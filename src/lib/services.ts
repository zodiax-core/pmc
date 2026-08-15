import {
  AirVent,
  Brush,
  Car,
  Droplets,
  Flower2,
  Hammer,
  Home,
  Layers,
  Lightbulb,
  Lock,
  Move,
  PaintRoller,
  PencilRuler,
  Plug,
  Shield,
  Sparkles,
  Sun,
  Truck,
  User,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type ServiceCategory = {
  id: string;
  name: string;
  short: string;
  icon: LucideIcon;
  from: string;
  range?: string;
};

export type ServiceGroup = {
  title: string;
  tagline: string;
  services: ServiceCategory[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    title: "Home Maintenance",
    tagline: "Keep the essentials running",
    services: [
      {
        id: "plumbing",
        name: "Plumbing",
        short: "Leaks, taps & fittings",
        icon: Droplets,
        from: "PKR 1,500",
        range: "1,500–5,000",
      },
      {
        id: "electrical",
        name: "Electrical",
        short: "Wiring, sockets & fixtures",
        icon: Zap,
        from: "PKR 2,100",
        range: "2,100–7,000",
      },
      {
        id: "carpentry",
        name: "Carpentry",
        short: "Doors, shelves & repairs",
        icon: Hammer,
        from: "PKR 2,000",
      },
      {
        id: "ac",
        name: "AC & HVAC",
        short: "Repair, maintenance & install",
        icon: AirVent,
        from: "PKR 2,500",
        range: "2,500–8,500",
      },
      {
        id: "appliance",
        name: "Appliance Repair",
        short: "Fridges, washers & ovens",
        icon: Wrench,
        from: "PKR 1,800",
      },
    ],
  },
  {
    title: "Cleaning & Care",
    tagline: "Spotless, regular or deep",
    services: [
      {
        id: "cleaning",
        name: "Home Cleaning",
        short: "Rooms, kitchens & baths",
        icon: Brush,
        from: "PKR 3,200",
      },
      {
        id: "deep-cleaning",
        name: "Deep Cleaning",
        short: "Move-in ready, top to bottom",
        icon: Sparkles,
        from: "PKR 9,500",
      },
      {
        id: "pest",
        name: "Pest Control",
        short: "Safe, lasting treatments",
        icon: Shield,
        from: "PKR 4,500",
      },
      {
        id: "gardening",
        name: "Gardening",
        short: "Lawns, plants & upkeep",
        icon: Flower2,
        from: "PKR 3,000",
      },
    ],
  },
  {
    title: "Property Improvement",
    tagline: "Refresh, repair, transform",
    services: [
      {
        id: "painting",
        name: "Painting",
        short: "Walls, ceilings & exteriors",
        icon: PaintRoller,
        from: "PKR 12,000",
      },
      {
        id: "renovation",
        name: "Renovation",
        short: "Kitchens, baths & rooms",
        icon: Hammer,
        from: "PKR 85,000",
      },
      {
        id: "interior",
        name: "Interior Work",
        short: "Design, finishes & fit-out",
        icon: PencilRuler,
        from: "PKR 40,000",
      },
      {
        id: "flooring",
        name: "Flooring",
        short: "Tiles, marble & laminate",
        icon: Layers,
        from: "PKR 15,000",
      },
    ],
  },
  {
    title: "Moving & Property Support",
    tagline: "Settle in with ease",
    services: [
      {
        id: "moving",
        name: "Moving",
        short: "Door-to-door, insured",
        icon: Truck,
        from: "PKR 9,500",
      },
      {
        id: "packing",
        name: "Packing",
        short: "Boxed, labelled & ready",
        icon: Move,
        from: "PKR 6,000",
      },
      {
        id: "security",
        name: "Security",
        short: "Guards, cameras & locks",
        icon: Lock,
        from: "PKR 6,400",
      },
      {
        id: "water-tank",
        name: "Water & Tank",
        short: "Cleaning & maintenance",
        icon: Droplets,
        from: "PKR 2,800",
      },
      {
        id: "solar",
        name: "Solar",
        short: "Install, clean & service",
        icon: Sun,
        from: "PKR 25,000",
      },
    ],
  },
];

export const ALL_SERVICES: ServiceCategory[] = SERVICE_GROUPS.flatMap((g) => g.services);

export type PopularService = {
  id: string;
  name: string;
  blurb: string;
  icon: LucideIcon;
  from: string;
  jobs: number;
  tone: "ink" | "brand" | "sand";
};

export const POPULAR_SERVICES: PopularService[] = [
  {
    id: "ac",
    name: "AC Service",
    blurb: "Service, gas & repair for split and window units",
    icon: AirVent,
    from: "2,500",
    jobs: 412,
    tone: "ink",
  },
  {
    id: "deep-cleaning",
    name: "Deep Cleaning",
    blurb: "Move-in / move-out, kitchens and bathrooms",
    icon: Sparkles,
    from: "9,500",
    jobs: 386,
    tone: "brand",
  },
  {
    id: "plumbing",
    name: "Plumbing",
    blurb: "Leaks, blockages, taps and bathroom fittings",
    icon: Droplets,
    from: "1,500",
    jobs: 355,
    tone: "sand",
  },
  {
    id: "electrical",
    name: "Electrical",
    blurb: "Wiring, sockets, fans and light fixtures",
    icon: Zap,
    from: "2,100",
    jobs: 297,
    tone: "brand",
  },
  {
    id: "painting",
    name: "Painting",
    blurb: "Interior, exterior and boundary walls",
    icon: PaintRoller,
    from: "12,000",
    jobs: 268,
    tone: "ink",
  },
  {
    id: "pest",
    name: "Pest Control",
    blurb: "Cockroaches, termites and safe treatments",
    icon: Shield,
    from: "4,500",
    jobs: 241,
    tone: "sand",
  },
];

export type VerificationLevel = "identity" | "skills" | "pmc" | "business";

export type ProviderKind = "individual" | "organization";

export type Provider = {
  id: string;
  slug: string;
  name: string;
  role: string;
  initials: string;
  kind: ProviderKind;
  rating: number;
  jobs: number;
  location: string;
  city: string;
  category: string;
  from: string;
  fromNum: number;
  availability: string;
  responds: string;
  verify: VerificationLevel[];
  logo?: string;
  banner?: string;
};

export const PROVIDERS: Provider[] = [
  {
    id: "p1",
    slug: "muhammad-usman",
    name: "Muhammad Usman",
    role: "Plumbing",
    initials: "MU",
    kind: "individual",
    rating: 4.8,
    jobs: 126,
    location: "Lahore",
    city: "Lahore",
    category: "Plumbing",
    from: "1,500",
    fromNum: 1500,
    availability: "Available today",
    responds: "~20 min",
    verify: ["skills", "pmc"],
  },
  {
    id: "p2",
    slug: "fatima-khan",
    name: "Fatima Khan",
    role: "Deep Cleaning",
    initials: "FK",
    kind: "individual",
    rating: 4.9,
    jobs: 214,
    location: "Karachi",
    city: "Karachi",
    category: "Deep Cleaning",
    from: "8,500",
    fromNum: 8500,
    availability: "Available tomorrow",
    responds: "~15 min",
    verify: ["identity", "pmc"],
  },
  {
    id: "p3",
    slug: "bilal-ahmed",
    name: "Bilal Ahmed",
    role: "Electrical",
    initials: "BA",
    kind: "individual",
    rating: 4.7,
    jobs: 98,
    location: "Islamabad",
    city: "Islamabad",
    category: "Electrical",
    from: "2,200",
    fromNum: 2200,
    availability: "Available today",
    responds: "~25 min",
    verify: ["skills", "business"],
  },
  {
    id: "p4",
    slug: "aisha-rana",
    name: "Aisha Rana",
    role: "AC & HVAC",
    initials: "AR",
    kind: "individual",
    rating: 4.9,
    jobs: 187,
    location: "Lahore",
    city: "Lahore",
    category: "AC & HVAC",
    from: "2,400",
    fromNum: 2400,
    availability: "Tomorrow",
    responds: "~18 min",
    verify: ["skills", "pmc", "business"],
  },
  {
    id: "p5",
    slug: "sajid-hussain",
    name: "Sajid Hussain",
    role: "Painting",
    initials: "SH",
    kind: "individual",
    rating: 4.6,
    jobs: 152,
    location: "Karachi",
    city: "Karachi",
    category: "Painting",
    from: "11,000",
    fromNum: 11000,
    availability: "This week",
    responds: "~30 min",
    verify: ["skills"],
  },
  {
    id: "p6",
    slug: "nadia-malik",
    name: "Nadia Malik",
    role: "Gardening",
    initials: "NM",
    kind: "individual",
    rating: 4.8,
    jobs: 73,
    location: "Islamabad",
    city: "Islamabad",
    category: "Gardening",
    from: "2,900",
    fromNum: 2900,
    availability: "Available today",
    responds: "~20 min",
    verify: ["identity", "pmc"],
  },
  {
    id: "p7",
    slug: "sparkle-home-co",
    name: "Sparkle Home Co.",
    role: "Cleaning & Care",
    initials: "SP",
    kind: "organization",
    rating: 4.7,
    jobs: 342,
    location: "Lahore · DHA",
    city: "Lahore",
    category: "Deep Cleaning",
    from: "3,200",
    fromNum: 3200,
    availability: "Book 24/7",
    responds: "~10 min",
    verify: ["business", "pmc"],
    banner: "https://picsum.photos/seed/pmc-svc-a/640/256",
  },
  {
    id: "p8",
    slug: "coolcare-verified",
    name: "CoolCare Verified",
    role: "AC & HVAC",
    initials: "CC",
    kind: "organization",
    rating: 4.9,
    jobs: 512,
    location: "Karachi · Clifton",
    city: "Karachi",
    category: "AC & HVAC",
    from: "2,500",
    fromNum: 2500,
    availability: "Book 24/7",
    responds: "~15 min",
    verify: ["business", "pmc", "skills"],
    banner: "https://picsum.photos/seed/pmc-svc-b/640/256",
  },
  {
    id: "p9",
    slug: "finish-line-painters",
    name: "Finish Line Painters",
    role: "Painting",
    initials: "FL",
    kind: "organization",
    rating: 4.6,
    jobs: 288,
    location: "Islamabad · F-7",
    city: "Islamabad",
    category: "Painting",
    from: "12,000",
    fromNum: 12000,
    availability: "Book 24/7",
    responds: "~20 min",
    verify: ["business"],
    banner: "https://picsum.photos/seed/pmc-svc-c/640/256",
  },
];

export type Package = {
  name: string;
  tagline: string;
  includes: string[];
  price: string;
  badge?: string;
  provider: string;
  kind: ProviderKind;
  tag: string;
  full?: boolean;
};

export const PACKAGES: Package[] = [
  {
    name: "Move-in package",
    tagline: "Walk into a clean, working home",
    includes: ["Deep Cleaning", "Pest Control", "Electrical Check", "Plumbing Check"],
    price: "PKR 18,500",
    badge: "Most popular",
    provider: "Sparkle Home Co.",
    kind: "organization",
    tag: "move",
    full: true,
  },
  {
    name: "Home Care package",
    tagline: "Monthly peace of mind",
    includes: ["Monthly Cleaning", "AC Maintenance", "Plumbing Inspection"],
    price: "PKR 9,900 / mo",
    provider: "Rehman Plumbing",
    kind: "individual",
    tag: "care",
  },
  {
    name: "Property Refresh",
    tagline: "A weekend that changes the feel",
    includes: ["Painting", "Deep Cleaning", "Minor Repairs"],
    price: "PKR 45,000",
    provider: "Finish Line Painters",
    kind: "organization",
    tag: "refresh",
  },
  {
    name: "AC Care bundle",
    tagline: "Stay cool all summer",
    includes: ["AC Deep Clean", "Gas Refill", "Filter Replacement"],
    price: "PKR 6,500",
    provider: "CoolAire Services",
    kind: "organization",
    tag: "care",
  },
  {
    name: "Garden Refresh",
    tagline: "A lawn that looks after itself",
    includes: ["Lawn Mowing", "Trimming", "Fertilizer", "Seasonal Plant Care"],
    price: "PKR 4,200 / visit",
    provider: "Green Thumb Co.",
    kind: "organization",
    tag: "garden",
  },
  {
    name: "Full Move-In & Out",
    tagline: "Everything, one booking",
    includes: ["Moving & Packing", "Deep Cleaning", "Furniture Assembly", "AC Maintenance"],
    price: "PKR 28,000",
    badge: "Best value",
    provider: "SwiftMove Logistics",
    kind: "organization",
    tag: "move",
    full: true,
  },
  {
    name: "Security Setup",
    tagline: "Cameras & access, done",
    includes: ["Camera Installation", "Smart Lock", "App Setup", "1 Month Monitoring"],
    price: "PKR 24,000",
    provider: "SecureLine Systems",
    kind: "organization",
    tag: "security",
  },
  {
    name: "Emergency Handyman",
    tagline: "24/7 rapid response",
    includes: ["Emergency Callout", "Plumbing & Electrical", "Same-day Fix"],
    price: "PKR 3,500 / visit",
    provider: "Asad Fixes",
    kind: "individual",
    tag: "handyman",
  },
  {
    name: "Deep Clean Pro",
    tagline: "Hospital-grade cleanliness",
    includes: ["3-Bed Deep Clean", "Kitchen Degrease", "Sanitization"],
    price: "PKR 15,000",
    provider: "Sparkle Home Co.",
    kind: "organization",
    tag: "cleaning",
  },
];

export type ServiceHistoryItem = {
  service: string;
  date: string;
  status: "Completed" | "Scheduled";
};

export const SERVICE_HISTORY: ServiceHistoryItem[] = [
  { service: "AC Maintenance", date: "18 Aug 2026", status: "Completed" },
  { service: "Deep Cleaning", date: "04 Aug 2026", status: "Completed" },
  { service: "Plumbing", date: "21 Jul 2026", status: "Completed" },
];

export type MaintenanceItem = {
  label: string;
  when: string;
  kind: "Upcoming" | "Recommended";
};

export const MAINTENANCE: MaintenanceItem[] = [
  { label: "AC maintenance", when: "22 Aug", kind: "Upcoming" },
  { label: "Water tank cleaning", when: "28 Aug", kind: "Upcoming" },
  { label: "Exterior inspection", when: "Due this month", kind: "Recommended" },
];

// Natural-language keyword → service resolution.
const KEYWORDS: { keys: string[]; service: ServiceCategory | null }[] = [
  { keys: ["ac", "air condition", "cooling", "gas refill", "not cooling"], service: find("ac") },
  {
    keys: ["leak", "tap", "sink", "pipe", "plumb", "drain", "bathroom"],
    service: find("plumbing"),
  },
  { keys: ["clean", "cleaning", "sparkling", "tidy"], service: find("cleaning") },
  { keys: ["deep clean", "move in clean", "move out"], service: find("deep-cleaning") },
  { keys: ["paint", "painting", "paint my"], service: find("painting") },
  { keys: ["electrical", "wiring", "socket", "light not", "power"], service: find("electrical") },
  { keys: ["pest", "termite", "cockroach", "bugs", "insect"], service: find("pest") },
  { keys: ["move", "moving", "shifting", "relocat"], service: find("moving") },
  { keys: ["solar", "panels"], service: find("solar") },
  { keys: ["garden", "lawn", "grass", "plants"], service: find("gardening") },
  { keys: ["renovat", "remodel", "kitchen remodel"], service: find("renovation") },
  { keys: ["security", "camera", "guard", "alarm"], service: find("security") },
];

function find(id: string): ServiceCategory | null {
  return ALL_SERVICES.find((s) => s.id === id) ?? null;
}

export type AiResolution =
  | { service: ServiceCategory; phrase: string }
  | { matched: string; candidates: ServiceCategory[] }
  | null;

export function resolveServiceQuery(query: string): AiResolution {
  const q = query.toLowerCase();
  for (const k of KEYWORDS) {
    if (k.keys.some((key) => q.includes(key))) {
      if (k.service) return { service: k.service, phrase: query.trim() };
    }
  }
  const candidates = ALL_SERVICES.filter((s) =>
    q.split(/\s+/).some((word) => word.length > 2 && s.name.toLowerCase().includes(word)),
  );
  if (candidates.length > 0) return { matched: query.trim(), candidates: candidates.slice(0, 3) };
  return null;
}

export function serviceFromText(query: string): ServiceCategory | null {
  const r = resolveServiceQuery(query);
  return r && "service" in r ? r.service : null;
}

// All icons used by the "Quick" row on the property connection block.
export const QUICK_SERVICES = [
  { id: "ac", name: "AC Service", icon: AirVent },
  { id: "cleaning", name: "Cleaning", icon: Brush },
  { id: "plumbing", name: "Plumbing", icon: Droplets },
  { id: "maintenance", name: "Maintenance", icon: Wrench },
] as const;

export const EMERGENCY_SERVICES = [
  {
    id: "emergency-plumbing",
    name: "Emergency Plumbing",
    icon: Droplets,
    detail: "Major leaks · bursts · overflows",
  },
  {
    id: "electrical-emergency",
    name: "Electrical Emergency",
    icon: Zap,
    detail: "Trips · exposed wiring · sparks",
  },
  { id: "locksmith", name: "Locksmith", icon: Lock, detail: "Locked out · broken keys · rekeys" },
  {
    id: "ac-emergency",
    name: "AC Emergency",
    icon: AirVent,
    detail: "No cooling in heat · burning smell",
  },
] as const;

export type { LucideIcon };
