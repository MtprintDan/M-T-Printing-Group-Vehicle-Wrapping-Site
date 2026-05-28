"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Gallery, { GalleryItem } from "@/components/sections/Gallery";

interface CategoryData {
  id: string;
  title: string;
  slug: string;
  color: string;
  price: string;
  description: string;
  images: string[];
}

interface GalleryPageContentProps {
  categories: CategoryData[];
}

export default function GalleryPageContent({ categories }: GalleryPageContentProps) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("all");

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && categories.some((c) => c.id === cat)) {
      setActiveTab(cat);
    }
  }, [searchParams, categories]);

  const allImages: GalleryItem[] = categories.flatMap((cat) =>
    cat.images.map((src) => ({
      src,
      alt: `${cat.title} vehicle wrap`,
      title: cat.title,
      subtitle: cat.description,
      tag: cat.title,
      tagColor: cat.color,
    }))
  );

  const filteredItems: GalleryItem[] =
    activeTab === "all"
      ? allImages
      : categories
          .filter((c) => c.id === activeTab)
          .flatMap((cat) =>
            cat.images.map((src) => ({
              src,
              alt: `${cat.title} vehicle wrap`,
              title: cat.title,
              subtitle: cat.description,
              tag: cat.title,
              tagColor: cat.color,
            }))
          );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mb-14"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[#EC008C] mb-3">
          Our Work
        </p>
        <h1 className="text-5xl font-black text-brand-black mb-4 leading-tight">
          Vehicle Wrap Gallery
        </h1>
        <p className="text-gray-500 text-lg font-light">
          Browse real examples of M&amp;T Printing Group&apos;s fleet branding work across every package type. Click any image to view full size.
        </p>
      </motion.div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
            activeTab === "all"
              ? "bg-brand-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All Work
        </button>
        {categories.map((cat) => {
          const isActive = activeTab === cat.id;
          const isYellow = cat.color === "#FFD700";
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all"
              style={
                isActive
                  ? { backgroundColor: cat.color, color: isYellow ? "#000" : "#fff" }
                  : { backgroundColor: `${cat.color}14`, color: isYellow ? "#9a7c00" : cat.color }
              }
            >
              {cat.title}
            </button>
          );
        })}
      </div>

      {/* Gallery grid */}
      <section className="mb-16">
        {filteredItems.length > 0 ? (
          <Gallery items={filteredItems} showViewAll={false} />
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">Gallery images coming soon.</p>
            <p className="text-sm mt-2">
              Drop your images into <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">public/gallery/{activeTab}/</code> to populate this section.
            </p>
          </div>
        )}
      </section>

      {/* Coverage overview */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
            Coverage Levels
          </p>
          <h2 className="text-3xl font-black text-brand-black">Choose your level of impact</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.filter((c) => c.slug !== "specialty").map((cat, i) => {
            const isYellow = cat.color === "#FFD700";
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={`/packages/${cat.slug}`}
                  className="group block rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-1.5" style={{ backgroundColor: cat.color }} />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-black text-base text-brand-black">{cat.title}</h3>
                      <span
                        className="text-xs font-bold"
                        style={{ color: isYellow ? "#9a7c00" : cat.color }}
                      >
                        {cat.price}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-3">{cat.description}</p>
                    <span className="text-xs font-semibold flex items-center gap-1 text-gray-400 group-hover:text-brand-black transition-colors">
                      View package <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-brand-black text-white p-10 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#00AEEF]" />
          <div className="flex-1 bg-[#EC008C]" />
          <div className="flex-1 bg-[#FFD700]" />
          <div className="flex-1 bg-white opacity-20" />
        </div>
        <h2 className="text-3xl font-black mb-3">Ready to wrap your fleet?</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Get an instant estimate in 60 seconds with our live pricing calculator.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/calculator"
            className="inline-flex items-center justify-center gap-2 bg-white text-brand-black font-bold text-sm px-7 py-3.5 rounded-full hover:bg-gray-100 transition-all group"
          >
            Build Your Wrap
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:border-white/40 transition-all"
          >
            Request a Quote
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
