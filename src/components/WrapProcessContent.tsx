"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText,
  Phone,
  Paintbrush,
  Monitor,
  Settings,
  Printer,
  Wrench,
  CheckCircle,
} from "lucide-react";

/* ── Step data ──────────────────────────────────────────────────── */
const CMYK = ["#00AEEF", "#EC008C", "#FFD700", "#0A0A0A"];

const steps = [
  {
    num: "01",
    icon: FileText,
    title: "Quote Request",
    desc: "Submit your project details through our online form or call us directly.",
    bullets: [
      "Vehicle make, model, and year",
      "Desired package or coverage level",
      "Timeline and quantity",
    ],
  },
  {
    num: "02",
    icon: Phone,
    title: "Consultation",
    desc: "A member of our team reviews your submission and reaches out within 1 business day.",
    bullets: [
      "Confirm scope and pricing",
      "Discuss design direction",
      "Schedule design intake",
    ],
  },
  {
    num: "03",
    icon: Paintbrush,
    title: "Design",
    desc: "Our in-house design team creates your custom vehicle layout from scratch.",
    bullets: [
      "Vector artwork preparation",
      "Brand colour matching",
      "Vehicle template mapping",
    ],
  },
  {
    num: "04",
    icon: Monitor,
    title: "Mockup Approval",
    desc: "You receive a digital proof of your wrap applied to a vehicle template.",
    bullets: [
      "Revisions until satisfied",
      "Colour and layout approval",
      "Sign-off before production",
    ],
  },
  {
    num: "05",
    icon: Settings,
    title: "Production",
    desc: "Your approved design is sent to production — printed on premium 3M or Avery vinyl.",
    bullets: [
      "HP Latex or UV flatbed print",
      "Lamination for outdoor durability",
      "Quality inspection",
    ],
  },
  {
    num: "06",
    icon: Printer,
    title: "Printing",
    desc: "Large-format printing with precision colour management.",
    bullets: [
      "Pantone colour matching available",
      "Gloss, matte, or satin laminate",
      "Panel sizing and alignment",
    ],
  },
  {
    num: "07",
    icon: Wrench,
    title: "Installation",
    desc: "Our certified installers apply your wrap in our climate-controlled installation bay.",
    bullets: [
      "3M and Avery certified",
      "Heated bay installation",
      "Post-install inspection",
    ],
  },
  {
    num: "08",
    icon: CheckCircle,
    title: "Final Delivery",
    desc: "Your vehicle is returned clean, branded, and ready to work.",
    bullets: [
      "Walk-through with owner",
      "Care instructions provided",
      "Warranty documentation",
    ],
  },
];

export default function WrapProcessContent() {
  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────── */}
      <section className="py-20 border-b border-gray-100 relative overflow-hidden">
        {/* Subtle blueprint grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,174,239,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,239,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-[0.2em] text-[#00AEEF] mb-4"
          >
            The Wrap Process
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="text-5xl sm:text-6xl font-black text-brand-black tracking-tight leading-[1.05] mb-6"
          >
            Everything you need to know
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-gray-500 text-lg font-light max-w-2xl leading-relaxed"
          >
            A transparent, professional process from first contact to final
            delivery — designed to keep your fleet on brand and on schedule.
          </motion.p>
        </div>
      </section>

      {/* ── Timeline ───────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Vertical connector (desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent -translate-x-1/2" />

            <div className="flex flex-col gap-16">
              {steps.map((step, i) => {
                const Icon = step.icon;
                const color = CMYK[i % CMYK.length];
                const isEven = i % 2 === 0;
                const isYellow = color === "#FFD700";
                const isBlack = color === "#0A0A0A";
                const labelColor = isYellow ? "#9a7c00" : isBlack ? "#666666" : color;

                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
                    className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-8 ${
                      isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Card */}
                    <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                      {/* Accent bar */}
                      <div className="h-1.5 w-full" style={{ backgroundColor: color }} />

                      <div className="p-7 sm:p-8">
                        {/* Icon + step number */}
                        <div className="flex items-center gap-4 mb-5">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${color}18` }}
                          >
                            <Icon
                              size={22}
                              strokeWidth={1.8}
                              style={{ color: labelColor }}
                            />
                          </div>
                          <div>
                            <span
                              className="text-[10px] font-black uppercase tracking-[0.2em]"
                              style={{ color: labelColor }}
                            >
                              Step {step.num}
                            </span>
                            <h3 className="text-xl font-black text-brand-black leading-tight">
                              {step.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed mb-5">
                          {step.desc}
                        </p>

                        {/* Bullet list */}
                        <div>
                          <p
                            className="text-[10px] font-bold uppercase tracking-widest mb-3"
                            style={{ color: labelColor }}
                          >
                            What to expect
                          </p>
                          <ul className="space-y-2">
                            {step.bullets.map((b) => (
                              <li
                                key={b}
                                className="flex items-start gap-2.5 text-sm text-gray-500"
                              >
                                <span
                                  className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                                  style={{ backgroundColor: color }}
                                />
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Centre node (desktop) */}
                    <div className="hidden lg:flex shrink-0 w-14 items-center justify-center z-10">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md"
                        style={{ backgroundColor: color }}
                      >
                        <span
                          className="text-[11px] font-black"
                          style={{ color: isYellow ? "#0A0A0A" : "#ffffff" }}
                        >
                          {step.num}
                        </span>
                      </div>
                    </div>

                    {/* Spacer for opposite side on desktop */}
                    <div className="hidden lg:block flex-1" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Strip ──────────────────────────────────────────────── */}
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
            Ready to start?
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
