"use client";

import { motion } from "framer-motion";
import { Wrench, HardHat, Leaf, UtensilsCrossed, Zap, Package, Truck, Heart } from "lucide-react";

const CMYK = ["#00AEEF", "#EC008C", "#FFD700", "#00AEEF", "#EC008C", "#FFD700", "#00AEEF", "#EC008C"];

const industries = [
  { name: "HVAC & Plumbing", Icon: Wrench, vehicles: "Sprinters, Vans" },
  { name: "Construction", Icon: HardHat, vehicles: "Trucks, Pickups" },
  { name: "Landscaping", Icon: Leaf, vehicles: "Trailers, Cargo Vans" },
  { name: "Food & Beverage", Icon: UtensilsCrossed, vehicles: "Box Trucks, Vans" },
  { name: "Electrical", Icon: Zap, vehicles: "Sprinters, Transits" },
  { name: "Moving & Storage", Icon: Package, vehicles: "Box Trucks" },
  { name: "Logistics", Icon: Truck, vehicles: "Semis, Trailers" },
  { name: "Healthcare", Icon: Heart, vehicles: "Vans, SUVs" },
];

export default function Industries() {
  return (
    <section id="industries" className="py-24 bg-brand-light relative overflow-hidden">
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
          {industries.map((ind, i) => {
            const color = CMYK[i];
            const isYellow = color === "#FFD700";
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 flex flex-col items-center text-center border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <ind.Icon
                    size={20}
                    style={{ color: isYellow ? "#9a7c00" : color }}
                  />
                </div>
                <h3 className="font-bold text-sm text-brand-black mb-1">{ind.name}</h3>
                <p className="text-xs text-gray-400">{ind.vehicles}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
