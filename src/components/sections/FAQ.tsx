"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How long does a vehicle wrap last?",
    a: "Premium vinyl wraps using 3M or Avery materials typically last 5–10 years outdoors when properly maintained. We use only commercial-grade materials on all installations.",
  },
  {
    q: "Will the wrap damage my vehicle's paint?",
    a: "No. When applied and removed correctly, vinyl wraps actually protect your vehicle's original paint. We recommend paint correction on heavily damaged vehicles before installation.",
  },
  {
    q: "How long does installation take?",
    a: "Starter packages take 2–4 hours. Partial wraps take 4–8 hours. Full wraps take 6–20 hours depending on vehicle size. We'll give you an exact estimate during quoting.",
  },
  {
    q: "Do you offer design services?",
    a: "Yes. We offer everything from basic template layouts (included) to fully custom advanced designs. Our design team specializes in commercial fleet branding and understands what reads well on a moving vehicle.",
  },
  {
    q: "Can I see a mockup before production?",
    a: "Absolutely. We provide a digital proof for approval on all custom design work before we print or install anything. No surprises.",
  },
  {
    q: "Do you offer fleet pricing for multiple vehicles?",
    a: "Yes. Fleet pricing is available for 3+ vehicles with significant per-unit savings. Contact us for a custom fleet quote and dedicated project management.",
  },
  {
    q: "What's the turnaround time?",
    a: "Starter packages: 3–5 business days. Partial wraps: 5–8 days. Full wraps: 7–12 days. Rush options may be available — ask when you request a quote.",
  },
  {
    q: "How do I care for my wrapped vehicle?",
    a: "Hand washing is preferred. Avoid automated brush car washes. Use mild soap and rinse thoroughly. Avoid high-pressure washing directly on edges. We provide full care instructions after installation.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-6 text-left"
      >
        <span className="font-semibold text-brand-black text-base">{q}</span>
        <span className="shrink-0 mt-0.5 text-gray-400">
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-gray-500 text-sm leading-relaxed pb-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
              Got Questions?
            </p>
            <h2 className="text-4xl font-black text-brand-black mb-6 leading-tight">
              Everything you need to know
            </h2>
            <p className="text-gray-500 text-lg font-light mb-8">
              Can&apos;t find your answer? Reach out and we&apos;ll get back to you within one business day.
            </p>
            <a
              href="mailto:info@mtprintinggroup.com"
              className="inline-flex items-center gap-2 bg-brand-black text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
            >
              Contact Us
            </a>
          </motion.div>

          {/* Right — FAQ list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
