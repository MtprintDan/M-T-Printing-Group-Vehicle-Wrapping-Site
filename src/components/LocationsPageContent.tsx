"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ExternalLink, Clock } from "lucide-react";

/* ── Location data ──────────────────────────────────────────────── */
const locations = [
  {
    num: "01",
    city: "Guelph",
    address: "21 Malcolm Road",
    province: "Ontario",
    color: "#00AEEF",
    textOnColor: "#ffffff",
    // Approximate position on the SVG map (left%, top%)
    dot: { left: "55%", top: "65%" },
  },
  {
    num: "02",
    city: "Waterloo",
    address: "675 Davenport Ave",
    province: "Ontario",
    color: "#EC008C",
    textOnColor: "#ffffff",
    dot: { left: "45%", top: "62%" },
  },
  {
    num: "03",
    city: "Goderich",
    address: "413 Huron Rd",
    province: "Ontario",
    color: "#FFD700",
    textOnColor: "#0A0A0A",
    dot: { left: "30%", top: "55%" },
  },
  {
    num: "04",
    city: "London",
    address: "1074 Dearness Dr",
    province: "Ontario",
    color: "#0A0A0A",
    textOnColor: "#ffffff",
    dot: { left: "38%", top: "72%" },
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function LocationsPageContent() {
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#00AEEF] mb-4"
          >
            Our Locations
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="text-5xl sm:text-6xl font-black text-brand-black tracking-tight leading-[1.05] mb-6 max-w-3xl"
          >
            Serving Ontario&apos;s Commercial Fleet Operators
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-gray-500 text-lg font-light max-w-2xl"
          >
            With 4 locations across southern Ontario, professional fleet branding
            and vehicle wrapping is always close to home — or the job site.
          </motion.p>
        </div>
      </section>

      {/* ── Location Cards ─────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {locations.map((loc, i) => {
              const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
                `${loc.address}, ${loc.city}, ${loc.province}`
              )}`;
              const isYellow = loc.color === "#FFD700";

              return (
                <motion.div
                  key={loc.city}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="group rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col"
                >
                  {/* CMYK top color bar */}
                  <div
                    className="h-2 w-full"
                    style={{ backgroundColor: loc.color }}
                  />

                  <div className="p-7 flex flex-col flex-1">
                    {/* Location number badge */}
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className="text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: `${loc.color}18`,
                          color: isYellow ? "#9a7c00" : loc.color,
                        }}
                      >
                        Location {loc.num}
                      </span>
                      <MapPin
                        size={16}
                        className="text-gray-300 group-hover:text-gray-400 transition-colors mt-0.5"
                      />
                    </div>

                    {/* City name */}
                    <h2
                      className="text-4xl font-black tracking-tight leading-none mb-2"
                      style={{ color: isYellow ? "#9a7c00" : loc.color }}
                    >
                      {loc.city}
                    </h2>

                    {/* Address */}
                    <p className="text-sm text-gray-500 mb-1">
                      {loc.address}
                    </p>
                    <p className="text-sm text-gray-400 mb-6">
                      {loc.city}, {loc.province}
                    </p>

                    {/* Google Maps link */}
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider hover:opacity-70 transition-opacity"
                      style={{ color: isYellow ? "#9a7c00" : loc.color }}
                    >
                      <ExternalLink size={12} />
                      Get Directions
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SVG Map Placeholder ──────────────────────────────────────── */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/60 border border-gray-200 rounded-2xl h-64 overflow-hidden"
          >
            {/* Background label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-gray-200 text-3xl font-black uppercase tracking-[0.3em] select-none">
                Ontario, Canada
              </span>
            </div>

            {/* Grid overlay */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,174,239,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,239,0.06) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {/* Animated dot markers */}
            {locations.map((loc, i) => (
              <div
                key={loc.city}
                className="absolute"
                style={{ left: loc.dot.left, top: loc.dot.top }}
                onMouseEnter={() => setHoveredDot(i)}
                onMouseLeave={() => setHoveredDot(null)}
              >
                {/* Pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                  className="absolute -inset-3 rounded-full"
                  style={{ backgroundColor: loc.color }}
                />

                {/* Dot */}
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                  className="relative w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer -translate-x-2 -translate-y-2"
                  style={{ backgroundColor: loc.color }}
                />

                {/* Tooltip */}
                {hoveredDot === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-10 pointer-events-none"
                  >
                    <div className="bg-brand-black text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                      <p className="font-bold">{loc.city}</p>
                      <p className="text-gray-400">{loc.address}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Bottom note ──────────────────────────────────────────────── */}
      <section className="py-10 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center gap-3">
          <Clock size={15} className="text-gray-400 shrink-0" />
          <p className="text-sm text-gray-500 text-center sm:text-left">
            All locations available{" "}
            <span className="font-semibold text-brand-black">
              Monday–Friday 8:30am–5pm
            </span>
            . Contact us to schedule an appointment.
          </p>
        </div>
      </section>
    </>
  );
}
