"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";

type VehicleCategory = "small" | "medium" | "large" | "truck_trailer";

const categoryInfo: Record<VehicleCategory, { label: string; description: string; examples: string }> = {
  small: {
    label: "Small Vehicle",
    description: "Compact cars, small/mid-size sedans and SUVs up to Toyota RAV4 class",
    examples: "Civic, Corolla, Camry, RAV4, CR-V, Tucson, Equinox",
  },
  medium: {
    label: "Medium Van",
    description: "Full-size SUVs, pickup trucks, cargo vans and transit vans up to Sprinter class",
    examples: "Ford Transit, Mercedes Sprinter, F-150, Explorer, Silverado 1500, ProMaster",
  },
  large: {
    label: "Large Van / Truck",
    description: "Box trucks and large commercial vehicles larger than a Mercedes Sprinter",
    examples: "Isuzu NPR, Ford F-650, Hino 155, Mitsubishi FUSO, Cube Van 26'",
  },
  truck_trailer: {
    label: "Truck + Trailer",
    description: "Semi-trucks, tractor-trailers, and flatbed combinations",
    examples: "Freightliner Cascadia, Kenworth T680, Volvo VNL, Mack Anthem",
  },
};

/* ─── Vehicle database ───────────────────────────────────────────────
   Classification rules:
     small        = compact to mid-size (≤ RAV4)
     medium       = larger than RAV4 up to/including Sprinter-class vans
     large        = larger than Sprinter (box trucks, heavy commercial)
     truck_trailer = semis / tractor-trailer combos
──────────────────────────────────────────────────────────────────── */
const vehicles: { make: string; model: string; category: VehicleCategory }[] = [
  // ── Small ───────────────────────────────────────────────────────
  { make: "Honda", model: "Civic", category: "small" },
  { make: "Honda", model: "Accord", category: "small" },
  { make: "Honda", model: "CR-V", category: "small" },
  { make: "Honda", model: "HR-V", category: "small" },
  { make: "Honda", model: "Fit", category: "small" },
  { make: "Toyota", model: "Corolla", category: "small" },
  { make: "Toyota", model: "Camry", category: "small" },
  { make: "Toyota", model: "RAV4", category: "small" },
  { make: "Toyota", model: "Yaris", category: "small" },
  { make: "Toyota", model: "Prius", category: "small" },
  { make: "Toyota", model: "C-HR", category: "small" },
  { make: "Ford", model: "Mustang", category: "small" },
  { make: "Ford", model: "Maverick", category: "small" },
  { make: "Ford", model: "Escape", category: "small" },
  { make: "Ford", model: "Transit Connect", category: "small" },
  { make: "Chevrolet", model: "Malibu", category: "small" },
  { make: "Chevrolet", model: "Equinox", category: "small" },
  { make: "Chevrolet", model: "Trax", category: "small" },
  { make: "Chevrolet", model: "Spark", category: "small" },
  { make: "GMC", model: "Terrain", category: "small" },
  { make: "Dodge", model: "Challenger", category: "small" },
  { make: "Dodge", model: "Charger", category: "small" },
  { make: "Jeep", model: "Compass", category: "small" },
  { make: "Jeep", model: "Renegade", category: "small" },
  { make: "Kia", model: "Sportage", category: "small" },
  { make: "Kia", model: "Soul", category: "small" },
  { make: "Kia", model: "Sorento", category: "small" },
  { make: "Hyundai", model: "Elantra", category: "small" },
  { make: "Hyundai", model: "Tucson", category: "small" },
  { make: "Hyundai", model: "Kona", category: "small" },
  { make: "Nissan", model: "Sentra", category: "small" },
  { make: "Nissan", model: "Altima", category: "small" },
  { make: "Nissan", model: "Rogue", category: "small" },
  { make: "Nissan", model: "Kicks", category: "small" },
  { make: "Subaru", model: "Impreza", category: "small" },
  { make: "Subaru", model: "Forester", category: "small" },
  { make: "Subaru", model: "Crosstrek", category: "small" },
  { make: "Mazda", model: "3", category: "small" },
  { make: "Mazda", model: "CX-5", category: "small" },
  { make: "Mazda", model: "CX-30", category: "small" },
  { make: "Tesla", model: "Model 3", category: "small" },
  { make: "Tesla", model: "Model Y", category: "small" },
  { make: "Volkswagen", model: "Jetta", category: "small" },
  { make: "Volkswagen", model: "Golf", category: "small" },
  { make: "Volkswagen", model: "Tiguan", category: "small" },
  { make: "BMW", model: "3 Series", category: "small" },
  { make: "BMW", model: "X3", category: "small" },
  { make: "Mercedes-Benz", model: "C-Class", category: "small" },
  { make: "Mercedes-Benz", model: "GLC", category: "small" },
  { make: "Audi", model: "A4", category: "small" },
  { make: "Audi", model: "Q5", category: "small" },
  // ── Medium (larger than RAV4, up to and including Sprinter) ──────
  { make: "Honda", model: "Pilot", category: "medium" },
  { make: "Honda", model: "Odyssey", category: "medium" },
  { make: "Honda", model: "Ridgeline", category: "medium" },
  { make: "Toyota", model: "Highlander", category: "medium" },
  { make: "Toyota", model: "4Runner", category: "medium" },
  { make: "Toyota", model: "Sequoia", category: "medium" },
  { make: "Toyota", model: "Tacoma", category: "medium" },
  { make: "Toyota", model: "Tundra", category: "medium" },
  { make: "Toyota", model: "Sienna", category: "medium" },
  { make: "Ford", model: "F-150", category: "medium" },
  { make: "Ford", model: "F-250", category: "medium" },
  { make: "Ford", model: "F-350", category: "medium" },
  { make: "Ford", model: "Explorer", category: "medium" },
  { make: "Ford", model: "Expedition", category: "medium" },
  { make: "Ford", model: "Transit 150", category: "medium" },
  { make: "Ford", model: "Transit 250", category: "medium" },
  { make: "Ford", model: "Transit 350", category: "medium" },
  { make: "Ford", model: "Transit", category: "medium" },
  { make: "Ford", model: "E-350", category: "medium" },
  { make: "Chevrolet", model: "Silverado 1500", category: "medium" },
  { make: "Chevrolet", model: "Silverado 2500", category: "medium" },
  { make: "Chevrolet", model: "Silverado 3500", category: "medium" },
  { make: "Chevrolet", model: "Traverse", category: "medium" },
  { make: "Chevrolet", model: "Suburban", category: "medium" },
  { make: "Chevrolet", model: "Tahoe", category: "medium" },
  { make: "Chevrolet", model: "Express 2500", category: "medium" },
  { make: "Chevrolet", model: "Express 3500", category: "medium" },
  { make: "GMC", model: "Sierra 1500", category: "medium" },
  { make: "GMC", model: "Sierra 2500", category: "medium" },
  { make: "GMC", model: "Yukon", category: "medium" },
  { make: "GMC", model: "Canyon", category: "medium" },
  { make: "GMC", model: "Savana 2500", category: "medium" },
  { make: "GMC", model: "Savana 3500", category: "medium" },
  { make: "Ram", model: "1500", category: "medium" },
  { make: "Ram", model: "2500", category: "medium" },
  { make: "Ram", model: "3500", category: "medium" },
  { make: "Ram", model: "ProMaster 1500", category: "medium" },
  { make: "Ram", model: "ProMaster 2500", category: "medium" },
  { make: "Ram", model: "ProMaster 3500", category: "medium" },
  { make: "Ram", model: "ProMaster City", category: "medium" },
  { make: "Mercedes-Benz", model: "Sprinter", category: "medium" },
  { make: "Mercedes-Benz", model: "Sprinter 1500", category: "medium" },
  { make: "Mercedes-Benz", model: "Sprinter 2500", category: "medium" },
  { make: "Mercedes-Benz", model: "Sprinter 3500", category: "medium" },
  { make: "Mercedes-Benz", model: "Metris", category: "medium" },
  { make: "Jeep", model: "Grand Cherokee", category: "medium" },
  { make: "Jeep", model: "Wrangler", category: "medium" },
  { make: "Jeep", model: "Gladiator", category: "medium" },
  { make: "Dodge", model: "Durango", category: "medium" },
  { make: "Dodge", model: "Ram 1500", category: "medium" },
  { make: "Nissan", model: "Frontier", category: "medium" },
  { make: "Nissan", model: "Pathfinder", category: "medium" },
  { make: "Nissan", model: "Armada", category: "medium" },
  { make: "Nissan", model: "NV200", category: "medium" },
  { make: "Nissan", model: "NV2500", category: "medium" },
  { make: "Subaru", model: "Outback", category: "medium" },
  { make: "Volkswagen", model: "Atlas", category: "medium" },
  { make: "Volkswagen", model: "Transporter", category: "medium" },
  { make: "Volkswagen", model: "Crafter", category: "medium" },
  { make: "Tesla", model: "Model X", category: "medium" },
  { make: "Tesla", model: "Cybertruck", category: "medium" },
  { make: "BMW", model: "X5", category: "medium" },
  { make: "BMW", model: "X7", category: "medium" },
  { make: "Mercedes-Benz", model: "GLE", category: "medium" },
  { make: "Mercedes-Benz", model: "GLS", category: "medium" },
  { make: "Land Rover", model: "Defender", category: "medium" },
  { make: "Land Rover", model: "Discovery", category: "medium" },
  // ── Large (larger than Sprinter) ────────────────────────────────
  { make: "Ford", model: "F-450", category: "large" },
  { make: "Ford", model: "F-550", category: "large" },
  { make: "Ford", model: "F-650", category: "large" },
  { make: "Ford", model: "F-750", category: "large" },
  { make: "Isuzu", model: "NPR", category: "large" },
  { make: "Isuzu", model: "NPR-HD", category: "large" },
  { make: "Isuzu", model: "NQR", category: "large" },
  { make: "Isuzu", model: "NRR", category: "large" },
  { make: "Isuzu", model: "FTR", category: "large" },
  { make: "Hino", model: "155", category: "large" },
  { make: "Hino", model: "195", category: "large" },
  { make: "Hino", model: "258", category: "large" },
  { make: "Hino", model: "268", category: "large" },
  { make: "Mitsubishi", model: "FUSO FE", category: "large" },
  { make: "Mitsubishi", model: "FUSO FG", category: "large" },
  { make: "Mitsubishi", model: "FUSO FM", category: "large" },
  { make: "Mercedes-Benz", model: "Sprinter 3500XD", category: "large" },
  { make: "Chevrolet", model: "Silverado 4500", category: "large" },
  { make: "Chevrolet", model: "Silverado 5500", category: "large" },
  { make: "GMC", model: "TopKick", category: "large" },
  { make: "Ram", model: "5500", category: "large" },
  { make: "International", model: "TerraStar", category: "large" },
  { make: "International", model: "MV", category: "large" },
  { make: "International", model: "CV", category: "large" },
  // ── Truck + Trailer ──────────────────────────────────────────────
  { make: "Freightliner", model: "Cascadia", category: "truck_trailer" },
  { make: "Freightliner", model: "Columbia", category: "truck_trailer" },
  { make: "Freightliner", model: "Coronado", category: "truck_trailer" },
  { make: "Freightliner", model: "M2", category: "truck_trailer" },
  { make: "Kenworth", model: "T680", category: "truck_trailer" },
  { make: "Kenworth", model: "T880", category: "truck_trailer" },
  { make: "Kenworth", model: "W900", category: "truck_trailer" },
  { make: "Kenworth", model: "T270", category: "truck_trailer" },
  { make: "Peterbilt", model: "389", category: "truck_trailer" },
  { make: "Peterbilt", model: "579", category: "truck_trailer" },
  { make: "Peterbilt", model: "567", category: "truck_trailer" },
  { make: "Peterbilt", model: "220", category: "truck_trailer" },
  { make: "Volvo", model: "VNL", category: "truck_trailer" },
  { make: "Volvo", model: "VNR", category: "truck_trailer" },
  { make: "Volvo", model: "VHD", category: "truck_trailer" },
  { make: "Mack", model: "Anthem", category: "truck_trailer" },
  { make: "Mack", model: "Pinnacle", category: "truck_trailer" },
  { make: "Mack", model: "Granite", category: "truck_trailer" },
  { make: "International", model: "LT", category: "truck_trailer" },
  { make: "International", model: "LoneStar", category: "truck_trailer" },
  { make: "International", model: "RH", category: "truck_trailer" },
  { make: "Western Star", model: "4900", category: "truck_trailer" },
  { make: "Western Star", model: "5700XE", category: "truck_trailer" },
  { make: "Western Star", model: "49X", category: "truck_trailer" },
];

export default function VehicleSizeSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return vehicles
      .filter((v) => `${v.make} ${v.model}`.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  const primaryCategory: VehicleCategory | null =
    results.length > 0 ? results[0].category : null;
  const allSameCategory =
    results.length > 0 && results.every((r) => r.category === results[0].category);

  return (
    <section className="py-24 bg-brand-light relative overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,174,239,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,174,239,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-black mb-3">
            Vehicle Sizing
          </p>
          <h2 className="text-4xl font-black text-brand-black mb-4">
            What size is your vehicle?
          </h2>
          <p className="text-gray-500 text-lg font-light">
            Type your vehicle make and model to instantly find your size category and see which pricing tier applies.
          </p>
        </motion.div>

        {/* Search box */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Ford Transit, Freightliner Cascadia, Honda CR-V…"
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-white text-brand-black placeholder:text-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-brand-black focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {results.length > 0 ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="max-w-xl mx-auto space-y-5"
            >
              {/* Matched vehicles */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                {results.map((v, i) => {
                  const cat = categoryInfo[v.category];
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between px-5 py-3 border-b border-gray-50 last:border-0"
                    >
                      <span className="text-sm font-medium text-brand-black">
                        {v.make} {v.model}
                      </span>
                      <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full shrink-0 ml-3">
                        {cat.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Category card */}
              {allSameCategory && primaryCategory && (() => {
                const cat = categoryInfo[primaryCategory];
                return (
                  <div className="rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm">
                    <div className="h-1.5 bg-brand-black" />
                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                        Your Size Category
                      </p>
                      <h3 className="text-2xl font-black text-brand-black mb-1">{cat.label}</h3>
                      <p className="text-sm text-gray-500 mb-5">{cat.description}</p>
                      <Link
                        href="/calculator"
                        className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full bg-brand-black text-white transition-all group hover:bg-gray-800"
                      >
                        Price this vehicle
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          ) : (
            <motion.div
              key="guide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {(Object.entries(categoryInfo) as [VehicleCategory, typeof categoryInfo[VehicleCategory]][]).map(([, cat]) => (
                <div key={cat.label} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="h-1 bg-brand-black" />
                  <div className="p-4">
                    <p className="font-black text-sm text-brand-black mb-1">{cat.label}</p>
                    <p className="text-xs text-gray-500 mb-1">{cat.description}</p>
                    <p className="text-xs text-gray-400">{cat.examples}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
