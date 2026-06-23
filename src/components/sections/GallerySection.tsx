// Server component — reads gallery images from the filesystem at build time
import { getImagesWithFallback } from "@/lib/gallery";
import GallerySectionClient from "./GallerySectionClient";

export default function GallerySection() {
  const categories = [
    {
      id: "base-decals",
      label: "Base Decal",
      color: "#00AEEF",
      packageSlug: "base-decal",
      images: getImagesWithFallback("base-decals"),
    },
    {
      id: "partial-wraps",
      label: "Partial Wrap",
      color: "#EC008C",
      packageSlug: "partial-wrap",
      images: getImagesWithFallback("partial-wraps"),
    },
    {
      id: "full-wraps",
      label: "Full Wrap",
      color: "#FFD700",
      packageSlug: "full-wrap",
      images: getImagesWithFallback("full-wraps"),
    },
    {
      id: "fleet-programs",
      label: "Fleet Programs",
      color: "#0A0A0A",
      packageSlug: "fleet-programs",
      images: getImagesWithFallback("fleet-programs"),
    },
  ];

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EC008C] mb-3">
            Our Work
          </p>
          <div className="flex flex-col gap-3">
            <h2 className="text-4xl font-black text-brand-black">Have a Look!</h2>
            <p className="text-gray-500 text-base font-light max-w-2xl">
              Take a peek at some of our past and recent projects completed for our customers. Feel free to toggle between each package type to see examples of what we can do.
            </p>
          </div>
        </div>

        <GallerySectionClient categories={categories} />
      </div>
    </section>
  );
}
