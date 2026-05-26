"use client";

import { motion } from "framer-motion";

const industries = [
  { name: "HVAC & Plumbing", emoji: "🔧", vehicles: "Sprinters, Vans" },
  { name: "Construction", emoji: "🏗️", vehicles: "Trucks, Pickups" },
  { name: "Landscaping", emoji: "🌿", vehicles: "Trailers, Cargo Vans" },
  { name: "Food & Beverage", emoji: "🍔", vehicles: "Box Trucks, Vans" },
  { name: "Electrical", emoji: "⚡", vehicles: "Sprinters, Transits" },
  { name: "Moving & Storage", emoji: "📦", vehicles: "Box Trucks" },
  { name: "Logistics", emoji: "🚛", vehicles: "Semis, Trailers" },
  { name: "Healthcare", emoji: "🏥", vehicles: "Vans, SUVs" },
];

export default function Industries() {
  return (
    <section id="industries" className="py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EC008C] mb-3">
            Industries Served
          </p>
          <h2 className="text-4xl font-black text-brand-black mb-4">
            Built for commercial operators
          </h2>
          <p className="text-gray-500 text-lg font-light">
            We understand fleet branding across every trade and industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-2xl p-6 flex flex-col items-center text-center border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
            >
              <span className="text-3xl mb-3">{ind.emoji}</span>
              <h3 className="font-bold text-sm text-brand-black mb-1">{ind.name}</h3>
              <p className="text-xs text-gray-400">{ind.vehicles}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
