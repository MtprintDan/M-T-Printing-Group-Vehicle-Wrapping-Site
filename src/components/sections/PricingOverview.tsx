"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    tagline: "Get on the road branded",
    startingAt: 650,
    color: "#00AEEF",
    features: [
      "Logo & company name",
      "Door lettering",
      "Phone/website",
      "Basic layout included",
      "2–4 hr install",
    ],
    vehicles: [
      { label: "Small Vehicle", price: "$650" },
      { label: "Medium Van", price: "$950" },
      { label: "Large Van/Truck", price: "$1,250" },
      { label: "Truck + Trailer", price: "$1,650" },
    ],
    popular: false,
  },
  {
    name: "Partial Wrap",
    tagline: "Maximum visibility, half coverage",
    startingAt: 1800,
    color: "#EC008C",
    features: [
      "40–60% vehicle coverage",
      "Custom graphic design",
      "Premium vinyl",
      "4–8 hr install",
      "5–8 day turnaround",
    ],
    vehicles: [
      { label: "Small Vehicle", price: "$1,800" },
      { label: "Medium Van", price: "$2,600" },
      { label: "Large Van/Truck", price: "$3,400" },
      { label: "Truck + Trailer", price: "$4,800" },
    ],
    popular: true,
  },
  {
    name: "Full Wrap",
    tagline: "Total transformation",
    startingAt: 3200,
    color: "#0A0A0A",
    features: [
      "100% vehicle coverage",
      "Advanced custom design",
      "3M / Avery premium vinyl",
      "6–14 hr install",
      "7–12 day turnaround",
    ],
    vehicles: [
      { label: "Small Vehicle", price: "$3,200" },
      { label: "Medium Van", price: "$4,200" },
      { label: "Large Van/Truck", price: "$5,500" },
      { label: "Truck + Trailer", price: "$7,800" },
    ],
    popular: false,
  },
];

export default function PricingOverview() {
  return (
    <section id="pricing" className="py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#EC008C] mb-3">
            Transparent Pricing
          </p>
          <h2 className="text-4xl font-black text-brand-black mb-4">
            No surprises. Just results.
          </h2>
          <p className="text-gray-500 text-lg font-light">
            Use our live calculator to build an exact quote based on your vehicle and requirements.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.popular
                  ? "bg-brand-black text-white shadow-2xl scale-[1.02]"
                  : "bg-white border border-gray-100 shadow-sm"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00AEEF] via-[#EC008C] to-[#FFD700]" />
              )}
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-[#EC008C] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <div
                  className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: plan.popular ? "#EC008C" : plan.color }}
                >
                  {plan.name}
                </div>
                <p className={`text-sm mb-4 ${plan.popular ? "text-gray-400" : "text-gray-500"}`}>
                  {plan.tagline}
                </p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-sm font-medium text-gray-400">From</span>
                  <span className={`text-4xl font-black ${plan.popular ? "text-white" : "text-brand-black"}`}>
                    ${plan.startingAt.toLocaleString()}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm">
                      <Check
                        size={14}
                        className="shrink-0"
                        style={{ color: plan.popular ? "#00AEEF" : plan.color }}
                      />
                      <span className={plan.popular ? "text-gray-300" : "text-gray-600"}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* Vehicle prices */}
                <div
                  className={`rounded-xl p-4 mb-6 ${
                    plan.popular ? "bg-white/5" : "bg-gray-50"
                  }`}
                >
                  {plan.vehicles.map((v) => (
                    <div
                      key={v.label}
                      className="flex justify-between items-center py-1.5 text-sm"
                    >
                      <span className={plan.popular ? "text-gray-400" : "text-gray-500"}>
                        {v.label}
                      </span>
                      <span className={`font-bold ${plan.popular ? "text-white" : "text-brand-black"}`}>
                        {v.price}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/calculator"
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    plan.popular
                      ? "bg-[#EC008C] text-white hover:bg-[#D0007D]"
                      : "bg-brand-black text-white hover:bg-gray-800"
                  }`}
                >
                  Build Quote <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-gray-400 mt-8"
        >
          All prices are estimates. Final pricing depends on vehicle condition, design complexity, and add-ons.
        </motion.p>
      </div>
    </section>
  );
}
