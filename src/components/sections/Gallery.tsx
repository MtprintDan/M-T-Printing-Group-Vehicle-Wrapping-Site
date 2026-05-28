"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, ArrowRight } from "lucide-react";

export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
}

interface GalleryProps {
  items: GalleryItem[];
  showViewAll?: boolean;
}

function Lightbox({
  items,
  current,
  onClose,
  onPrev,
  onNext,
}: {
  items: GalleryItem[];
  current: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const item = items[current];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Close"
      >
        <X size={20} />
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 text-white/60 text-sm font-medium">
        {current + 1} / {items.length}
      </div>

      {/* Main image */}
      <motion.div
        key={current}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-5xl mx-12 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/7] w-full">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        {/* Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2"
            style={{ backgroundColor: item.tagColor, color: item.tagColor === "#FFD700" ? "#000" : "#fff" }}
          >
            {item.tag}
          </span>
          <h3 className="text-white font-black text-2xl">{item.title}</h3>
          <p className="text-white/70 text-sm mt-1">{item.subtitle}</p>
        </div>
      </motion.div>

      {/* Prev */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Thumbnail strip */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); /* navigate by index */ }}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default function Gallery({ items, showViewAll = false }: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const prev = useCallback(() =>
    setCurrentIndex((i) => (i - 1 + items.length) % items.length),
    [items.length]
  );

  const next = useCallback(() =>
    setCurrentIndex((i) => (i + 1) % items.length),
    [items.length]
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, closeLightbox, prev, next]);

  useEffect(() => {
    document.body.style.overflow = lightboxOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-300"
            onClick={() => openLightbox(i)}
          >
            {/* Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-90">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
              </div>

              {/* CMYK bar at bottom of image */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                style={{ backgroundColor: item.tagColor }}
              />
            </div>

            {/* Card info */}
            <div className="p-5 bg-white flex items-center justify-between">
              <div>
                <h3 className="font-bold text-brand-black text-sm">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
              </div>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full shrink-0 ml-3"
                style={{
                  backgroundColor: `${item.tagColor}18`,
                  color: item.tagColor === "#FFD700" ? "#B8980A" : item.tagColor,
                }}
              >
                {item.tag}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {showViewAll && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 border-2 border-brand-black text-brand-black font-semibold text-sm px-7 py-3 rounded-full hover:bg-brand-black hover:text-white transition-all group"
          >
            View Full Gallery
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <Lightbox
            items={items}
            current={currentIndex}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}
