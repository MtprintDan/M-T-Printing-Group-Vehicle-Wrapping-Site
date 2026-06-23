import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryPageContent from "@/components/GalleryPageContent";
import { getImagesWithFallback } from "@/lib/gallery";

export const metadata: Metadata = {
  title: "Vehicle Wrap Gallery | M&T Printing Group",
  description:
    "Browse our vehicle wrap portfolio — base decal packages, partial wraps, full wraps, fleet programs, and specialty services across every vehicle type.",
};

export default function GalleryPage() {
  const categories = [
    {
      id: "base-decals",
      title: "Base Decal",
      slug: "base-decal",
      color: "#00AEEF",
      price: "From $470",
      description: "Logo, lettering, and contact info. Clean, professional branding fast.",
      images: getImagesWithFallback("base-decals"),
    },
    {
      id: "partial-wraps",
      title: "Partial Wrap",
      slug: "partial-wrap",
      color: "#EC008C",
      price: "From $1,230",
      description: "Covers 40–60% of the vehicle surface for strong brand presence.",
      images: getImagesWithFallback("partial-wraps"),
    },
    {
      id: "full-wraps",
      title: "Full Wrap",
      slug: "full-wrap",
      color: "#FFD700",
      price: "From $2,830",
      description: "Complete vehicle coverage with maximum visual impact.",
      images: getImagesWithFallback("full-wraps"),
    },
    {
      id: "trailers",
      title: "Trailers",
      slug: "trailer-graphics",
      color: "#0A0A0A",
      price: "Custom",
      description: "Full and partial wrap options for trailers, cube vans, and oversized commercial vehicles.",
      images: getImagesWithFallback("trailers"),
    },
    {
      id: "specialty-services",
      title: "Specialty Services",
      slug: "specialty",
      color: "#F97316",
      price: "Custom",
      description: "Trailers, wall graphics, window perf, murals and more.",
      images: getImagesWithFallback("specialty-services"),
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-[144px]">
        <Suspense fallback={<div className="py-24 text-center text-gray-400">Loading gallery…</div>}>
          <GalleryPageContent categories={categories} />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
