"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";

const trustBadges = [
  { label: "20+ Years", sub: "Experience" },
  { label: "11", sub: "Ontario Locations" },
  { label: "3M Certified", sub: "Materials" },
  { label: "1,000+", sub: "Vehicles Wrapped" },
];

const highlights = [
  "Premium 3M & Avery vinyl",
  "10-year outdoor durability",
  "Fleet discounts available",
];

function SprinterVan() {
  return (
    <svg viewBox="0 0 520 210" className="w-full h-full" fill="none">
      {/* Shadow */}
      <ellipse cx="260" cy="200" rx="200" ry="8" fill="rgba(0,0,0,0.07)" />

      {/* Body — Sprinter silhouette (tall cab, long wheelbase) */}
      <path
        d="M 42,168 L 42,92 L 58,55 L 90,32 L 178,22 L 420,22 L 455,48 L 470,75 L 472,168 Z"
        fill="#f0f9ff"
        stroke="#00AEEF"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Cab / A-pillar structure */}
      <path
        d="M 58,55 L 58,110 L 178,110 L 178,22"
        fill="#daeef9"
        stroke="#00AEEF"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Windshield glass */}
      <path
        d="M 66,58 L 66,104 L 172,104 L 172,26 L 92,26 Z"
        fill="#bde4f5"
        stroke="#00AEEF"
        strokeWidth="1.2"
        opacity="0.7"
      />

      {/* Side windows — long sliding panel area */}
      <rect x="192" y="32" width="72" height="58" rx="5" fill="#bde4f5" stroke="#00AEEF" strokeWidth="1.4" opacity="0.8" />
      <rect x="276" y="32" width="72" height="58" rx="5" fill="#bde4f5" stroke="#00AEEF" strokeWidth="1.4" opacity="0.8" />

      {/* Rear quarter window */}
      <path d="M 402,22 L 402,70 L 450,70 L 450,48 L 424,22 Z" fill="#bde4f5" stroke="#00AEEF" strokeWidth="1.3" opacity="0.8" />

      {/* Sliding door line */}
      <line x1="178" y1="42" x2="178" y2="168" stroke="#79c8e8" strokeWidth="1.2" strokeDasharray="5,4" />
      <line x1="360" y1="22" x2="360" y2="168" stroke="#79c8e8" strokeWidth="1" strokeDasharray="4,4" />

      {/* Rear doors */}
      <rect x="404" y="22" width="68" height="146" rx="0" stroke="#79c8e8" strokeWidth="1" fill="none" strokeDasharray="4,3" />
      <line x1="438" y1="22" x2="438" y2="168" stroke="#79c8e8" strokeWidth="1" strokeDasharray="4,3" />

      {/* Front grille / bumper area */}
      <path d="M 30,140 L 30,168 L 60,168 L 60,140 Z" fill="#d0eaf7" stroke="#00AEEF" strokeWidth="1.2" />
      <rect x="33" y="143" width="24" height="4" rx="1" fill="#79c8e8" opacity="0.6" />
      <rect x="33" y="150" width="24" height="4" rx="1" fill="#79c8e8" opacity="0.6" />
      <rect x="33" y="157" width="24" height="4" rx="1" fill="#79c8e8" opacity="0.6" />

      {/* Headlight */}
      <path d="M 42,80 L 42,100 L 68,100 L 68,80 Z" fill="#fffde8" stroke="#00AEEF" strokeWidth="1.2" rx="2" />
      <path d="M 44,82 L 44,98 L 66,98 L 66,82 Z" fill="#fef9c3" opacity="0.8" />

      {/* Wheel wells */}
      <path d="M 80,168 Q 80,145 110,145 Q 140,145 140,168" fill="#d8edf6" stroke="#00AEEF" strokeWidth="1.5" />
      <path d="M 360,168 Q 360,145 390,145 Q 420,145 420,168" fill="#d8edf6" stroke="#00AEEF" strokeWidth="1.5" />

      {/* Wheels */}
      <circle cx="110" cy="170" r="28" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <circle cx="110" cy="170" r="18" fill="#253347" />
      <circle cx="110" cy="170" r="10" fill="#334155" />
      <circle cx="110" cy="170" r="4"  fill="#64748b" />
      {[0,60,120,180,240,300].map((deg) => (
        <line
          key={deg}
          x1={110 + Math.cos((deg * Math.PI) / 180) * 10}
          y1={170 + Math.sin((deg * Math.PI) / 180) * 10}
          x2={110 + Math.cos((deg * Math.PI) / 180) * 18}
          y2={170 + Math.sin((deg * Math.PI) / 180) * 18}
          stroke="#475569"
          strokeWidth="2.5"
        />
      ))}

      <circle cx="390" cy="170" r="28" fill="#1e293b" stroke="#334155" strokeWidth="2" />
      <circle cx="390" cy="170" r="18" fill="#253347" />
      <circle cx="390" cy="170" r="10" fill="#334155" />
      <circle cx="390" cy="170" r="4"  fill="#64748b" />
      {[0,60,120,180,240,300].map((deg) => (
        <line
          key={deg}
          x1={390 + Math.cos((deg * Math.PI) / 180) * 10}
          y1={170 + Math.sin((deg * Math.PI) / 180) * 10}
          x2={390 + Math.cos((deg * Math.PI) / 180) * 18}
          y2={170 + Math.sin((deg * Math.PI) / 180) * 18}
          stroke="#475569"
          strokeWidth="2.5"
        />
      ))}

      {/* CMYK wrap accent strip */}
      <path d="M 42,110 L 472,110 L 472,124 L 42,124 Z" fill="url(#heroStripe)" opacity="0.22" />
      <defs>
        <linearGradient id="heroStripe" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#00AEEF" />
          <stop offset="33%"  stopColor="#EC008C" />
          <stop offset="66%"  stopColor="#FFD700" />
          <stop offset="100%" stopColor="#0A0A0A" />
        </linearGradient>
      </defs>

      {/* M&T logo area on side panel */}
      <rect x="218" y="120" width="120" height="32" rx="5" fill="#00AEEF" opacity="0.1" stroke="#00AEEF" strokeWidth="0.8" />
      <text x="278" y="140" textAnchor="middle" fontSize="10" fill="#0284c7" fontWeight="800" fontFamily="system-ui, sans-serif">M&amp;T PRINTING</text>

      {/* Door handle detail */}
      <rect x="160" y="118" width="10" height="3" rx="1.5" fill="#79c8e8" opacity="0.8" />
      <rect x="340" y="118" width="10" height="3" rx="1.5" fill="#79c8e8" opacity="0.8" />

      {/* Roof rack line */}
      <line x1="100" y1="23" x2="400" y2="23" stroke="#79c8e8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-[144px]">
      {/* CMYK accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#00AEEF]" />
        <div className="flex-1 bg-[#EC008C]" />
        <div className="flex-1 bg-[#FFD700]" />
        <div className="flex-1 bg-[#0A0A0A]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left — copy ────────────────────────────────────── */}
          <div className="max-w-xl">
            {/* Location chip — clickable → /locations */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                href="/locations"
                className="inline-flex items-center gap-1.5 bg-[#00AEEF]/10 text-[#00AEEF] text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5 hover:bg-[#00AEEF]/20 transition-colors cursor-pointer"
              >
                <MapPin size={10} /> Ontario&apos;s Fleet Wrap Specialists
              </Link>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-brand-black leading-[1.05] tracking-tight mb-6"
            >
              Branding
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
              className="text-xl text-gray-500 font-light mb-8 max-w-lg"
            >
              Professional vehicle graphics starting under{" "}
              <span className="text-brand-black font-semibold">$699</span>. Turn your fleet into a
              moving billboard.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="grid grid-cols-4 gap-3 mb-8"
            >
              {trustBadges.map((b) => (
                <div key={b.label} className="text-center">
                  <p className="text-lg font-black text-brand-black leading-tight">{b.label}</p>
                  <p className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5">{b.sub}</p>
                </div>
              ))}
            </motion.div>

            {/* CTA trio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col gap-3 mb-10"
            >
              {/* Primary */}
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 bg-brand-black text-white font-semibold text-base px-8 py-4 rounded-full hover:bg-gray-800 transition-all group self-start"
              >
                Build Your Wrap
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>

              <div className="flex items-center gap-3">
                {/* Secondary */}
                <Link
                  href="/#pricing"
                  className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-brand-black font-semibold text-sm px-6 py-3 rounded-full hover:border-[#00AEEF] hover:text-[#00AEEF] transition-all"
                >
                  View Pricing
                </Link>
                {/* Tertiary */}
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-brand-black transition-colors group"
                >
                  See Our Fleet Work
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
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

          {/* ── Right — Van showcase ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="hidden lg:block relative"
          >
            {/* CMYK floating accent dots */}
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-4 w-16 h-16 rounded-full bg-[#00AEEF]/15 border-2 border-[#00AEEF]/30 z-10"
            />
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-6 w-12 h-12 rounded-full bg-[#EC008C]/15 border-2 border-[#EC008C]/30 z-10"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 -right-8 w-8 h-8 rounded-full bg-[#FFD700]/25 border-2 border-[#FFD700]/50 z-10"
            />

            {/* Van — clickable → /#pricing */}
            <Link href="/#pricing" className="block group">
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#f0f9ff] to-[#f8fafc] border border-[#00AEEF]/20 shadow-2xl group-hover:shadow-[0_20px_60px_rgba(0,174,239,0.2)] transition-shadow duration-300">
                {/* Drop /public/van-hero.png to replace the SVG placeholder */}
                <div className="relative aspect-[16/9]">
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <SprinterVan />
                  </div>
                  {/* Gradient overlay bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f0f9ff] to-transparent" />
                </div>

                {/* Floating label */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm border border-gray-100">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#00AEEF]">Mercedes Sprinter</p>
                  <p className="text-xs font-semibold text-brand-black">Base Decal Package</p>
                </div>

                {/* Click hint */}
                <div className="absolute top-4 right-4 bg-[#00AEEF]/10 text-[#00AEEF] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  View Pricing ↓
                </div>

                {/* Wrap coverage bar */}
                <div className="px-4 pb-4 pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] text-gray-400 font-medium">Wrap Coverage</p>
                    <p className="text-[10px] font-bold text-[#00AEEF]">30%</p>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "30%" }}
                      transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-[#00AEEF]"
                    />
                  </div>
                </div>
              </div>
            </Link>

            {/* Price tag floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="absolute -bottom-4 right-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-3"
            >
              <p className="text-[10px] text-gray-400 font-medium">Starting from</p>
              <p className="text-2xl font-black text-brand-black">$699</p>
              <p className="text-[9px] text-gray-400">+ design if needed</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-gray-300 to-transparent" />
        <p className="text-xs text-gray-400 uppercase tracking-widest">Scroll</p>
      </motion.div>
    </section>
  );
}
