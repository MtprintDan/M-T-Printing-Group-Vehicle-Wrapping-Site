"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Truck } from "lucide-react";

const services = [
  {
    slug: "base-decal",
    imageSrc: "/packages/Basepackage.png",
    fallbackSrc: "/trucks/low-coverage.jpg",
    imageAlt: "Base Decal Package",
    color: "#00AEEF",
    title: "Base Decal Package",
    description:
      "Logo, lettering, and key branding elements. Perfect for getting your fleet professionally branded fast.",
    price: "From $699",
  },
  {
    slug: "partial-wrap",
    imageSrc: "/packages/Partialwrap.png",
    fallbackSrc: "/trucks/middle-coverage.jpg",
    imageAlt: "Partial Wrap Package",
    color: "#EC008C",
    title: "Partial Wrap",
    description:
      "Covers 40–60% of the vehicle surface. Maximum brand impact while maintaining a clean professional look.",
    price: "From $1,800",
  },
  {
    slug: "full-wrap",
    imageSrc: "/packages/Fullwrap.png",
    fallbackSrc: "/trucks/full-coverage.jpg",
    imageAlt: "Full Wrap Package",
    color: "#FFD700",
    title: "Full Wrap",
    description:
      "Complete vehicle coverage using premium 3M or Avery vinyl. Total transformation, head-turning results.",
    price: "From $3,200",
  },
  {
    slug: "fleet-programs",
    imageSrc: "/packages/Mtfleet.png",
    fallbackSrc: null,
    imageAlt: "Fleet Programs",
    color: "#0A0A0A",
    title: "Fleet Programs",
    description:
      "Consistent branding across your entire fleet. Volume discounts, priority scheduling, dedicated management.",
    price: "Custom Pricing",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header — centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
            What We Offer
          </p>
          <h2 className="text-4xl font-black text-brand-black leading-tight mb-4">
            Wrap packages for every fleet size
          </h2>
          <p className="text-gray-500 text-lg font-light">
            From single vehicle starter kits to enterprise fleet programs, we cover it all big or small.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const isYellow = service.color === "#FFD700";
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/packages/${service.slug}`}
                  className="group block rounded-2xl border border-gray-100 hover:border-gray-200 bg-white hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* Truck image */}
                  <div className="relative w-full h-44 bg-gray-50 overflow-hidden">
                    {service.imageSrc || service.fallbackSrc ? (
                      <Image
                        src={service.imageSrc || service.fallbackSrc!}
                        alt={service.imageAlt}
                        fill
                        className="object-cover object-[center_60%] group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        onError={(e) => {
                          // If package image fails, Next.js will show nothing — fallback handled gracefully
                          const target = e.target as HTMLImageElement;
                          if (service.fallbackSrc && target.src !== service.fallbackSrc) {
                            target.src = service.fallbackSrc;
                          }
                        }}
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                        style={{ backgroundColor: `${service.color}08` }}
                      >
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center"
                          style={{ backgroundColor: `${service.color}18` }}
                        >
                          <Truck size={28} style={{ color: service.color }} />
                        </div>
                      </div>
                    )}

                    {/* Color bar */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                      style={{ backgroundColor: service.color }}
                    />

                    {/* Arrow on hover */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                      <ArrowRight size={14} className="text-brand-black" />
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-6">
                    <div
                      className="text-[10px] font-bold uppercase tracking-widest mb-2"
                      style={{ color: isYellow ? "#9a7c00" : service.color }}
                    >
                      {service.title}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-brand-black">{service.price}</p>
                      <span className="text-xs text-gray-400 group-hover:text-brand-black transition-colors flex items-center gap-1">
                        Details <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
