export type VehicleSize = "small" | "medium" | "large" | "truck_trailer";
export type PackageType = "starter" | "partial" | "full";
export type DesignOption = "basic" | "custom" | "medium_complexity" | "advanced";

export interface AddOn {
  id: string;
  label: string;
  price: number;
}

export interface CalculatorState {
  vehicleSize: VehicleSize | null;
  packageType: PackageType | null;
  addOns: string[];
  designOption: DesignOption | null;
  extraInstallHours: number;
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

export const VEHICLE_SIZES: { id: VehicleSize; label: string; description: string }[] = [
  { id: "small", label: "Small Vehicle", description: "Car, SUV, small pickup" },
  { id: "medium", label: "Medium Van", description: "Transit, Sprinter, cargo van" },
  { id: "large", label: "Large Van / Truck", description: "Box truck, large commercial" },
  { id: "truck_trailer", label: "Truck + Trailer", description: "Semi, flatbed + trailer combo" },
];

export const PACKAGES: { id: PackageType; label: string; description: string }[] = [
  {
    id: "starter",
    label: "Starter Package",
    description: "Logo, lettering & key branding elements",
  },
  {
    id: "partial",
    label: "Partial Wrap",
    description: "Covers 40–60% of vehicle surface",
  },
  {
    id: "full",
    label: "Full Wrap",
    description: "Complete vehicle coverage, maximum impact",
  },
];

export const ADD_ONS: AddOn[] = [
  { id: "hood_decal", label: "Hood Decal", price: 120 },
  { id: "reflective_vinyl", label: "Reflective Vinyl", price: 250 },
  { id: "window_perf", label: "Window Perf", price: 180 },
  { id: "trailer_rear_decals", label: "Trailer Rear Decals", price: 150 },
  { id: "roof_numbering", label: "Roof Numbering", price: 60 },
  { id: "additional_decals", label: "Additional Decals", price: 25 },
];

export const DESIGN_OPTIONS: {
  id: DesignOption;
  label: string;
  description: string;
  price: number;
}[] = [
  { id: "basic", label: "Included Basic Layout", description: "Clean template-based layout", price: 0 },
  { id: "custom", label: "Custom Design", description: "Tailored to your brand", price: 120 },
  {
    id: "medium_complexity",
    label: "Medium Complexity",
    description: "Illustrations & custom graphics",
    price: 220,
  },
  {
    id: "advanced",
    label: "Advanced Design",
    description: "Full custom artwork & renders",
    price: 400,
  },
];

export const BASE_PRICES: Record<PackageType, Record<VehicleSize, number>> = {
  starter: {
    small: 650,
    medium: 950,
    large: 1250,
    truck_trailer: 1650,
  },
  partial: {
    small: 1800,
    medium: 2600,
    large: 3400,
    truck_trailer: 4800,
  },
  full: {
    small: 3200,
    medium: 4200,
    large: 5500,
    truck_trailer: 7800,
  },
};

export const INSTALL_HOURS: Record<PackageType, Record<VehicleSize, number>> = {
  starter: { small: 2, medium: 3, large: 4, truck_trailer: 6 },
  partial: { small: 4, medium: 6, large: 8, truck_trailer: 12 },
  full: { small: 6, medium: 10, large: 14, truck_trailer: 20 },
};

export const TURNAROUND_DAYS: Record<PackageType, string> = {
  starter: "3–5 business days",
  partial: "5–8 business days",
  full: "7–12 business days",
};

export const INSTALL_HOURLY_RATE = 80;
