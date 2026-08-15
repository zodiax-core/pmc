import propLarge from "@/assets/prop-large.jpg";
import propMed1 from "@/assets/prop-med-1.jpg";
import propMed2 from "@/assets/prop-med-2.jpg";
import propSmall from "@/assets/prop-small.jpg";
import heroHouse from "@/assets/hero-house-opt.jpg";
import roomLiving from "@/assets/room-living.jpg";
import roomKitchen from "@/assets/room-kitchen.jpg";
import roomBedroom from "@/assets/room-bedroom.jpg";

export const DEALS = ["Buy", "Rent"] as const;

export const AREAS = ["DHA Phase 6", "Gulberg III", "Clifton", "F-7", "Bahria Town", "Askari X"];

export const POPULAR_AREAS = [
  "DHA Phase 6",
  "DHA Phase 5",
  "Bahria Town",
  "Gulberg III",
  "Clifton",
  "Model Town",
  "F-7",
  "Askari X",
];

export const BEDS = ["Any", "1+", "2+", "3+", "4+", "5+"];

export const PRICES = ["Any price", "Under 1 Cr", "1 – 3 Cr", "3 – 6 Cr", "6 Cr +"];

export const TYPES = ["Any", "Homes", "Plots", "Commercial"];

export type SearchState = {
  area: string;
  beds: string;
  price: string;
  type: string;
  deal: "Buy" | "Rent";
};

export const DEFAULT_SEARCH: SearchState = {
  area: "",
  beds: "Any",
  price: "Any price",
  type: "Any",
  deal: "Buy",
};

export type Seller = { name: string; logo: string };

export type ListingType = "House" | "Apartment" | "Plot" | "Commercial";

export type Listing = {
  id: string;
  img: string;
  alt: string;
  place: string;
  price: string;
  priceCr: number;
  beds: number;
  baths: number;
  area: string;
  sqft: number;
  popularity: number;
  type: ListingType;
  title: string;
  desc: string;
  badge?: string;
  seller?: Seller;
  lng: number;
  lat: number;
  featured?: boolean;
  has3d: boolean;
  addedAt: string;
};

export const LISTINGS: Listing[] = [
  {
    id: "l1",
    img: propLarge,
    alt: "Contemporary villa with deep terrace in DHA Phase 6",
    place: "DHA Phase 6, Lahore",
    price: "PKR 4.5 Cr",
    priceCr: 4.5,
    beds: 5,
    baths: 4,
    area: "10 Marla",
    sqft: 2720,
    popularity: 98,
    type: "House",
    title: "Contemporary 5-Bed Villa",
    desc: "Inspected 10 Marla corner on a DHA Phase 6 street with a deep terrace, double garage and separate servant quarters.",
    badge: "PMC INSPECTED",
    seller: { name: "Zameen Realty", logo: "https://logo.clearbit.com/zameen.com" },
    lng: 74.4373,
    lat: 31.4788,
    featured: true,
    has3d: true,
    addedAt: "2026-08-12",
  },
  {
    id: "l2",
    img: propMed1,
    alt: "Brick townhouse with black steel windows",
    place: "Gulberg III, Lahore",
    price: "PKR 2.8 Cr",
    priceCr: 2.8,
    beds: 4,
    baths: 3,
    area: "7 Marla",
    sqft: 1904,
    popularity: 90,
    type: "House",
    title: "Brick Townhouse, 4 Beds",
    desc: "New today — a 7 Marla Gulberg townhouse with black steel windows, an open-plan ground floor and a garden patio.",
    badge: "NEW TODAY",
    lng: 74.3587,
    lat: 31.5204,
    has3d: true,
    addedAt: "2026-08-14",
  },
  {
    id: "l3",
    img: propMed2,
    alt: "Modern apartment building with balconies",
    place: "Askari X, Lahore",
    price: "PKR 1.45 Cr",
    priceCr: 1.45,
    beds: 3,
    baths: 2,
    area: "1,650 sq ft",
    sqft: 1650,
    popularity: 84,
    type: "Apartment",
    title: "3-Bed Modern Apartment",
    desc: "Balcony apartment in Askari X with lift access, covered parking and close to the mall.",
    seller: { name: "Century 21", logo: "https://logo.clearbit.com/century21.com" },
    lng: 74.3525,
    lat: 31.4302,
    has3d: false,
    addedAt: "2026-08-10",
  },
  {
    id: "l4",
    img: propSmall,
    alt: "Family home entrance lit at dusk",
    place: "Bahria Town, Sector C",
    price: "PKR 1.9 Cr",
    priceCr: 1.9,
    beds: 4,
    baths: 3,
    area: "1 Kanal",
    sqft: 5445,
    popularity: 76,
    type: "House",
    title: "Family Home, 4 Beds",
    desc: "1 Kanal Bahria Town home with a lit driveway, four spacious bedrooms and a formal lounge.",
    lng: 74.24,
    lat: 31.36,
    has3d: true,
    addedAt: "2026-08-08",
  },
  {
    id: "l5",
    img: heroHouse,
    alt: "Modern travertine and timber residence",
    place: "DHA Phase 8, Lahore",
    price: "PKR 3.4 Cr",
    priceCr: 3.4,
    beds: 5,
    baths: 4,
    area: "12 Marla",
    sqft: 3264,
    popularity: 95,
    type: "House",
    title: "Travertine Residence, 5 Beds",
    desc: "Inspected 12 Marla DHA Phase 8 home with timber detailing, a study and a landscaped rear lawn.",
    badge: "PMC INSPECTED",
    seller: { name: "RE/MAX", logo: "https://logo.clearbit.com/remax.com" },
    lng: 74.32,
    lat: 31.435,
    featured: true,
    has3d: true,
    addedAt: "2026-08-13",
  },
  {
    id: "l6",
    img: roomLiving,
    alt: "Sea-facing living room with full-height glazing",
    place: "Clifton, Karachi",
    price: "PKR 2.6 Cr",
    priceCr: 2.6,
    beds: 3,
    baths: 2,
    area: "1,800 sq ft",
    sqft: 1800,
    popularity: 88,
    type: "Apartment",
    title: "Sea-Facing 3-Bed Apartment",
    desc: "Full-height glazing over the coastline with a modern kitchen and en-suite bathrooms.",
    lng: 67.031,
    lat: 24.807,
    featured: true,
    has3d: true,
    addedAt: "2026-08-09",
  },
  {
    id: "l7",
    img: roomKitchen,
    alt: "Bright kitchen in a landscaped F-7 home",
    place: "F-7, Islamabad",
    price: "PKR 3.2 Cr",
    priceCr: 3.2,
    beds: 4,
    baths: 3,
    area: "8 Marla",
    sqft: 2176,
    popularity: 82,
    type: "House",
    title: "Landscaped 4-Bed Home",
    desc: "New today — an 8 Marla F-7 home with a bright kitchen, TV lounge and attached terrace.",
    badge: "NEW TODAY",
    seller: { name: "PropertyGuru", logo: "https://logo.clearbit.com/propertyguru.com" },
    lng: 73.054,
    lat: 33.724,
    has3d: false,
    addedAt: "2026-08-15",
  },
  {
    id: "l8",
    img: roomBedroom,
    alt: "Compact bedroom in a serviced Gulberg apartment",
    place: "Gulberg IV, Lahore",
    price: "PKR 0.95 Cr",
    priceCr: 0.95,
    beds: 2,
    baths: 2,
    area: "1,050 sq ft",
    sqft: 1050,
    popularity: 71,
    type: "Apartment",
    title: "Compact 2-Bed Apartment",
    desc: "Serviced Gulberg IV unit with a fitted kitchen, balcony and easy motorway access.",
    lng: 74.37,
    lat: 31.518,
    has3d: true,
    addedAt: "2026-08-06",
  },
  {
    id: "l9",
    img: propSmall,
    alt: "Level 5 marla plot with verified records",
    place: "DHA Phase 6, Lahore",
    price: "PKR 1.15 Cr",
    priceCr: 1.15,
    beds: 0,
    baths: 0,
    area: "5 Marla",
    sqft: 1360,
    popularity: 92,
    type: "Plot",
    title: "Verified 5 Marla Plot",
    desc: "Inspected level plot in DHA Phase 6 with clean records, ready to build.",
    badge: "PMC INSPECTED",
    seller: { name: "Compass", logo: "https://logo.clearbit.com/compass.com" },
    lng: 74.4373,
    lat: 31.4788,
    featured: true,
    has3d: true,
    addedAt: "2026-08-11",
  },
  {
    id: "l10",
    img: propLarge,
    alt: "Open 10 marla plot fronting a park",
    place: "Bahria Town, Sector D",
    price: "PKR 2.1 Cr",
    priceCr: 2.1,
    beds: 0,
    baths: 0,
    area: "10 Marla",
    sqft: 2720,
    popularity: 80,
    type: "Plot",
    title: "10 Marla Park-Front Plot",
    desc: "Open corner plot fronting a Bahria Town park on a wide, paved street.",
    lng: 74.235,
    lat: 31.355,
    has3d: false,
    addedAt: "2026-08-04",
  },
  {
    id: "l11",
    img: heroHouse,
    alt: "Corner 8 marla plot in Gulberg III",
    place: "Gulberg III, Lahore",
    price: "PKR 2.4 Cr",
    priceCr: 2.4,
    beds: 0,
    baths: 0,
    area: "8 Marla",
    sqft: 2176,
    popularity: 78,
    type: "Plot",
    title: "Corner 8 Marla Plot",
    desc: "Gulberg III corner plot in a well-developed block with utilities laid on.",
    seller: { name: "Zillow", logo: "https://logo.clearbit.com/zillow.com" },
    lng: 74.3587,
    lat: 31.5204,
    has3d: true,
    addedAt: "2026-08-02",
  },
  {
    id: "l12",
    img: propMed2,
    alt: "Commercial plaza with direct main-boulevard access",
    place: "Gulberg III, Lahore",
    price: "PKR 8.9 Cr",
    priceCr: 8.9,
    beds: 0,
    baths: 0,
    area: "4,000 sq ft",
    sqft: 9000,
    popularity: 86,
    type: "Commercial",
    title: "Main-Boulevard Commercial Plaza",
    desc: "Inspected 4,000 sq ft plaza with direct main-boulevard access and full parking.",
    badge: "PMC INSPECTED",
    seller: { name: "Zameen Realty", logo: "https://logo.clearbit.com/zameen.com" },
    lng: 74.3587,
    lat: 31.5204,
    has3d: true,
    addedAt: "2026-08-01",
  },
  {
    id: "l13",
    img: roomLiving,
    alt: "Office floor with split AC and parking allocation",
    place: "Askari X, Lahore",
    price: "PKR 3.1 Cr",
    priceCr: 3.1,
    beds: 0,
    baths: 0,
    area: "3,250 sq ft",
    sqft: 4250,
    popularity: 74,
    type: "Commercial",
    title: "Office Floor with Parking",
    desc: "3,250 sq ft office with split AC units and allocated parking in Askari X.",
    lng: 74.3525,
    lat: 31.4302,
    has3d: false,
    addedAt: "2026-07-28",
  },
  {
    id: "l14",
    img: roomKitchen,
    alt: "Retail shop front on a high-traffic lane",
    place: "Clifton, Karachi",
    price: "PKR 2.2 Cr",
    priceCr: 2.2,
    beds: 0,
    baths: 0,
    area: "1,200 sq ft",
    sqft: 3200,
    popularity: 69,
    type: "Commercial",
    title: "Retail Shop Front",
    desc: "1,200 sq ft shop on a high-traffic Clifton lane with a storefront and store room.",
    lng: 67.031,
    lat: 24.807,
    has3d: true,
    addedAt: "2026-07-25",
  },
  {
    id: "l15",
    img: heroHouse,
    alt: "Classic DHA Phase 5 family home",
    place: "DHA Phase 5, Lahore",
    price: "PKR 2.85 Cr",
    priceCr: 2.85,
    beds: 5,
    baths: 4,
    area: "10 Marla",
    sqft: 2720,
    popularity: 93,
    type: "House",
    title: "Classic 5-Bed DHA Family Home",
    desc: "Inspected 10 Marla home in DHA Phase 5 with a formal dining room, sunroom and double garage.",
    badge: "PMC INSPECTED",
    seller: { name: "RE/MAX", logo: "https://logo.clearbit.com/remax.com" },
    lng: 74.42,
    lat: 31.467,
    has3d: true,
    addedAt: "2026-08-13",
  },
  {
    id: "l16",
    img: propLarge,
    alt: "Quiet interior Model Town home",
    place: "Model Town, Block N",
    price: "PKR 2.95 Cr",
    priceCr: 2.95,
    beds: 4,
    baths: 3,
    area: "8 Marla",
    sqft: 2176,
    popularity: 81,
    type: "House",
    title: "Quiet 4-Bed Model Town Home",
    desc: "8 Marla home on an interior street with a tiled courtyard and a bright study.",
    lng: 74.326,
    lat: 31.481,
    has3d: false,
    addedAt: "2026-08-07",
  },
  {
    id: "l17",
    img: propMed1,
    alt: "Corner apartment with park views",
    place: "Johar Town, Lahore",
    price: "PKR 1.25 Cr",
    priceCr: 1.25,
    beds: 3,
    baths: 2,
    area: "1,400 sq ft",
    sqft: 1400,
    popularity: 72,
    type: "Apartment",
    title: "3-Bed Johar Town Apartment",
    desc: "Corner unit with park views, lift access and covered parking.",
    seller: { name: "24/7 Realty", logo: "https://logo.clearbit.com/247realty.com" },
    lng: 74.27,
    lat: 31.478,
    has3d: true,
    addedAt: "2026-08-12",
  },
  {
    id: "l18",
    img: propSmall,
    alt: "Level 10 marla DHA Phase 4 plot",
    place: "DHA Phase 4, Lahore",
    price: "PKR 3.6 Cr",
    priceCr: 3.6,
    beds: 0,
    baths: 0,
    area: "10 Marla",
    sqft: 2720,
    popularity: 89,
    type: "Plot",
    title: "10 Marla DHA Phase 4 Plot",
    desc: "Inspected level plot in a mature DHA Phase 4 block with corner location.",
    badge: "PMC INSPECTED",
    seller: { name: "Compass", logo: "https://logo.clearbit.com/compass.com" },
    lng: 74.42,
    lat: 31.49,
    has3d: true,
    addedAt: "2026-08-05",
  },
  {
    id: "l19",
    img: heroHouse,
    alt: "Open 5 marla Bahria Sector E plot",
    place: "Bahria Town, Sector E",
    price: "PKR 1.7 Cr",
    priceCr: 1.7,
    beds: 0,
    baths: 0,
    area: "5 Marla",
    sqft: 1360,
    popularity: 77,
    type: "Plot",
    title: "5 Marla Bahria Plot",
    desc: "Open 5 marla plot in Bahria Sector E on a wide, paved street.",
    lng: 74.245,
    lat: 31.365,
    has3d: false,
    addedAt: "2026-07-30",
  },
  {
    id: "l20",
    img: roomLiving,
    alt: "Corner seafront apartment in Clifton Block 3",
    place: "Clifton Block 3, Karachi",
    price: "PKR 3.8 Cr",
    priceCr: 3.8,
    beds: 4,
    baths: 3,
    area: "2,400 sq ft",
    sqft: 2400,
    popularity: 87,
    type: "Apartment",
    title: "4-Bed Seafront Apartment",
    desc: "Corner apartment in Clifton Block 3 with sea views and two balconies.",
    seller: { name: "Zameen Realty", logo: "https://logo.clearbit.com/zameen.com" },
    lng: 67.036,
    lat: 24.818,
    has3d: true,
    addedAt: "2026-08-11",
  },
  {
    id: "l21",
    img: propMed2,
    alt: "Kanal residence with double-height lobby",
    place: "Gulberg Greens, Islamabad",
    price: "PKR 5.2 Cr",
    priceCr: 5.2,
    beds: 5,
    baths: 5,
    area: "1 Kanal",
    sqft: 5445,
    popularity: 96,
    type: "House",
    title: "Kanal+ Gulberg Greens Home",
    desc: "Inspected 1 kanal residence with a grand double-height lobby and landscaped garden.",
    badge: "PMC INSPECTED",
    seller: { name: "PropertyGuru", logo: "https://logo.clearbit.com/propertyguru.com" },
    lng: 72.942,
    lat: 33.685,
    has3d: true,
    addedAt: "2026-08-09",
  },
  {
    id: "l22",
    img: roomBedroom,
    alt: "Elevated apartment in E-11",
    place: "E-11, Islamabad",
    price: "PKR 1.9 Cr",
    priceCr: 1.9,
    beds: 3,
    baths: 2,
    area: "1,600 sq ft",
    sqft: 1600,
    popularity: 79,
    type: "Apartment",
    title: "3-Bed E-11 Apartment",
    desc: "Elevated apartment in E-11 with secure access and community parking.",
    lng: 72.973,
    lat: 33.62,
    has3d: true,
    addedAt: "2026-08-03",
  },
  {
    id: "l23",
    img: propMed1,
    alt: "7 marla Askari IV family home",
    place: "Askari IV, Lahore",
    price: "PKR 2.4 Cr",
    priceCr: 2.4,
    beds: 4,
    baths: 3,
    area: "7 Marla",
    sqft: 1904,
    popularity: 75,
    type: "House",
    title: "7 Marla Askari IV Home",
    desc: "New listing — 7 marla home with a family lounge, patio and attached parking.",
    seller: { name: "RealEstate.pk", logo: "https://logo.clearbit.com/realestate.pk" },
    lng: 74.302,
    lat: 31.417,
    has3d: false,
    addedAt: "2026-07-27",
  },
  {
    id: "l24",
    img: propMed2,
    alt: "Commercial space on Bahria Karachi main boulevard",
    place: "Bahria Town, Karachi",
    price: "PKR 6.5 Cr",
    priceCr: 6.5,
    beds: 0,
    baths: 0,
    area: "2,800 sq ft",
    sqft: 6600,
    popularity: 83,
    type: "Commercial",
    title: "Main-Thor Commercial Plaza",
    desc: "Inspected 2,800 sq ft commercial space on Bahria Karachi's main boulevard.",
    badge: "PMC INSPECTED",
    seller: { name: "Zillow", logo: "https://logo.clearbit.com/zillow.com" },
    lng: 67.323,
    lat: 24.955,
    has3d: true,
    addedAt: "2026-08-10",
  },
  {
    id: "l25",
    img: propSmall,
    alt: "5 marla Wapda Town plot",
    place: "Wapda Town, Sector J2",
    price: "PKR 1.35 Cr",
    priceCr: 1.35,
    beds: 0,
    baths: 0,
    area: "5 Marla",
    sqft: 1360,
    popularity: 70,
    type: "Plot",
    title: "5 Marla Wapda Town Plot",
    desc: "5 marla plot in a well-served Wapda Town block with utilities connected.",
    lng: 74.27,
    lat: 31.445,
    has3d: true,
    addedAt: "2026-08-08",
  },
  {
    id: "l26",
    img: propLarge,
    alt: "Double-storey Jauhar Town home",
    place: "Jauhar Town, Lahore",
    price: "PKR 3.05 Cr",
    priceCr: 3.05,
    beds: 5,
    baths: 4,
    area: "10 Marla",
    sqft: 2720,
    popularity: 85,
    type: "House",
    title: "10 Marla Jauhar Town Home",
    desc: "Double-storey home with a roof terrace and a two-car garage.",
    lng: 74.283,
    lat: 31.502,
    has3d: true,
    addedAt: "2026-08-06",
  },
  {
    id: "l27",
    img: roomKitchen,
    alt: "Compact serviced PIA Society apartment",
    place: "PIA Society, Lahore",
    price: "PKR 0.85 Cr",
    priceCr: 0.85,
    beds: 2,
    baths: 2,
    area: "950 sq ft",
    sqft: 950,
    popularity: 68,
    type: "Apartment",
    title: "Compact 2-Bed PIA Apartment",
    desc: "New today — a serviced 950 sq ft unit with a fitted kitchen and quick access.",
    badge: "NEW TODAY",
    lng: 74.3,
    lat: 31.51,
    has3d: false,
    addedAt: "2026-08-15",
  },
  {
    id: "l28",
    img: heroHouse,
    alt: "Lake-facing villa with private lawn",
    place: "Lake City, Lahore",
    price: "PKR 4.9 Cr",
    priceCr: 4.9,
    beds: 5,
    baths: 5,
    area: "1 Kanal",
    sqft: 5445,
    popularity: 94,
    type: "House",
    title: "Kanal Lake City Villa",
    desc: "Inspected lake-facing villa with a private lawn and covered veranda.",
    badge: "PMC INSPECTED",
    seller: { name: "RE/MAX", logo: "https://logo.clearbit.com/remax.com" },
    lng: 74.23,
    lat: 31.36,
    has3d: true,
    addedAt: "2026-08-14",
  },
  {
    id: "l29",
    img: roomKitchen,
    alt: "Corner shop on a busy Model Town lane",
    place: "Model Town, Block A",
    price: "PKR 3.3 Cr",
    priceCr: 3.3,
    beds: 0,
    baths: 0,
    area: "1,800 sq ft",
    sqft: 4400,
    popularity: 73,
    type: "Commercial",
    title: "Model Town Shop Front",
    desc: "1,800 sq ft corner shop on a busy Model Town lane with high footfall.",
    seller: { name: "RealEstate.pk", logo: "https://logo.clearbit.com/realestate.pk" },
    lng: 74.326,
    lat: 31.481,
    has3d: true,
    addedAt: "2026-07-31",
  },
  {
    id: "l30",
    img: propSmall,
    alt: "Verified 5 marla plot in DHA Phase 5",
    place: "DHA Phase 5, Lahore",
    price: "PKR 1.6 Cr",
    priceCr: 1.6,
    beds: 0,
    baths: 0,
    area: "5 Marla",
    sqft: 1360,
    popularity: 82,
    type: "Plot",
    title: "5 Marla DHA Phase 5 Plot",
    desc: "Inspected 5 marla plot with verified records in DHA Phase 5.",
    badge: "PMC INSPECTED",
    seller: { name: "Century 21", logo: "https://logo.clearbit.com/century21.com" },
    lng: 74.42,
    lat: 31.467,
    has3d: false,
    addedAt: "2026-08-01",
  },
];

function priceRange(option: string): [number, number] {
  switch (option) {
    case "Under 1 Cr":
      return [0.0001, 1];
    case "1 – 3 Cr":
      return [1, 3];
    case "3 – 6 Cr":
      return [3, 6];
    case "6 Cr +":
      return [6, Infinity];
    default:
      return [0, Infinity];
  }
}

export function filterListings(search: SearchState): Listing[] {
  const query = search.area.trim().toLowerCase();
  const [lo, hi] = priceRange(search.price);
  const minBeds = search.beds === "Any" ? 0 : parseInt(search.beds, 10);
  const matchingTypes =
    search.type === "Any" ? null : search.type === "Homes" ? ["House", "Apartment"] : [search.type];

  return LISTINGS.filter((l) => {
    if (matchingTypes && !matchingTypes.includes(l.type)) return false;
    if (minBeds > 0 && l.beds < minBeds) return false;
    if (l.priceCr < lo || l.priceCr >= hi) return false;
    if (query && !l.place.toLowerCase().includes(query)) return false;
    return true;
  });
}

export function countMatches(search: SearchState): number {
  return filterListings(search).length;
}

export function hasActiveFilters(search: SearchState): boolean {
  return (
    search.area.trim() !== "" ||
    search.beds !== "Any" ||
    search.price !== "Any price" ||
    search.type !== "Any"
  );
}

export type SortKey = "popular" | "price-asc" | "price-desc" | "newest";

export const SORTS: { key: SortKey; label: string }[] = [
  { key: "popular", label: "Most popular" },
  { key: "price-asc", label: "Price · Low to high" },
  { key: "price-desc", label: "Price · High to low" },
  { key: "newest", label: "Recently added" },
];

export const PER_PAGE = 10;

export function sortListings(list: Listing[], sort: SortKey): Listing[] {
  const arr = [...list];
  switch (sort) {
    case "price-asc":
      return arr.sort((a, b) => a.priceCr - b.priceCr);
    case "price-desc":
      return arr.sort((a, b) => b.priceCr - a.priceCr);
    case "newest":
      return arr.sort((a, b) => +new Date(b.addedAt) - +new Date(a.addedAt));
    default:
      return arr.sort((a, b) => b.popularity - a.popularity);
  }
}

export type PageSlice = {
  items: Listing[];
  page: number;
  total: number;
  totalPages: number;
};

export function paginate(list: Listing[], page: number, perPage = PER_PAGE): PageSlice {
  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const p = Math.min(Math.max(1, page), totalPages);
  const start = (p - 1) * perPage;
  return { items: list.slice(start, start + perPage), page: p, total, totalPages };
}

export function pageNumbers(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set<number>([1, total, current - 1, current, current + 1]);
  const sorted = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | "…")[] = [];
  let prev = 0;
  for (const n of sorted) {
    if (prev && n - prev > 1) out.push("…");
    out.push(n);
    prev = n;
  }
  return out;
}

export type AiParsed = {
  query: string;
  search: SearchState;
  signals: number;
};

export function parseAiQuery(query: string): AiParsed | null {
  const q = query.toLowerCase();
  const search: SearchState = { ...DEFAULT_SEARCH };
  let signals = 0;

  if (/\b(rent|rental|lease)\b/.test(q)) {
    search.deal = "Rent";
    signals++;
  } else if (/\b(buy|purchase)\b/.test(q)) {
    search.deal = "Buy";
    signals++;
  }

  const crMatch = q.match(/(\d+(?:\.\d+)?)\s*(?:cr|crore|core)/);
  if (crMatch) {
    const v = parseFloat(crMatch[1] ?? "0");
    if (v < 1) search.price = "Under 1 Cr";
    else if (v <= 3) search.price = "1 – 3 Cr";
    else if (v <= 6) search.price = "3 – 6 Cr";
    else search.price = "6 Cr +";
    signals++;
  }

  const bedMatch = q.match(/(\d)\s*-?\s*(?:bed(?:room)?s?)/);
  if (bedMatch) {
    const n = parseInt(bedMatch[1] ?? "0", 10);
    search.beds = n >= 5 ? "5+" : `${n}+`;
    signals++;
  }

  if (/\b(house|home|villa|bungalow)\b/.test(q)) {
    search.type = "Homes";
    signals++;
  } else if (/\b(plot|land|file)\b/.test(q)) {
    search.type = "Plots";
    signals++;
  } else if (/\b(shop|office|commercial|plaza|store|retail)\b/.test(q)) {
    search.type = "Commercial";
    signals++;
  }

  const areaHit = [
    ...AREAS,
    "DHA Phase 5",
    "Model Town",
    "Johar Town",
    "Jauhar Town",
    "DHA Phase 4",
    "E-11",
    "Gulberg Greens",
    "Askari IV",
    "Lake City",
    "Wapda Town",
    "PIA Society",
    "Clifton Block",
  ].find((a) => q.includes(a.toLowerCase()));
  if (areaHit) {
    search.area = areaHit;
    signals++;
  }

  if (signals === 0) return null;
  return { query, search, signals };
}
