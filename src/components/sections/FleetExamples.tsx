"use client";

import { motion } from "framer-motion";

const examples = [
  {
    label: "Full Wrap",
    vehicle: "Sprinter Van",
    colors: ["#00AEEF", "#0A0A0A"],
    industry: "HVAC & Plumbing",
  },
  {
    label: "Partial Wrap",
    vehicle: "Cargo Van",
    colors: ["#EC008C", "#0A0A0A"],
    industry: "Landscaping",
  },
  {
    label: "Full Wrap",
    vehicle: "Box Truck",
    colors: ["#FFD700", "#0A0A0A"],
    industry: "Moving & Storage",
  },
  {
    label: "Starter Pack",
    vehicle: "Pickup Truck",
    colors: ["#0A0A0A", "#00AEEF"],
    industry: "Construction",
  },
  {
    label: "Full Wrap",
    vehicle: "Truck + Trailer",
    colors: ["#EC008C", "#FFD700"],
    industry: "Food & Beverage",
  },
  {
    label: "Partial Wrap",
    vehicle: "Transit Van",
    colors: ["#00AEEF", "#EC008C"],
    industry: "Electrical",
  },
];

function VehicleIllustration({ colors, label }: { colors: string[]; label: string }) {
  return (
    <div className="relative w-full h-40 flex items-center justify-center">
      {/* Van silhouette as SVG */}
      <svg viewBox="0 0 280 120" className="w-full h-full" fill="none">
        {/* Body */}
        <rect x="10" y="40" width="220" height="65" rx="8" fill={colors[0]} />
        {/* Cab */}
        <rect x="180" y="20" width="52" height="55" rx="8" fill={colors[0]} />
        {/* Windows */}
        <rect x="188" y="26" width="36" height="28" rx="4" fill="white" opacity="0.25" />
        {/* Wrap accent stripe */}
        <rect x="10" y="65" width="220" height="14" fill={colors[1]} opacity="0.35" />
        {/* Wheels */}
        <circle cx="55" cy="108" r="16" fill="#222" />
        <circle cx="55" cy="108" r="8" fill="#888" />
        <circle cx="185" cy="108" r="16" fill="#222" />
        <circle cx="185" cy="108" r="8" fill="#888" />
        {/* Headlight */}
        <rect x="225" y="50" width="14" height="10" rx="2" fill="#FFD700" opacity="0.8" />
        {/* Door handle */}
        <rect x="100" y="72" width="20" height="4" rx="2" fill="white" opacity="0.3" />
        {/* Label on body */}
        <text x="80" y="62" fontSize="11" fill="white" fontWeight="bold" opacity="0.9">
          {label.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}

export default function FleetExamples() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#FFD700] mb-3">
            Fleet Gallery
          </p>
          <h2 className="text-4xl font-black text-brand-black mb-4">
            Every vehicle, every industry
          </h2>
          <p className="text-gray-500 text-lg font-light">
            From single vans to enterprise fleets — we brand them all.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {examples.map((ex, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group"
            >
              {/* Preview */}
              <div
                className="p-6 transition-transform group-hover:scale-[1.02] duration-300"
                style={{
                  background: `linear-gradient(135deg, ${ex.colors[0]}18, ${ex.colors[1]}18)`,
                }}
              >
                <VehicleIllustration colors={ex.colors} label={ex.label} />
              </div>

              {/* Info */}
              <div className="p-5 flex items-center justify-between">
                <div>
                  <p className="font-bold text-brand-black text-sm">{ex.vehicle}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{ex.industry}</p>
                </div>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full"
                  style={{
                    backgroundColor: `${ex.colors[0]}15`,
                    color: ex.colors[0],
                  }}
                >
                  {ex.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
