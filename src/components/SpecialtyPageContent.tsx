"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Eye, Hammer, Paintbrush, Users, Check } from "lucide-react";

const services = [
  {
    id: "wall-graphics",
    icon: Layers,
    title: "Murals / Wall Graphics",
    color: "#F97316",
    tagline: "Brand your space, not just your vehicles",
    description:
      "Large-format wall murals and graphic installations for warehouses, showrooms, offices, retail environments, and trade show displays. Interior or exterior — any scale.",
    features: [
      "Interior and exterior applications",
      "Repositionable and permanent options",
      "Custom sizing to any wall dimension",
      "Brick, drywall, and glass-compatible",
      "Trade show display systems",
      "Retail and event branding",
    ],
  },
  {
    id: "window-graphics",
    icon: Eye,
    title: "Window Graphics & Perf",
    color: "#F97316",
    tagline: "One-way vision advertising",
    description:
      "Perforated vinyl window film lets you advertise on vehicle windows, storefront glass, and commercial glazing without blocking visibility from the inside. Full-colour, UV-blocking output.",
    features: [
      "Vehicle rear and side windows",
      "Storefront and office glass",
      "50/50 and 60/40 perf options",
      "Full-colour print output",
      "UV-blocking properties",
      "Indoor and outdoor durability",
    ],
  },
  {
    id: "fleet-bundles",
    icon: Users,
    title: "Fleet Bundles",
    color: "#0A0A0A",
    tagline: "Consistent branding across your entire fleet",
    description:
      "Volume pricing and coordinated branding programs for commercial fleets of any size. From 2 vehicles to 200, we ensure consistent, on-brand graphics with streamlined scheduling and fleet management.",
    features: [
      "Volume pricing discounts",
      "Fleet consistency guarantee",
      "Phased scheduling available",
      "Centralized project management",
      "All vehicle types accepted",
      "Multi-location coordination",
    ],
  },
  {
    id: "installation",
    icon: Hammer,
    title: "Installation Only",
    color: "#0A0A0A",
    tagline: "Already have the vinyl? We'll apply it perfectly",
    description:
      "Certified 3M and Avery installers available for supply-only projects. We apply your pre-printed vinyl with the same precision and warranty as our full-service wraps.",
    features: [
      "3M and Avery certified technicians",
      "All vehicle types accepted",
      "Heated installation bay",
      "Post-install inspection",
      "Labour warranty included",
      "Same-week slots available",
    ],
  },
  {
    id: "design",
    icon: Paintbrush,
    title: "Graphic Design",
    color: "#0A0A0A",
    tagline: "From concept to print-ready files",
    description:
      "Our in-house design team creates everything from vehicle layout concepts to full brand identity systems. All files delivered print-ready with unlimited revisions until you're satisfied.",
    features: [
      "Vehicle wrap layout and design",
      "Logo design and brand identity",
      "Print-ready file delivery",
      "Unlimited revision rounds",
      "3D vehicle renders available",
      "Rush turnaround available",
    ],
  },
];

export default function SpecialtyPageContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mb-16"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[#F97316] mb-3">
          Specialty Services
        </p>
        <h1 className="text-5xl font-black text-brand-black mb-4 leading-tight">
          Not Just Vehicle Graphics
        </h1>
        <p className="text-gray-500 text-lg font-light">
          M&amp;T&apos;s experienced graphics and installation team specializes in far more than just vehicle graphics. From custom branding solutions to large scale visual projects, we have the expertise to tailor every project to meet the unique needs of you and your business.
        </p>
      </motion.div>

      {/* Service blocks */}
      <div className="space-y-8">
        {services.map((svc, i) => {
          const isBlack = svc.color === "#0A0A0A";
          const isOrange = svc.color === "#F97316";
          return (
            <motion.div
              key={svc.id}
              id={svc.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl border border-gray-100 overflow-hidden bg-white shadow-sm"
            >
              <div className="h-1.5" style={{ backgroundColor: svc.color }} />
              <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left */}
                <div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: isBlack ? "#0A0A0A15" : `${svc.color}15` }}
                  >
                    <svc.icon size={24} style={{ color: isBlack ? "#fff" : svc.color }} />
                  </div>
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: isBlack ? "#374151" : svc.color }}
                  >
                    {svc.tagline}
                  </p>
                  <h2 className="text-3xl font-black text-brand-black mb-3">{svc.title}</h2>
                  <p className="text-gray-500 leading-relaxed mb-6">{svc.description}</p>
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full text-white transition-all group"
                    style={{ backgroundColor: svc.color }}
                  >
                    Get a Quote
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                {/* Right — features */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">What&apos;s included</p>
                  <ul className="space-y-3">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ backgroundColor: svc.color }}
                        >
                          <Check size={11} className="text-white" />
                        </div>
                        <span className="text-sm text-gray-700">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 rounded-2xl bg-brand-black text-white p-10 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#00AEEF]" />
          <div className="flex-1 bg-[#EC008C]" />
          <div className="flex-1 bg-[#FFD700]" />
          <div className="flex-1 bg-white opacity-20" />
        </div>
        <h2 className="text-3xl font-black mb-3">Not sure which service you need?</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Describe your project and we&apos;ll recommend the right approach and send a custom estimate.
        </p>
        <Link
          href="/quote"
          className="inline-flex items-center gap-2 bg-white text-brand-black font-bold text-sm px-7 py-3.5 rounded-full hover:bg-gray-100 transition-all group"
        >
          Start Your Project
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  );
}
