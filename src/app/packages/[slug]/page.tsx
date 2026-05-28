import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackagePage from "@/components/PackagePage";
import { PACKAGES, getPackageBySlug } from "@/lib/packages";
import { getImagesWithFallback } from "@/lib/gallery";
import type { GalleryFolder } from "@/lib/gallery";

const SLUG_TO_FOLDER: Record<string, GalleryFolder> = {
  "base-decal": "base-decals",
  "partial-wrap": "partial-wraps",
  "full-wrap": "full-wraps",
  "fleet-programs": "fleet-programs",
};

export function generateStaticParams() {
  return PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) return {};
  return {
    title: `${pkg.name} | M&T Printing Group`,
    description: pkg.description,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const pkg = getPackageBySlug(params.slug);
  if (!pkg) notFound();

  const folder = SLUG_TO_FOLDER[pkg.slug];
  const galleryImages = getImagesWithFallback(folder);

  return (
    <>
      <Navbar />
      <PackagePage pkg={pkg} galleryImages={galleryImages} />
      <Footer />
    </>
  );
}
