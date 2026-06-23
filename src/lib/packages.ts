export type PackageSlug = "base-decal" | "partial-wrap" | "full-wrap";

export interface PackageData {
  slug: PackageSlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  color: string;
  textOnColor: "white" | "black";
  imageSrc: string;
  imageAlt: string;
  galleryFolder: string;
  features: string[];
  vehicles: { label: string; price: string }[];
  installTime: string;
  turnaround: string;
  startingPrice: string;
}

export const PACKAGES: PackageData[] = [
  {
    slug: "base-decal",
    name: "Basic Decal Package",
    shortName: "Basic Decal",
    tagline: "Get on the road branded at an affordable rate.",
    description:
      "Our entry-level branding service — logo, business name, phone, website, and a clean three-side layout. Professional installation included. Perfect for operators who need effective branding without the full-wrap investment.",
    color: "#00AEEF",
    textOnColor: "white",
    imageSrc: "/packages/Basepackage.png",
    imageAlt: "Basic Decal Package — professional vehicle lettering and decals",
    galleryFolder: "base-decals",
    features: [
      "Company Logo",
      "Business Name",
      "Website & Phone Number",
      "Custom 3-Side Coverage Layout",
      "Professional Installation Included",
      "1–2 Hour Installation",
      "4–5 Day Turnaround",
    ],
    vehicles: [
      { label: "Standard Vehicle", price: "$470" },
      { label: "Medium Vehicle", price: "$545" },
      { label: "Large Vehicle", price: "$685" },
      { label: "Oversized Vehicle", price: "$950" },
    ],
    installTime: "1–2 hours",
    turnaround: "4–5 business days",
    startingPrice: "$470",
  },
  {
    slug: "partial-wrap",
    name: "Partial Wrap",
    shortName: "Partial Wrap",
    tagline: "Increase your visibility with a bold, professional branded appearance.",
    description:
      "A great middle ground. Covers 40–60% of your vehicle surface. Strong brand presence with a clean, professional aesthetic that commands attention on every road.",
    color: "#EC008C",
    textOnColor: "white",
    imageSrc: "/packages/Partialwrap.png",
    imageAlt: "Partial Wrap Package — mid coverage vehicle wrap",
    galleryFolder: "partial-wraps",
    features: [
      "40–60% Vehicle Coverage",
      "Custom Design Matching Your Brand",
      "Premium Wrap Vinyl",
      "Basic Graphic Setup Included",
      "4–8 Hour Installation",
      "5–8 Day Turnaround",
    ],
    vehicles: [
      { label: "Standard Vehicle", price: "$1,230" },
      { label: "Medium Vehicle", price: "$1,599" },
      { label: "Large Vehicle", price: "$2,200" },
      { label: "Oversized Vehicle", price: "$2,750" },
    ],
    installTime: "4–8 hours",
    turnaround: "5–8 business days",
    startingPrice: "$1,230",
  },
  {
    slug: "full-wrap",
    name: "Full Wrap",
    shortName: "Full Wrap",
    tagline: "Turn your vehicle into a rolling billboard with maximum brand exposure.",
    description:
      "Total vehicle transformation from bumper to bumper. Maximum visual impact with premium 3M and Avery materials — the boldest way to put your brand on the road.",
    color: "#FFD700",
    textOnColor: "black",
    imageSrc: "/packages/Fullwrap.png",
    imageAlt: "Full Wrap Package — complete vehicle coverage",
    galleryFolder: "full-wraps",
    features: [
      "100% Vehicle Coverage",
      "Advanced Custom Design",
      "3M or Avery Premium Vinyl",
      "Advanced Graphic Design Included",
      "6–14 Hour Installation",
      "7–12 Day Turnaround",
    ],
    vehicles: [
      { label: "Standard Vehicle", price: "$2,830" },
      { label: "Medium Vehicle", price: "$4,060" },
      { label: "Large Vehicle", price: "$5,200" },
      { label: "Oversized Vehicle", price: "$7,750" },
    ],
    installTime: "6–14 hours",
    turnaround: "7–12 business days",
    startingPrice: "$2,830",
  },
];

export function getPackageBySlug(slug: string): PackageData | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}
