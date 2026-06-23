export type VehicleSize = "small" | "medium" | "large" | "truck_trailer" | "enclosed_trailer";
export type PackageType = "base_decal" | "partial" | "full";
export type DesignChoice = "supplied" | "base_layout" | "full_graphic" | "premium";
export type AddOnCategory = "base_only" | "all";

export interface AddOn {
  id: string;
  label: string;
  price: number;
  category: AddOnCategory;
  variablePrice?: Partial<Record<VehicleSize, number>>;
}

export interface WindowTintFilm {
  id: string;
  name: string;
  heatRejection: string | null;
  shades: string[];
  prices: Record<VehicleSize, number>;
}

export interface CalculatorState {
  vehicleSize: VehicleSize | null;
  packageType: PackageType | null;
  addOns: string[];
  windowTint: { film: string; shade: string } | null;
  designOption: DesignChoice | null;
}

export interface QuoteFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  vehicleType: string;
  notes: string;
  estimatedTotal?: number;
  vehicleSize?: string;
  packageType?: string;
}

export const VEHICLE_SIZES: { id: VehicleSize; label: string; description: string; sqft: string; image: string }[] = [
  { id: "small",           label: "Standard Vehicle",  description: "Cars, SUVs & Compact Pickups",       sqft: "120–180 sq ft",  image: "/vehicle-sizing-options/Small.png"    },
  { id: "medium",          label: "Medium Vehicle",    description: "F-150, Silverado, Transit Connect",  sqft: "180–275 sq ft",  image: "/vehicle-sizing-options/Medium.png"   },
  { id: "large",           label: "Large Vehicle",     description: "Transit, Sprinter, Promaster",       sqft: "275–375 sq ft",  image: "/vehicle-sizing-options/Large.png"    },
  { id: "truck_trailer",   label: "Oversized Vehicle", description: "Cube Vans & Commercial Trucks",      sqft: "375–700+ sq ft", image: "/vehicle-sizing-options/Oversized.png"},
  { id: "enclosed_trailer",label: "Enclosed Trailer",  description: "Enclosed trailers & semi combos",    sqft: "400–800+ sq ft", image: "/vehicle-sizing-options/Trailer.png"  },
];

export const PACKAGES: { id: PackageType; label: string; description: string; tagline: string }[] = [
  { id: "base_decal", label: "Basic Decal Package", tagline: "Get on the road branded at an affordable rate.", description: "Logo, lettering & key branding elements" },
  { id: "partial",    label: "Partial Wrap",        tagline: "Increase your visibility with a bold, professional branded appearance.", description: "40–60% vehicle coverage" },
  { id: "full",       label: "Full Wrap",           tagline: "Turn your vehicle into a rolling billboard with maximum brand exposure.", description: "Complete vehicle coverage, maximum impact" },
];

export const ADD_ONS: AddOn[] = [
  // Base Package Only
  { id: "qr_code",         label: "QR Code Decal",        price: 20,  category: "base_only" },
  { id: "tssa_number",     label: "TSSA Numbers",          price: 20,  category: "base_only" },
  { id: "fleet_number",    label: "Fleet Unit Numbering",  price: 15,  category: "base_only" },
  { id: "hood_decal",      label: "Hood Decal",            price: 100, category: "base_only" },
  { id: "roof_decals",     label: "Roof Decals",           price: 150, category: "base_only" },
  { id: "other_additional",label: "Other Additional",      price: 20,  category: "base_only" },
  // Available For All
  { id: "window_perf",     label: "Window Perf",           price: 75,  category: "all" },
  { id: "reflective_vinyl",label: "Reflective Vinyl",      price: 200, category: "all" },
  { id: "chrome_vinyl",    label: "Chrome Vinyl",          price: 200, category: "all" },
];

export const WINDOW_TINT_FILMS: WindowTintFilm[] = [
  {
    id: "nox",
    name: "Nox Carbon / Dyed Film",
    heatRejection: "20% Heat Rejection",
    shades: ["5%", "20%", "30%", "50%"],
    prices: { small: 356, medium: 365, large: 535, truck_trailer: 356, enclosed_trailer: 535 },
  },
  {
    id: "vanquish",
    name: "Vanquish Ceramic Film",
    heatRejection: "60% Heat Rejection",
    shades: ["5%", "20%", "32%", "43%"],
    prices: { small: 597, medium: 597, large: 685, truck_trailer: 597, enclosed_trailer: 685 },
  },
  {
    id: "magnus",
    name: "Magnus Multi Layer Ceramic",
    heatRejection: "93% Heat Rejection",
    shades: ["5%", "22%", "33%"],
    prices: { small: 747, medium: 747, large: 831, truck_trailer: 747, enclosed_trailer: 831 },
  },
  {
    id: "windshield",
    name: "Windshield Tint Only",
    heatRejection: null,
    shades: [],
    prices: { small: 365, medium: 365, large: 365, truck_trailer: 365, enclosed_trailer: 365 },
  },
];

export interface DesignOptionData {
  id: DesignChoice;
  label: string;
  blurb: string;
  price: number;
  availableFor: PackageType[];
}

export const DESIGN_OPTIONS: DesignOptionData[] = [
  {
    id: "supplied",
    label: "Supplied Artwork",
    blurb: "Provide your own print-ready artwork. We handle the rest.",
    price: 0,
    availableFor: ["base_decal", "partial", "full"],
  },
  {
    id: "base_layout",
    label: "Base Graphic Layout",
    blurb: "Simple placement and arrangement of supplied branding elements for a clean professional appearance.",
    price: 120,
    availableFor: ["base_decal", "partial"],
  },
  {
    id: "full_graphic",
    label: "Full Graphic Design",
    blurb: "Custom designed graphics tailored to your vehicle and brand identity.",
    price: 200,
    availableFor: ["base_decal", "partial", "full"],
  },
  {
    id: "premium",
    label: "Premium Graphic Creation",
    blurb: "Advanced branding package with premium visual concepts, custom layouts and maximum marketing impact.",
    price: 300,
    availableFor: ["partial", "full"],
  },
];

export const BASE_PRICES: Record<PackageType, Record<VehicleSize, number>> = {
  base_decal: { small: 470,  medium: 545,  large: 685,  truck_trailer: 950,  enclosed_trailer: 685  },
  partial:    { small: 1230, medium: 1599, large: 2200, truck_trailer: 2750, enclosed_trailer: 2200 },
  full:       { small: 2830, medium: 4060, large: 5200, truck_trailer: 7750, enclosed_trailer: 5200 },
};

export const INSTALL_HOURS: Record<PackageType, string> = {
  base_decal: "1–2 Hours",
  partial:    "4–8 Hours",
  full:       "6–14 Hours",
};

export const INSTALL_HOURS_RANGE: Record<PackageType, { min: number; max: number }> = {
  base_decal: { min: 1, max: 2 },
  partial:    { min: 4, max: 8 },
  full:       { min: 6, max: 14 },
};

export const TURNAROUND_DAYS: Record<PackageType, string> = {
  base_decal: "4–5 business days",
  partial:    "5–8 business days",
  full:       "7–12 business days",
};

