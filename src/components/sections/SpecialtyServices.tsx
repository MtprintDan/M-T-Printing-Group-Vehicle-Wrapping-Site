"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Truck, Layers, Eye, Hammer, Paintbrush } from "lucide-react";

const services = [
  {
    icon: Truck,
    title: "Trailer Decals / Wraps",
    description: "Full 53' trailers and flatbeds wrapped in premium 3M vinyl. High-impact highway advertising at commercial spec.",
    color: "#00AEEF",
  },
  {
    icon: Layers,
    title: "Murals / Wall Graphics",
    description: "Large-format wall murals and graphic installations for warehouses, showrooms, offices, and retail environments.",
    color: "#EC008C",
  },
  {
    icon: Eye,
    title: "Window Graphics & Perf",
    description: "One-way vision perforated film for vehicle windows, storefronts, and commercial glass — full-colour print.",
    color: "#FFD700",
  },
  {
    icon: Hammer,
    title: "Installation Only",
    description: "Already have the vinyl? Our certified 3M & Avery installers handle the application with precision and warranty.",
    color: "#00AEEF",
  },
  {
    icon: Paintbrush,
    title: "Graphic Design",
    description: "Full graphic design from concept to print-ready files — logos, vehicle layouts, brand identity, and renders.",
    color: "#EC008C",
  },
];

export default function SpecialtyServices() {
  return (
    <section id="specialty" className="py-24 bg-white relative overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,174,239,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,239,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
            Specialty Services
          </p>
          <h2 className="text-4xl font-black text-brand-black mb-4">
            Beyond the standard wrap
          </h2>
          <p className="text-gray-500 text-lg font-light">
            Trailers, box trucks, wall graphics, and more — if it needs a wrap, we handle it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {services.map((svc, i) => {
            const isYellow = svc.color === "#FFD700";
            return (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all"
              >
                <div className="h-1" style={{ backgroundColor: svc.color }} />
                <div className="p-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${svc.color}15` }}
                  >
                    <svc.icon size={20} style={{ color: isYellow ? "#9a7c00" : svc.color }} />
                  </div>
                  <h3 className="font-black text-base text-brand-black mb-2">{svc.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{svc.description}</p>
                  <Link
                    href="/specialty"
                    className="inline-flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
                    style={{ color: isYellow ? "#9a7c00" : svc.color }}
                  >
                    Learn more <ArrowRight size={12} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 items-start"
        >
          <Link
            href="/specialty"
            className="inline-flex items-center gap-2 bg-brand-black text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-gray-800 transition-all group"
          >
            View All Specialty Services
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 border-2 border-gray-200 text-brand-black font-semibold text-sm px-7 py-3.5 rounded-full hover:border-brand-black transition-all"
          >
            Request a Custom Quote
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
