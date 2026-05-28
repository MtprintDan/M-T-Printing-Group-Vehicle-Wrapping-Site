export type PackageSlug = "base-decal" | "partial-wrap" | "full-wrap" | "fleet-programs";

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
    name: "Base Decal Package",
    shortName: "Base Decal",
    tagline: "Professional branding that gets you on the road",
    description:
      "Our flagship service that provides the necessary and affordable branding to display your company effectively without breaking the bank.",
    color: "#00AEEF",
    textOnColor: "white",
    imageSrc: "/packages/Basepackage.png",
    imageAlt: "Base Decal Package — low coverage vehicle branding",
    galleryFolder: "base-decals",
    features: [
      "Company logo & name",
      "Door lettering",
      "Phone number & website URL",
      "Basic layout design included",
      "Premium vinyl materials",
      "2–4 hour installation",
    ],
    vehicles: [
      { label: "Small Vehicle", price: "$699" },
      { label: "Medium Van", price: "$950" },
      { label: "Large Van / Truck", price: "$1,250" },
      { label: "Truck + Trailer", price: "$1,650" },
    ],
    installTime: "2–4 hours",
    turnaround: "3–5 business days",
    startingPrice: "$699",
  },
  {
    slug: "partial-wrap",
    name: "Partial Wrap",
    shortName: "Partial Wrap",
    tagline: "Maximum visibility, balanced coverage",
    description:
      "A great middle ground. Covers 40–60% of your vehicle surface. Strong brand presence with a clean, professional aesthetic that commands attention.",
    color: "#EC008C",
    textOnColor: "white",
    imageSrc: "/packages/Partialwrap.png",
    imageAlt: "Partial Wrap Package — mid coverage vehicle wrap",
    galleryFolder: "partial-wraps",
    features: [
      "40–60% vehicle coverage",
      "Custom graphic design included",
      "Premium 3M / Avery vinyl",
      "Digital proof before production",
      "Professional installation",
      "4–8 hour installation",
    ],
    vehicles: [
      { label: "Small Vehicle", price: "$1,800" },
      { label: "Medium Van", price: "$2,600" },
      { label: "Large Van / Truck", price: "$3,400" },
      { label: "Truck + Trailer", price: "$4,800" },
    ],
    installTime: "4–8 hours",
    turnaround: "5–8 business days",
    startingPrice: "$1,800",
  },
  {
    slug: "full-wrap",
    name: "Full Wrap",
    shortName: "Full Wrap",
    tagline: "Total transformation, maximum impact",
    description:
      "Total vehicle transformation from bumper to bumper. Maximum visual impact with premium 3M and Avery materials — the boldest way to put your brand on the road.",
    color: "#FFD700",
    textOnColor: "black",
    imageSrc: "/packages/Fullwrap.png",
    imageAlt: "Full Wrap Package — complete vehicle coverage",
    galleryFolder: "full-wraps",
    features: [
      "100% vehicle coverage",
      "Advanced custom design",
      "Premium 3M / Avery vinyl",
      "Digital proof & revision rounds",
      "High-gloss or matte finish options",
      "6–14 hour installation",
    ],
    vehicles: [
      { label: "Small Vehicle", price: "$3,200" },
      { label: "Medium Van", price: "$4,200" },
      { label: "Large Van / Truck", price: "$5,500" },
      { label: "Truck + Trailer", price: "$7,800" },
    ],
    installTime: "6–14 hours",
    turnaround: "7–12 business days",
    startingPrice: "$3,200",
  },
  {
    slug: "fleet-programs",
    name: "Fleet Programs",
    shortName: "Fleet",
    tagline: "Consistent branding across every vehicle",
    description:
      "Built for growing businesses. Consistent, professional branding across your entire fleet with volume pricing, priority scheduling, and a dedicated project manager from start to finish. A branding opportunity that can keep up with you and what you need.",
    color: "#0A0A0A",
    textOnColor: "white",
    imageSrc: "/packages/Mtfleet.png",
    imageAlt: "Fleet Programs — enterprise vehicle branding",
    galleryFolder: "fleet-programs",
    features: [
      "3+ vehicle programs",
      "Volume pricing discounts",
      "Priority scheduling",
      "Dedicated account manager",
      "Consistent brand standards across fleet",
      "Custom timeline & phased rollout",
    ],
    vehicles: [
      { label: "3–5 Vehicles", price: "Custom" },
      { label: "6–10 Vehicles", price: "Custom" },
      { label: "10–20 Vehicles", price: "Custom" },
      { label: "Full Fleet (20+)", price: "Custom" },
    ],
    installTime: "Custom schedule",
    turnaround: "Custom timeline",
    startingPrice: "Custom",
  },
];

export function getPackageBySlug(slug: string): PackageData | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}
