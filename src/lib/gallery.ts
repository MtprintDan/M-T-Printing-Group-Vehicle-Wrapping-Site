import fs from "fs";
import path from "path";

export type GalleryFolder = "base-decals" | "partial-wraps" | "full-wraps" | "fleet-programs" | "specialty-services";

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|webp|avif|gif)$/i;

/** Read images from a gallery subfolder under /public/gallery/<folder>/ */
export function getImagesForFolder(folder: GalleryFolder): string[] {
  const dir = path.join(process.cwd(), "public", "gallery", folder);
  try {
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXTENSIONS.test(f) && !f.startsWith("."))
      .sort()
      .map((f) => `/gallery/${folder}/${f}`);
  } catch {
    return [];
  }
}

export interface CategoryImages {
  "base-decals": string[];
  "partial-wraps": string[];
  "full-wraps": string[];
  "fleet-programs": string[];
  "specialty-services": string[];
}

/** Read all gallery category folders at once */
export function getAllGalleryImages(): CategoryImages {
  return {
    "base-decals":       getImagesForFolder("base-decals"),
    "partial-wraps":     getImagesForFolder("partial-wraps"),
    "full-wraps":        getImagesForFolder("full-wraps"),
    "fleet-programs":    getImagesForFolder("fleet-programs"),
    "specialty-services":getImagesForFolder("specialty-services"),
  };
}

/** Fallback images used when a gallery folder is empty */
export const FALLBACK_IMAGES: CategoryImages = {
  "base-decals":        ["/trucks/low-coverage.jpg"],
  "partial-wraps":      ["/trucks/middle-coverage.jpg"],
  "full-wraps":         ["/trucks/full-coverage.jpg"],
  "fleet-programs":     ["/trucks/full-coverage.jpg"],
  "specialty-services": ["/trucks/full-coverage.jpg"],
};

export function getImagesWithFallback(folder: GalleryFolder): string[] {
  const images = getImagesForFolder(folder);
  return images.length > 0 ? images : FALLBACK_IMAGES[folder];
}
