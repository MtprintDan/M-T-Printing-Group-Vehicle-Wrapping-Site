"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mike Reston",
    company: "Reston HVAC Services",
    role: "Owner",
    quote:
      "M&T wrapped all 8 of our Sprinters in under two weeks. The quality is outstanding and we've seen a 30% increase in inbound calls just from driving around.",
    rating: 5,
    fleet: "8 Vehicles",
    accentColor: "#00AEEF",
  },
  {
    name: "Sarah Kowalski",
    company: "GreenEdge Landscaping",
    role: "Operations Manager",
    quote:
      "We went from plain white vans to a fully branded fleet that looks like a national company. The turnaround was fast and the design team nailed our brand.",
    rating: 5,
    fleet: "12 Vehicles",
    accentColor: "#EC008C",
  },
  {
    name: "James Thornton",
    company: "Thornton Electric",
    role: "CEO",
    quote:
      "Incredible attention to detail. Our trucks look sharp and professional. M&T handled the full wrap on 5 vehicles — priced right and delivered on time.",
    rating: 5,
    fleet: "5 Vehicles",
    accentColor: "#FFD700",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-3">
            Client Results
          </p>
          <h2 className="text-4xl font-black text-brand-black mb-4">
            Fleets that turned heads
          </h2>
          <p className="text-gray-500 text-lg font-light">
            Real results from real fleet operators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow bg-white"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} fill={t.accentColor} stroke="none" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-gray-700 text-base leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                  style={{ backgroundColor: t.accentColor }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm text-brand-black">{t.name}</p>
                  <p className="text-xs text-gray-400">
                    {t.role}, {t.company}
                  </p>
                </div>
                <div className="ml-auto">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${t.accentColor}15`, color: t.accentColor }}
                  >
                    {t.fleet}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
