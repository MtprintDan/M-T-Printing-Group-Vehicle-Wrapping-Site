"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Base Decal Package",
    tagline: "Get on the road branded",
    startingAt: 699,
    color: "#00AEEF",
    badgeColor: "#00AEEF",
    features: [
      "Logo & company name",
      "Door lettering",
      "Phone/website",
      "Basic layout included",
      "2–4 hr install",
    ],
    vehicles: [
      { label: "Small Vehicle", price: "$699" },
      { label: "Medium Van", price: "$950" },
      { label: "Large Van/Truck", price: "$1,250" },
      { label: "Truck + Trailer", price: "$1,650" },
    ],
    popular: true,
    gallerySlug: "base-decals",
  },
  {
    name: "Partial Wrap",
    tagline: "Maximum visibility, half coverage",
    startingAt: 1800,
    color: "#EC008C",
    badgeColor: "#EC008C",
    features: [
      "40–60% vehicle coverage",
      "Custom graphic design",
      "Premium vinyl",
      "4–8 hr install",
      "5–8 day turnaround",
    ],
    vehicles: [
      { label: "Small Vehicle", price: "$1,800" },
      { label: "Medium Van", price: "$2,600" },
      { label: "Large Van/Truck", price: "$3,400" },
      { label: "Truck + Trailer", price: "$4,800" },
    ],
    popular: false,
    gallerySlug: "partial-wraps",
  },
  {
    name: "Full Wrap",
    tagline: "Total transformation",
    startingAt: 3200,
    color: "#FFD700",
    badgeColor: "#FFD700",
    features: [
      "100% vehicle coverage",
      "Advanced custom design",
      "3M / Avery premium vinyl",
      "6–14 hr install",
      "7–12 day turnaround",
    ],
    vehicles: [
      { label: "Small Vehicle", price: "$3,200" },
      { label: "Medium Van", price: "$4,200" },
      { label: "Large Van/Truck", price: "$5,500" },
      { label: "Truck + Trailer", price: "$7,800" },
    ],
    popular: false,
    gallerySlug: "full-wraps",
  },
];

// Beam configuration: top% within section, glow color, travel duration + stagger delay
const BEAM_LINES = [
  { top: 43, glowColor: "#00AEEF", dur: 7.0, delay: 0.0 },
  { top: 52, glowColor: "#EC008C", dur: 8.5, delay: 1.4 },
  { top: 61, glowColor: "#FFD700", dur: 7.2, delay: 2.9 },
  { top: 70, glowColor: "#00AEEF", dur: 9.0, delay: 0.8 },
  { top: 79, glowColor: "#EC008C", dur: 6.8, delay: 4.1 },
];

// Gradient: dim outside card zones, bright in each card's column (~33% thirds)
const BEAM_GRADIENT =
  "linear-gradient(90deg," +
  "rgba(0,174,239,0.07) 0%," +
  "rgba(0,174,239,0.42) 8%," +
  "rgba(0,174,239,0.42) 30%," +
  "rgba(0,174,239,0.07) 34%," +
  "rgba(236,0,140,0.07) 36%," +
  "rgba(236,0,140,0.42) 40%," +
  "rgba(236,0,140,0.42) 62%," +
  "rgba(236,0,140,0.07) 66%," +
  "rgba(255,215,0,0.07) 68%," +
  "rgba(255,215,0,0.55) 72%," +
  "rgba(255,215,0,0.55) 92%," +
  "rgba(255,215,0,0.07) 100%";

// Per-card pulsing box-shadow (rgba since framer-motion animates these strings)
const CARD_SHADOWS = [
  {
    off: "0 0 0 1px rgba(0,174,239,0.13), 0 4px 24px -4px rgba(0,174,239,0.10)",
    on:  "0 0 0 2px rgba(0,174,239,0.42), 0 8px 48px 4px rgba(0,174,239,0.28)",
  },
  {
    off: "0 0 0 1px rgba(236,0,140,0.13), 0 4px 24px -4px rgba(236,0,140,0.10)",
    on:  "0 0 0 2px rgba(236,0,140,0.42), 0 8px 48px 4px rgba(236,0,140,0.28)",
  },
  {
    off: "0 0 0 1px rgba(255,215,0,0.18), 0 4px 24px -4px rgba(255,215,0,0.12)",
    on:  "0 0 0 2px rgba(255,215,0,0.55), 0 8px 48px 4px rgba(255,215,0,0.32)",
  },
];

function CmykBeamLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {BEAM_LINES.map((beam, i) => (
        <div key={i}>
          {/* Static CMYK gradient line — full section width */}
          <div
            className="absolute left-0 right-0 h-[1px]"
            style={{ top: `${beam.top}%`, background: BEAM_GRADIENT }}
          />
          {/* Traveling glow comet along each line */}
          <motion.div
            className="absolute rounded-full"
            style={{
              top: `calc(${beam.top}% - 2px)`,
              left: 0,
              width: 280,
              height: 5,
              background: `radial-gradient(ellipse at center, ${beam.glowColor} 0%, ${beam.glowColor}aa 45%, transparent 100%)`,
              filter: "blur(3px)",
            }}
            initial={{ x: -280 }}
            animate={{ x: 2500 }}
            transition={{
              duration: beam.dur,
              repeat: Infinity,
              delay: beam.delay,
              ease: "linear",
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function PricingOverview() {
  return (
    <section id="pricing" className="py-24 bg-brand-light relative overflow-hidden">
      {/* CMYK animated beam lines — edge to edge */}
      <CmykBeamLines />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,174,239,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,239,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EC008C] mb-3">
            Transparent Pricing
          </p>
          <h2 className="text-4xl font-black text-brand-black mb-4">
            No surprises. Just results.
          </h2>
          <p className="text-gray-500 text-lg font-light">
            Use our live calculator to build an exact quote based on your vehicle and requirements.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => {
            const isYellow = plan.color === "#FFD700";
            const shadows = CARD_SHADOWS[i];
            return (
              /* Outer div: entrance animation */
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >
                {/* Inner div: ongoing color-pulse glow tied to beam color */}
                <motion.div
                  className={`relative rounded-2xl overflow-hidden h-full ${
                    plan.popular
                      ? "bg-brand-black text-white shadow-2xl scale-[1.02]"
                      : "bg-white border border-gray-100 shadow-sm"
                  }`}
                  animate={{
                    boxShadow: [shadows.off, shadows.on, shadows.off],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 1.35,
                    ease: "easeInOut",
                  }}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00AEEF] via-[#EC008C] to-[#FFD700]" />
                  )}
                  {plan.popular && (
                    <div
                      className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide"
                      style={{ backgroundColor: plan.badgeColor, color: "#fff" }}
                    >
                      Most Popular
                    </div>
                  )}

                  <div className="p-8">
                    <div
                      className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
                      style={{
                        color: plan.popular
                          ? plan.badgeColor
                          : isYellow
                          ? "#9a7c00"
                          : plan.color,
                      }}
                    >
                      {plan.name}
                    </div>
                    <p className={`text-sm mb-4 ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>
                      {plan.tagline}
                    </p>
                    <div className="flex items-end gap-1 mb-6">
                      <span className="text-sm font-medium text-gray-400">From</span>
                      <span
                        className={`text-4xl font-black ${
                          plan.popular ? "text-white" : "text-brand-black"
                        }`}
                      >
                        ${plan.startingAt.toLocaleString()}
                      </span>
                    </div>

                    <ul className="space-y-2.5 mb-6">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <Check
                            size={14}
                            className="shrink-0"
                            style={{
                              color: plan.popular
                                ? plan.color
                                : isYellow
                                ? "#9a7c00"
                                : plan.color,
                            }}
                          />
                          <span className={plan.popular ? "text-gray-300" : "text-gray-600"}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className={`rounded-xl p-4 mb-6 ${plan.popular ? "bg-white/5" : "bg-gray-50"}`}>
                      {plan.vehicles.map((v) => (
                        <div
                          key={v.label}
                          className="flex justify-between items-center py-1.5 text-sm"
                        >
                          <span className={plan.popular ? "text-gray-400" : "text-gray-500"}>
                            {v.label}
                          </span>
                          <span
                            className={`font-bold ${
                              plan.popular ? "text-white" : "text-brand-black"
                            }`}
                          >
                            {v.price}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/calculator"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all"
                      style={{
                        backgroundColor: plan.popular ? plan.badgeColor : "#0A0A0A",
                        color:
                          plan.popular && plan.badgeColor === "#FFD700" ? "#000" : "#fff",
                      }}
                    >
                      Build Quote <ArrowRight size={15} />
                    </Link>
                    <Link
                      href={`/gallery?category=${plan.gallerySlug}`}
                      className={`flex items-center justify-center gap-1 w-full py-2 text-xs font-semibold transition-colors mt-2 ${
                        plan.popular
                          ? "text-gray-400 hover:text-gray-200"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      Show Me Examples →
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-400 mt-8"
        >
          All prices are estimates. Final pricing depends on vehicle condition, design complexity, and add-ons.
        </motion.p>
      </div>
    </section>
  );
}
