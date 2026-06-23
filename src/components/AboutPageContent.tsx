"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  MessageCircle,
  Paintbrush,
  CheckCircle,
  Printer,
  Wrench,
  MapPin,
  ExternalLink,
  Clock,
} from "lucide-react";

/* ── Stat chips ─────────────────────────────────────────────────── */
const stats = [
  { label: "20+ Years", sub: "in vehicle wraps" },
  { label: "11 Locations", sub: "across Ontario" },
  { label: "3M Certified", sub: "installers" },
  { label: "56 Years", sub: "in print" },
];

/* ── Process steps ──────────────────────────────────────────────── */
const steps = [
  {
    num: 1,
    icon: FileText,
    title: "Quote Request",
    desc: "Tell us about your vehicle and branding goals.",
    color: "#00AEEF",
  },
  {
    num: 2,
    icon: MessageCircle,
    title: "Consultation",
    desc: "We review your needs and recommend the right package.",
    color: "#EC008C",
  },
  {
    num: 3,
    icon: Paintbrush,
    title: "Design",
    desc: "Our in-house team creates your custom vehicle layout.",
    color: "#FFD700",
  },
  {
    num: 4,
    icon: CheckCircle,
    title: "Mockup Approval",
    desc: "Review and approve a digital proof before production.",
    color: "#00AEEF",
  },
  {
    num: 5,
    icon: Printer,
    title: "Production & Print",
    desc: "Premium 3M or Avery vinyl printed and laminated.",
    color: "#EC008C",
  },
  {
    num: 6,
    icon: Wrench,
    title: "Installation",
    desc: "Certified installers apply your wrap in our heated bay.",
    color: "#FFD700",
  },
];

/* ── Location data ──────────────────────────────────────────────── */
const locations = [
  {
    num: "01",
    city: "Guelph",
    address: "21 Malcolm Road",
    province: "Ontario",
    color: "#00AEEF",
    dot: { left: "55%", top: "65%" },
  },
  {
    num: "02",
    city: "Waterloo",
    address: "675 Davenport Ave",
    province: "Ontario",
    color: "#EC008C",
    dot: { left: "45%", top: "62%" },
  },
  {
    num: "03",
    city: "Goderich",
    address: "413 Huron Rd",
    province: "Ontario",
    color: "#FFD700",
    dot: { left: "30%", top: "55%" },
  },
  {
    num: "04",
    city: "London",
    address: "1074 Dearness Dr",
    province: "Ontario",
    color: "#0A0A0A",
    dot: { left: "38%", top: "72%" },
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

export default function AboutPageContent() {
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 — Our Group
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,174,239,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,239,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-xs font-bold uppercase tracking-[0.2em] text-[#00AEEF] mb-4"
              >
                Our Group
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="text-5xl sm:text-6xl font-black text-brand-black leading-[1.05] mb-6 tracking-tight"
              >
                The M&amp;T Advantage
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl font-bold text-brand-black mb-6"
              >
                Big or small, we print it all.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-gray-600 text-base leading-relaxed mb-8"
              >
                M&amp;T Printing Group has been one of Ontario&apos;s top print
                providers and a leader in the print on demand industry for more
                than 56 years. From concept and design to printing and delivery,
                our professionally trained experts can help with any requirement
                your business may have. Using the most advanced technology, state
                of the art equipment, and latest software, we are able to provide
                the highest quality products and services, on time and within
                budget. Our innovative print solutions, promotional knowledge, and
                Canada Post expertise can help your company make a lasting
                impression while maximizing your business potential.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <a
                  href="https://mt-printing-group.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#00AEEF] hover:text-cyan-700 transition-colors group"
                >
                  Visit Main Site
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </motion.div>
            </div>

            {/* Right — stat chips */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-1"
                >
                  <span className="text-3xl font-black text-brand-black tracking-tight">
                    {s.label}
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                    {s.sub}
                  </span>
                  {/* CMYK accent bar */}
                  <div className="mt-3 flex gap-0.5">
                    <div className="h-1 flex-1 rounded-full bg-[#00AEEF]" />
                    <div className="h-1 flex-1 rounded-full bg-[#EC008C]" />
                    <div className="h-1 flex-1 rounded-full bg-[#FFD700]" />
                    <div className="h-1 flex-1 rounded-full bg-gray-200" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — The Wrap Process
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#EC008C] mb-4"
            >
              How It Works
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl sm:text-5xl font-black text-brand-black tracking-tight"
            >
              From quote to road in days, not weeks.
            </motion.h2>
          </div>

          {/* Timeline — horizontal desktop / vertical mobile */}
          <div className="relative">
            {/* Connector line (desktop only) */}
            <div className="hidden lg:block absolute top-[52px] left-[calc(100%/12)] right-[calc(100%/12)] h-px bg-gray-200" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const isYellow = step.color === "#FFD700";
                return (
                  <motion.div
                    key={step.num}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="flex flex-col items-center text-center"
                  >
                    {/* Circle */}
                    <div
                      className="relative z-10 w-[52px] h-[52px] rounded-full flex items-center justify-center mb-4 shadow-md"
                      style={{ backgroundColor: step.color }}
                    >
                      <Icon
                        size={22}
                        color={isYellow ? "#0A0A0A" : "#ffffff"}
                        strokeWidth={1.8}
                      />
                      {/* Step number badge */}
                      <span
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white"
                        style={{
                          backgroundColor: isYellow ? "#0A0A0A" : step.color,
                          color: "#ffffff",
                        }}
                      >
                        {step.num}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-brand-black mb-2 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-14"
          >
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-[#EC008C] text-white text-sm font-semibold px-7 py-3.5 rounded-full hover:bg-pink-700 transition-colors shadow-lg shadow-pink-200"
            >
              Start Your Quote
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3 — Locations
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFD700] mb-4"
            >
              Our Locations
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-4xl sm:text-5xl font-black text-brand-black tracking-tight leading-[1.05] mb-4 max-w-3xl"
            >
              Multiple Installation Locations Around Southwest Ontario
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-500 text-lg font-light max-w-2xl"
            >
              With 4 locations across southern Ontario, professional fleet branding
              and vehicle wrapping is always close to home — or the job site.
            </motion.p>
          </div>

          {/* Location Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {locations.map((loc, i) => {
              const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(
                `${loc.address}, ${loc.city}, ${loc.province}`
              )}`;
              const isYellow = loc.color === "#FFD700";
              const isDark = loc.color === "#0A0A0A";

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
                  {/* Color bar */}
                  <div
                    className="h-2 w-full"
                    style={{ backgroundColor: loc.color }}
                  />

                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <span
                        className="text-[10px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: isDark ? "#f3f4f6" : `${loc.color}18`,
                          color: isYellow ? "#9a7c00" : isDark ? "#374151" : loc.color,
                        }}
                      >
                        Location {loc.num}
                      </span>
                      <MapPin
                        size={16}
                        className="text-gray-300 group-hover:text-gray-400 transition-colors mt-0.5"
                      />
                    </div>

                    <h3
                      className="text-4xl font-black tracking-tight leading-none mb-2"
                      style={{ color: isYellow ? "#9a7c00" : isDark ? "#0A0A0A" : loc.color }}
                    >
                      {loc.city}
                    </h3>

                    <p className="text-sm text-gray-500 mb-1">{loc.address}</p>
                    <p className="text-sm text-gray-400 mb-6">
                      {loc.city}, {loc.province}
                    </p>

                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider hover:opacity-70 transition-opacity"
                      style={{ color: isYellow ? "#9a7c00" : isDark ? "#374151" : loc.color }}
                    >
                      <ExternalLink size={12} />
                      Get Directions
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* SVG Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative bg-white/60 border border-gray-200 rounded-2xl h-64 overflow-hidden mb-8"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-gray-200 text-3xl font-black uppercase tracking-[0.3em] select-none">
                Ontario, Canada
              </span>
            </div>

            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,174,239,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,239,0.06) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            {locations.map((loc, i) => (
              <div
                key={loc.city}
                className="absolute"
                style={{ left: loc.dot.left, top: loc.dot.top }}
                onMouseEnter={() => setHoveredDot(i)}
                onMouseLeave={() => setHoveredDot(null)}
              >
                <motion.div
                  animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                  className="absolute -inset-3 rounded-full"
                  style={{ backgroundColor: loc.color }}
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                  className="relative w-4 h-4 rounded-full border-2 border-white shadow-lg cursor-pointer -translate-x-2 -translate-y-2"
                  style={{ backgroundColor: loc.color }}
                />
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

          {/* Hours note */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Clock size={15} className="text-gray-400 shrink-0" />
            <p className="text-sm text-gray-500 text-center sm:text-left">
              All locations available{" "}
              <span className="font-semibold text-brand-black">
                Monday–Friday 8:30am–5pm
              </span>
              . Contact us to schedule an appointment.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CTA STRIP
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-brand-black relative overflow-hidden">
        {/* CMYK top bar */}
        <div className="flex h-1.5">
          <div className="flex-1 bg-[#00AEEF]" />
          <div className="flex-1 bg-[#EC008C]" />
          <div className="flex-1 bg-[#FFD700]" />
          <div className="flex-1 bg-white/20" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#00AEEF] mb-4"
          >
            Ready to brand your fleet?
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-10"
          >
            Ready to brand your fleet?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 bg-[#00AEEF] text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-cyan-500 transition-colors"
            >
              Build Your Wrap
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 bg-white/10 text-white text-sm font-semibold px-8 py-3.5 rounded-full hover:bg-white/20 transition-colors border border-white/20"
            >
              Request a Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
