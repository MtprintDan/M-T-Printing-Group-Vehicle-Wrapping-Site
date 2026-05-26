"use client";

import { motion } from "framer-motion";
import { Layers, Zap, Shield, Truck } from "lucide-react";

const services = [
  {
    icon: Zap,
    color: "#00AEEF",
    title: "Starter Package",
    description:
      "Logo, lettering, and key branding elements. Perfect for small fleets getting started with vehicle marketing.",
    price: "From $650",
  },
  {
    icon: Layers,
    color: "#EC008C",
    title: "Partial Wrap",
    description:
      "Covers 40–60% of the vehicle surface. Maximum brand impact while maintaining a professional clean look.",
    price: "From $1,800",
  },
  {
    icon: Shield,
    color: "#FFD700",
    title: "Full Wrap",
    description:
      "Complete vehicle coverage using premium 3M or Avery vinyl. Total transformation, head-turning results.",
    price: "From $3,200",
  },
  {
    icon: Truck,
    color: "#0A0A0A",
    title: "Fleet Programs",
    description:
      "Consistent branding across your entire fleet. Volume discounts, priority scheduling, and dedicated account management.",
    price: "Custom Pricing",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
            What We Offer
          </p>
          <h2 className="text-4xl font-black text-brand-black leading-tight mb-4">
            Wrap packages for every fleet size
          </h2>
          <p className="text-gray-500 text-lg font-light">
            From single-vehicle starter kits to enterprise fleet programs — we cover it all.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-7 rounded-2xl border border-gray-100 hover:border-gray-200 bg-white hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <Icon size={22} style={{ color: service.color }} />
                </div>
                <h3 className="font-bold text-lg text-brand-black mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
                <p className="text-sm font-bold text-brand-black">{service.price}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
