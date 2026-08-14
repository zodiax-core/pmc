import propLarge from "@/assets/prop-large.jpg";
import propMed1 from "@/assets/prop-med-1.jpg";
import propMed2 from "@/assets/prop-med-2.jpg";
import propSmall from "@/assets/prop-small.jpg";
import heroHouse from "@/assets/hero-house-img.jpg";
import roomLiving from "@/assets/room-living.jpg";
import roomKitchen from "@/assets/room-kitchen.jpg";
import roomBedroom from "@/assets/room-bedroom.jpg";

export const DEALS = ["Buy", "Rent"] as const;

export const AREAS = ["DHA Phase 6", "Gulberg III", "Clifton", "F-7", "Bahria Town", "Askari X"];

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
  type: "House" | "Apartment" | "Plot" | "Commercial";
  badge?: string;
  seller?: Seller;
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
    badge: "PMC INSPECTED",
    seller: { name: "Zameen Realty", logo: "https://logo.clearbit.com/zameen.com" },
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
    badge: "NEW TODAY",
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
    seller: { name: "Century 21", logo: "https://logo.clearbit.com/century21.com" },
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
    badge: "PMC INSPECTED",
    seller: { name: "RE/MAX", logo: "https://logo.clearbit.com/remax.com" },
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
    badge: "NEW TODAY",
    seller: { name: "PropertyGuru", logo: "https://logo.clearbit.com/propertyguru.com" },
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
    badge: "PMC INSPECTED",
    seller: { name: "Compass", logo: "https://logo.clearbit.com/compass.com" },
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
    seller: { name: "Zillow", logo: "https://logo.clearbit.com/zillow.com" },
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
    badge: "PMC INSPECTED",
    seller: { name: "Zameen Realty", logo: "https://logo.clearbit.com/zameen.com" },
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
