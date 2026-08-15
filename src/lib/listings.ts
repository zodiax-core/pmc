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
  title: string;
  desc: string;
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
    title: "Contemporary 5-Bed Villa",
    desc: "Inspected 10 Marla corner on a DHA Phase 6 street with a deep terrace, double garage and separate servant quarters.",
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
    title: "Brick Townhouse, 4 Beds",
    desc: "New today — a 7 Marla Gulberg townhouse with black steel windows, an open-plan ground floor and a garden patio.",
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
    title: "3-Bed Modern Apartment",
    desc: "Balcony apartment in Askari X with lift access, covered parking and close to the mall.",
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
    title: "Family Home, 4 Beds",
    desc: "1 Kanal Bahria Town home with a lit driveway, four spacious bedrooms and a formal lounge.",
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
