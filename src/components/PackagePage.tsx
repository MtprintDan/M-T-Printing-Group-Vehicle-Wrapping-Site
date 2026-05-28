"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Clock, Calendar, ChevronLeft } from "lucide-react";
import type { PackageData } from "@/lib/packages";
import Gallery, { GalleryItem } from "@/components/sections/Gallery";

interface PackagePageProps {
  pkg: PackageData;
  galleryImages: string[];
}

export default function PackagePage({ pkg, galleryImages }: PackagePageProps) {
  const isDark = pkg.color === "#0A0A0A";
  const isYellow = pkg.color === "#FFD700";
  const textPrimary = isYellow ? "text-black" : "text-white";
  const textSecondary = isYellow ? "text-black/60" : "text-white/70";

  const galleryItems: GalleryItem[] = galleryImages.map((src, i) => ({
    src,
    alt: `${pkg.name} example ${i + 1}`,
    title: pkg.name,
    subtitle: pkg.tagline,
    tag: pkg.shortName,
    tagColor: pkg.color,
  }));

  return (
    <main className="min-h-screen bg-white">
      {/* Color-curtain entrance animation */}
      <motion.div
        className="fixed inset-0 z-[200] pointer-events-none"
        style={{ backgroundColor: pkg.color }}
        initial={{ scaleY: 1, originY: 0 }}
        animate={{ scaleY: 0, originY: 0 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
      />

      {/* Hero — colored background */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="relative min-h-[70vh] flex items-end pb-16 pt-36 overflow-hidden"
        style={{ backgroundColor: pkg.color }}
      >
        {/* Subtle grid overlay on hero */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Back link */}
        <Link
          href="/#services"
          className={`absolute top-28 left-6 sm:left-10 flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70 ${textPrimary}`}
        >
          <ChevronLeft size={16} />
          All Packages
        </Link>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* Left — text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className={`text-xs font-bold uppercase tracking-widest mb-4 ${textSecondary}`}
              >
                M&T Printing Group
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className={`text-5xl sm:text-6xl font-black leading-tight mb-5 ${textPrimary}`}
              >
                {pkg.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className={`text-lg font-light max-w-md mb-8 ${textSecondary}`}
              >
                {pkg.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href={`/calculator`}
                  className={`inline-flex items-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full transition-all group ${
                    isYellow
                      ? "bg-black text-white hover:bg-gray-900"
                      : "bg-white text-brand-black hover:bg-gray-100"
                  }`}
                >
                  Build Your Quote
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/quote"
                  className={`inline-flex items-center gap-2 font-semibold text-sm px-7 py-3.5 rounded-full border-2 transition-all ${
                    isYellow
                      ? "border-black/25 text-black hover:border-black/50"
                      : "border-white/25 text-white hover:border-white/50"
                  }`}
                >
                  Request a Quote
                </Link>
              </motion.div>
            </div>

            {/* Right — package image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={pkg.imageSrc}
                alt={pkg.imageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Details section — white background */}
      <section className="py-20 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Features */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black text-brand-black mb-7">
              What&apos;s included
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pkg.features.map((f) => (
                <li key={f} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: pkg.color }}
                  >
                    <Check size={11} className={isYellow ? "text-black" : "text-white"} />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">{f}</span>
                </li>
              ))}
            </ul>

            {/* Time indicators */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 flex-1">
                <Clock size={18} style={{ color: pkg.color }} />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Install Time</p>
                  <p className="text-sm font-bold text-brand-black">{pkg.installTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-5 py-4 flex-1">
                <Calendar size={18} style={{ color: pkg.color }} />
                <div>
                  <p className="text-xs text-gray-400 font-medium">Turnaround</p>
                  <p className="text-sm font-bold text-brand-black">{pkg.turnaround}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing sidebar */}
          <div>
            <h2 className="text-2xl font-black text-brand-black mb-7">Pricing</h2>
            <div className="rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <div className="h-1.5" style={{ backgroundColor: pkg.color }} />
              <div className="p-6">
                {pkg.startingPrice === "Custom" ? (
                  <div className="mb-6">
                    <p className="text-xs text-gray-400 font-medium mb-1">Pricing</p>
                    <p className="text-3xl font-black text-brand-black">Custom</p>
                    <p className="text-sm text-gray-500 mt-1">Based on fleet size & scope</p>
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="text-xs text-gray-400 font-medium mb-1">Starting from</p>
                    <p className="text-4xl font-black text-brand-black">{pkg.startingPrice}</p>
                  </div>
                )}

                <div className="space-y-2 mb-6">
                  {pkg.vehicles.map((v) => (
                    <div key={v.label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <span className="text-sm text-gray-500">{v.label}</span>
                      <span className="text-sm font-bold text-brand-black">{v.price}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/calculator"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all group"
                  style={{ backgroundColor: pkg.color, color: isYellow ? "#000" : "#fff" }}
                >
                  Build Your Quote
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <p className="text-center text-xs text-gray-400 mt-3">
                  Estimate only — confirmed after consultation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {galleryItems.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            <div className="mb-10">
              <p
                className="text-xs font-bold uppercase tracking-widest mb-2"
                style={{ color: pkg.color === "#FFD700" ? "#9a7c00" : pkg.color }}
              >
                {pkg.name}
              </p>
              <h2 className="text-3xl font-black text-brand-black">Work examples</h2>
            </div>
            <Gallery items={galleryItems} showViewAll={false} />
          </div>
        </section>
      )}

      {/* Cross-sell other packages */}
      <section className="py-16 max-w-7xl mx-auto px-6 sm:px-10">
        <h2 className="text-2xl font-black text-brand-black mb-8">Explore other packages</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {["base-decal", "partial-wrap", "full-wrap", "fleet-programs"]
            .filter((s) => s !== pkg.slug)
            .map((slug) => {
              const colors: Record<string, string> = {
                "base-decal": "#00AEEF",
                "partial-wrap": "#EC008C",
                "full-wrap": "#FFD700",
                "fleet-programs": "#0A0A0A",
              };
              const names: Record<string, string> = {
                "base-decal": "Base Decal",
                "partial-wrap": "Partial Wrap",
                "full-wrap": "Full Wrap",
                "fleet-programs": "Fleet Programs",
              };
              const c = colors[slug];
              const isYellowCard = c === "#FFD700";
              return (
                <Link
                  key={slug}
                  href={`/packages/${slug}`}
                  className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="h-2" style={{ backgroundColor: c }} />
                  <div className="p-5">
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-1.5"
                      style={{ color: isYellowCard ? "#9a7c00" : c }}
                    >
                      Package
                    </p>
                    <p className="font-black text-sm text-brand-black group-hover:underline">
                      {names[slug]}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>
    </main>
  );
}
