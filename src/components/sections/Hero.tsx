"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";

const highlights = [
  "Premium 3M & Avery vinyl",
  "10-year outdoor durability",
  "Fleet discounts available",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* CMYK accent bar — top */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#00AEEF]" />
        <div className="flex-1 bg-[#EC008C]" />
        <div className="flex-1 bg-[#FFD700]" />
        <div className="flex-1 bg-[#0A0A0A]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-[#00AEEF] animate-pulse" />
            Commercial Fleet Branding
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-brand-black leading-[1.05] tracking-tight mb-6"
          >
            Fleet Branding
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#EC008C]">
              Made Simple.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-500 font-light mb-10 max-w-xl"
          >
            Professional vehicle graphics starting under{" "}
            <span className="text-brand-black font-semibold">$699</span>. Turn your fleet into a
            moving billboard.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 bg-brand-black text-white font-semibold text-base px-8 py-4 rounded-full hover:bg-gray-800 transition-all hover:gap-3 group"
            >
              Build Your Wrap
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-brand-black font-semibold text-base px-8 py-4 rounded-full hover:border-brand-black transition-all"
            >
              Get a Quote
            </Link>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {highlights.map((text) => (
              <div key={text} className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle size={15} className="text-[#00AEEF] shrink-0" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Decorative price badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2"
        >
          <div className="w-64 h-64 relative">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 animate-spin" style={{ animationDuration: "20s" }} />
            {/* Inner card */}
            <div className="absolute inset-4 rounded-full bg-white shadow-xl border border-gray-100 flex flex-col items-center justify-center">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-widest">Starting at</p>
              <p className="text-4xl font-black text-brand-black">$699</p>
              <div className="flex gap-1 mt-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00AEEF]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#EC008C]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFD700]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-gray-300 to-transparent" />
        <p className="text-xs text-gray-400 uppercase tracking-widest">Scroll</p>
      </motion.div>
    </section>
  );
}
