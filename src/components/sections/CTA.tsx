"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-24 bg-brand-black overflow-hidden relative">
      {/* CMYK stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#00AEEF]" />
        <div className="flex-1 bg-[#EC008C]" />
        <div className="flex-1 bg-[#FFD700]" />
        <div className="flex-1 bg-white opacity-20" />
      </div>

      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center gap-1.5 mb-8">
            <div className="w-3 h-3 rounded-full bg-[#00AEEF]" />
            <div className="w-3 h-3 rounded-full bg-[#EC008C]" />
            <div className="w-3 h-3 rounded-full bg-[#FFD700]" />
            <div className="w-3 h-3 rounded-full bg-white opacity-40" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Ready to brand
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00AEEF] to-[#EC008C]">
              your fleet?
            </span>
          </h2>

          <p className="text-gray-400 text-lg font-light mb-10 max-w-xl mx-auto">
            Get an instant estimate in 60 seconds. No commitment, no pressure — just a clear number.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-black font-bold text-base px-8 py-4 rounded-full hover:bg-gray-100 transition-all group"
            >
              Build Your Wrap
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-semibold text-base px-8 py-4 rounded-full hover:border-white/40 transition-all"
            >
              Request a Quote
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            Fleet discounts available for 3+ vehicles. Contact us for custom pricing.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
