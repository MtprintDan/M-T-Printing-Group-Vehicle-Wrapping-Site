"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryTab {
  id: string;
  label: string;
  color: string;
  packageSlug: string;
  images: string[];
}

interface GallerySectionClientProps {
  categories: CategoryTab[];
}

export default function GallerySectionClient({ categories }: GallerySectionClientProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const active = categories[activeTab];
  const images = active.images;

  const next = useCallback(() => {
    setDirection(1);
    setImageIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setImageIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next, images.length]);

  // Reset image index when tab changes
  const handleTabChange = (i: number) => {
    setActiveTab(i);
    setImageIndex(0);
    setDirection(1);
  };

  const isYellow = active.color === "#FFD700";

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat, i) => {
          const isActive = i === activeTab;
          const isYellowTab = cat.color === "#FFD700";
          return (
            <button
              key={cat.id}
              onClick={() => handleTabChange(i)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={
                isActive
                  ? {
                      backgroundColor: cat.color,
                      color: isYellowTab ? "#000" : "#fff",
                    }
                  : {
                      backgroundColor: `${cat.color}12`,
                      color: isYellowTab ? "#9a7c00" : cat.color,
                    }
              }
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Image carousel */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
        {/* Aspect ratio container */}
        <div className="relative aspect-[16/7] w-full overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${activeTab}-${imageIndex}`}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.32, 0, 0.67, 0] }}
              className="absolute inset-0"
            >
              <Image
                src={images[imageIndex]}
                alt={`${active.label} wrap example ${imageIndex + 1}`}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority={imageIndex === 0}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Category label overlay */}
          <div className="absolute top-5 left-5 z-10">
            <span
              className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: active.color,
                color: isYellow ? "#000" : "#fff",
              }}
            >
              {active.label}
            </span>
          </div>

          {/* Prev / Next controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > imageIndex ? 1 : -1); setImageIndex(i); }}
                  className="w-1.5 h-1.5 rounded-full transition-all"
                  style={{
                    backgroundColor: i === imageIndex ? "#fff" : "rgba(255,255,255,0.4)",
                    transform: i === imageIndex ? "scale(1.4)" : "scale(1)",
                  }}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
        <Link
          href={`/packages/${active.packageSlug}`}
          className="inline-flex items-center gap-2 text-sm font-semibold transition-all group"
          style={{ color: isYellow ? "#9a7c00" : active.color }}
        >
          View {active.label} details
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 border-2 border-brand-black text-brand-black text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-brand-black hover:text-white transition-all group"
        >
          Full Gallery
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
