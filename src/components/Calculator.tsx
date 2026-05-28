"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, ChevronRight, ChevronLeft, ArrowRight,
  Clock, Calendar, Plus, Minus, Car, Truck,
  Package, Paintbrush, ClipboardList, ChevronDown, Ruler,
} from "lucide-react";

const LOADING_MESSAGES = [
  "Vectorizing Graphics…",
  "Printing Decals…",
  "Laminating Vinyl…",
  "Cutting Decals…",
  "Prepping Surfaces…",
  "Grabbing a Coffee…",
];

/* ── CMYK Wave Background ─────────────────────────────────────── */
function CmykWaves({ step }: { step: number }) {
  const colors = ["#00AEEF", "#EC008C", "#FFD700", "#0A0A0A"];
  const c0 = colors[step % 4];
  const c1 = colors[(step + 1) % 4];
  const c2 = colors[(step + 2) % 4];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Large bottom wave */}
      <svg className="absolute -bottom-8 left-0 right-0 w-full cmyk-wave-bg" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="none">
        <path d="M0 130 C200 70 400 170 600 110 C800 50 1000 150 1200 90 L1200 200 L0 200 Z" fill={c0} opacity="0.07" />
        <path d="M0 155 C300 110 600 175 900 130 C1050 105 1150 145 1200 135 L1200 200 L0 200 Z" fill={c1} opacity="0.05" />
      </svg>
      {/* Top right wave */}
      <svg className="absolute -top-8 right-0 w-2/3 cmyk-wave-bg-2" viewBox="0 0 800 160" preserveAspectRatio="none" fill="none">
        <path d="M800 70 C650 25 500 110 350 60 C200 10 100 85 0 45 L0 0 L800 0 Z" fill={c2} opacity="0.06" />
      </svg>
      {/* Center ellipse */}
      <svg className="absolute top-1/3 -left-16 w-1/2 cmyk-wave-bg-3" viewBox="0 0 600 200" preserveAspectRatio="none" fill="none">
        <ellipse cx="300" cy="100" rx="300" ry="80" fill={c0} opacity="0.04" />
      </svg>
      {/* Floating blobs */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], x: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
        style={{ background: `radial-gradient(circle, ${c0}18 0%, transparent 70%)` }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, -15, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full"
        style={{ background: `radial-gradient(circle, ${c1}15 0%, transparent 70%)` }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full"
        style={{ background: `radial-gradient(circle, ${c2}10 0%, transparent 70%)` }}
      />
    </div>
  );
}

/* ── Sprinter Loading SVG ─────────────────────────────────────── */
function SprinterLoadingSVG() {
  return (
    <svg viewBox="0 0 500 170" className="w-full" fill="none">
      {/* Shadow */}
      <ellipse cx="255" cy="162" rx="195" ry="6" fill="rgba(0,0,0,0.05)" />

      {/* === BODY OUTLINE — 2018 Mercedes-Benz Sprinter High Roof === */}
      {/* Cargo area (tall rectangular section) */}
      <path
        d="M 120,155 L 120,22 L 485,22 L 485,155 Z"
        fill="#f0f9ff"
        stroke="#e2e8f0"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Cab section (lower profile) */}
      <path
        d="M 18,155 L 18,96 L 30,70 L 48,50 L 64,42 L 120,42 L 120,155 Z"
        fill="#e8f4fb"
        stroke="#e2e8f0"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Roofline step: cab (y=42) rises to cargo (y=22) */}
      <path
        d="M 64,42 L 120,42 L 120,22"
        stroke="#e2e8f0"
        strokeWidth="1.8"
        fill="none"
        strokeLinejoin="round"
      />
      {/* Cab-to-cargo upper transition curve */}
      <path
        d="M 120,22 Q 110,22 104,30 Q 98,38 98,42 L 120,42"
        fill="#d8edf5"
        stroke="#b8d4e6"
        strokeWidth="1.2"
      />

      {/* Windshield — nearly vertical Sprinter style */}
      <path
        d="M 48,52 L 48,96 L 116,96 L 116,43 L 68,43 Z"
        fill="#b8dff5"
        stroke="#7ec8e8"
        strokeWidth="1.2"
        opacity="0.8"
      />

      {/* Side windows — cargo section */}
      <rect x="132" y="30" width="70" height="52" rx="4" fill="#b8dff5" stroke="#7ec8e8" strokeWidth="1.2" opacity="0.8" />
      <rect x="216" y="30" width="70" height="52" rx="4" fill="#b8dff5" stroke="#7ec8e8" strokeWidth="1.2" opacity="0.8" />

      {/* Rear quarter window panel */}
      <rect x="442" y="30" width="38" height="52" rx="3" fill="#b8dff5" stroke="#7ec8e8" strokeWidth="1" opacity="0.7" />

      {/* Sliding door line */}
      <line x1="120" y1="22" x2="120" y2="155" stroke="#94c8e4" strokeWidth="1" strokeDasharray="5,3" />
      {/* Rear door lines */}
      <line x1="360" y1="22" x2="360" y2="155" stroke="#94c8e4" strokeWidth="1" strokeDasharray="4,3" />
      <line x1="440" y1="22" x2="440" y2="155" stroke="#94c8e4" strokeWidth="1.2" />
      <line x1="462" y1="22" x2="462" y2="155" stroke="#94c8e4" strokeWidth="1" strokeDasharray="3,3" />

      {/* Headlights — Sprinter has wrap-around DRL style */}
      <path d="M 20,68 L 20,88 L 46,88 L 46,68 Z" fill="#fefce8" stroke="#94c8e4" strokeWidth="1" rx="2" />
      <path d="M 22,56 L 22,66 L 42,66 L 42,56 Z" fill="#dbeafe" stroke="#94c8e4" strokeWidth="0.8" rx="1" opacity="0.9" />

      {/* Front bumper / fascia */}
      <path d="M 14,100 L 14,155 L 26,155 L 26,100 Z" fill="#d0e8f4" stroke="#94c8e4" strokeWidth="1" />
      <rect x="16" y="108" width="8" height="3" rx="1" fill="#7ec8e8" opacity="0.5" />
      <rect x="16" y="116" width="8" height="3" rx="1" fill="#7ec8e8" opacity="0.5" />
      <rect x="16" y="124" width="8" height="3" rx="1" fill="#7ec8e8" opacity="0.5" />

      {/* Sprinter grille badge (star area - front center) */}
      <circle cx="22" cy="92" r="5" fill="#f0f9ff" stroke="#7ec8e8" strokeWidth="0.8" opacity="0.8" />
      <line x1="22" y1="88" x2="22" y2="96" stroke="#7ec8e8" strokeWidth="0.7" opacity="0.6" />
      <line x1="18" y1="94" x2="26" y2="90" stroke="#7ec8e8" strokeWidth="0.7" opacity="0.6" />
      <line x1="18" y1="90" x2="26" y2="94" stroke="#7ec8e8" strokeWidth="0.7" opacity="0.6" />

      {/* CMYK animated wrap fill */}
      <defs>
        <linearGradient id="sprGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#00AEEF" stopOpacity="0.65" />
          <stop offset="40%"  stopColor="#EC008C" stopOpacity="0.60" />
          <stop offset="80%"  stopColor="#FFD700" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#00AEEF" stopOpacity="0.30" />
        </linearGradient>
        <clipPath id="sprClip">
          <motion.rect
            x={0} y={0} height={170}
            initial={{ width: 0 }}
            animate={{ width: 500 }}
            transition={{ duration: 4.8, ease: "easeInOut" }}
          />
        </clipPath>
      </defs>
      {/* Fill over entire cargo body */}
      <rect x="14" y="22" width="471" height="133" fill="url(#sprGrad)" clipPath="url(#sprClip)" opacity="0.9" />

      {/* Wheel wells */}
      <path d="M 68,155 Q 68,132 96,132 Q 124,132 124,155" fill="#dbeafa" stroke="#94c8e4" strokeWidth="1.2" />
      <path d="M 340,155 Q 340,132 368,132 Q 396,132 396,155" fill="#dbeafa" stroke="#94c8e4" strokeWidth="1.2" />

      {/* Front wheel */}
      <circle cx="96" cy="157" r="22" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <circle cx="96" cy="157" r="14" fill="#253347" />
      <circle cx="96" cy="157" r="7"  fill="#334155" />
      <circle cx="96" cy="157" r="3"  fill="#64748b" />
      {[0,60,120,180,240,300].map((deg) => (
        <line key={`fw${deg}`}
          x1={96 + Math.cos(deg * Math.PI / 180) * 7}
          y1={157 + Math.sin(deg * Math.PI / 180) * 7}
          x2={96 + Math.cos(deg * Math.PI / 180) * 14}
          y2={157 + Math.sin(deg * Math.PI / 180) * 14}
          stroke="#475569" strokeWidth="2" />
      ))}

      {/* Rear wheel */}
      <circle cx="368" cy="157" r="22" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
      <circle cx="368" cy="157" r="14" fill="#253347" />
      <circle cx="368" cy="157" r="7"  fill="#334155" />
      <circle cx="368" cy="157" r="3"  fill="#64748b" />
      {[0,60,120,180,240,300].map((deg) => (
        <line key={`rw${deg}`}
          x1={368 + Math.cos(deg * Math.PI / 180) * 7}
          y1={157 + Math.sin(deg * Math.PI / 180) * 7}
          x2={368 + Math.cos(deg * Math.PI / 180) * 14}
          y2={157 + Math.sin(deg * Math.PI / 180) * 14}
          stroke="#475569" strokeWidth="2" />
      ))}

      {/* Door handle details */}
      <rect x="108" y="110" width="9" height="3" rx="1.5" fill="#7ec8e8" opacity="0.7" />
      <rect x="330" y="110" width="9" height="3" rx="1.5" fill="#7ec8e8" opacity="0.7" />

      {/* Roof rack */}
      <line x1="120" y1="22" x2="440" y2="22" stroke="#7ec8e8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WrapLoadingScreen({ onDone }: { onDone: () => void }) {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length), 833);
    const timer = setTimeout(onDone, 5000);
    return () => { clearInterval(interval); clearTimeout(timer); };
  }, [onDone]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-8 px-4 pt-[144px]">
      <div className="w-72 sm:w-[420px]">
        <SprinterLoadingSVG />
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={msgIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="text-sm font-semibold text-gray-500 uppercase tracking-widest"
        >
          {LOADING_MESSAGES[msgIndex]}
        </motion.p>
      </AnimatePresence>

      <div className="w-48 h-0.5 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 4.8, ease: "linear" }}
          className="h-full cmyk-ribbon"
        />
      </div>
    </div>
  );
}

import {
  CalculatorState,
  VehicleSize,
  PackageType,
  DesignOption,
  VEHICLE_SIZES,
  PACKAGES,
  ADD_ONS,
  DESIGN_OPTIONS,
  BASE_PRICES,
  INSTALL_HOURS,
  TURNAROUND_DAYS,
  INSTALL_HOURLY_RATE,
} from "@/types";

const PACKAGE_COLORS: Record<PackageType, string> = {
  base_decal: "#00AEEF",
  partial:    "#EC008C",
  full:       "#FFD700",
};

function computeTotal(state: CalculatorState): number {
  if (!state.vehicleSize || !state.packageType) return 0;
  const base = BASE_PRICES[state.packageType][state.vehicleSize];
  const addOnTotal = ADD_ONS.filter((a) => state.addOns.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
  const designPrice = state.designOption ? DESIGN_OPTIONS.find((d) => d.id === state.designOption)?.price ?? 0 : 0;
  const installExtra = state.extraInstallHours * INSTALL_HOURLY_RATE;
  return base + addOnTotal + designPrice + installExtra;
}

function computeInstallHours(state: CalculatorState): number {
  if (!state.vehicleSize || !state.packageType) return 0;
  return INSTALL_HOURS[state.packageType][state.vehicleSize] + state.extraInstallHours;
}

const STEPS = ["Vehicle", "Package", "Add-Ons", "Design", "Summary"] as const;

function CmykWipe({ playing }: { playing: boolean }) {
  return (
    <AnimatePresence>
      {playing && (
        <div className="fixed inset-0 z-[100] flex overflow-hidden pointer-events-none">
          {["#00AEEF", "#EC008C", "#FFD700", "#0A0A0A"].map((color, i) => (
            <motion.div
              key={color}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 1, 0] }}
              transition={{ duration: 0.8, delay: i * 0.06, times: [0, 0.35, 0.65, 1], ease: "easeInOut" }}
              style={{ backgroundColor: color, transformOrigin: "left", flex: 1 }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

/* ── Vehicle Sizing Tool ─────────────────────────────────────── */
const SIZE_GUIDE = [
  { label: "Standard Car/Truck",   color: "#00AEEF", examples: "Sedan, SUV, compact pickup, Jeep" },
  { label: "Large Truck/Sprinter", color: "#EC008C", examples: "Ford Transit, Sprinter, Promaster, full cargo van" },
  { label: "Oversized Vehicle",    color: "#FFD700", examples: "Box truck, cube van, flatbed, heavy commercial" },
  { label: "Enclosed Trailer",     color: "#0A0A0A", examples: "16–53ft enclosed trailers, semi combos" },
];

function VehicleSizingTool() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-5 rounded-xl border border-gray-100 overflow-hidden bg-white shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Ruler size={14} className="text-[#00AEEF]" />
          Vehicle Sizing Guide
        </span>
        <ChevronDown size={15} className={`text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 border-t border-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                {SIZE_GUIDE.map((s) => {
                  const isYellow = s.color === "#FFD700";
                  const isDark = s.color === "#0A0A0A";
                  return (
                    <div key={s.label} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                      <div
                        className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: s.color }}
                      />
                      <div>
                        <p
                          className="text-xs font-bold mb-0.5"
                          style={{ color: isYellow ? "#9a7c00" : isDark ? "#374151" : s.color }}
                        >
                          {s.label}
                        </p>
                        <p className="text-[11px] text-gray-400 leading-snug">{s.examples}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Calculator() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [wipe, setWipe] = useState(false);
  const [state, setState] = useState<CalculatorState>({
    vehicleSize: null,
    packageType: null,
    addOns: [],
    designOption: null,
    extraInstallHours: 0,
  });

  const total = computeTotal(state);
  const installHours = computeInstallHours(state);
  const turnaround = state.packageType ? TURNAROUND_DAYS[state.packageType] : "—";

  const canNext = () => {
    if (step === 0) return !!state.vehicleSize;
    if (step === 1) return !!state.packageType;
    if (step === 2) return true;
    if (step === 3) return !!state.designOption;
    return true;
  };

  const handleNext = useCallback(() => {
    if (step === 3) {
      setWipe(true);
      setTimeout(() => { setStep(4); setWipe(false); }, 900);
    } else {
      setStep((s) => s + 1);
    }
  }, [step]);

  const toggleAddOn = (id: string) => {
    setState((s) => ({
      ...s,
      addOns: s.addOns.includes(id) ? s.addOns.filter((a) => a !== id) : [...s.addOns, id],
    }));
  };

  const isDesignLocked = (designId: DesignOption): boolean => {
    if (state.packageType === "base_decal" && (designId === "medium_complexity" || designId === "advanced")) return true;
    if (state.packageType === "full" && designId === "basic") return true;
    return false;
  };

  const selectedVehicleLabel = VEHICLE_SIZES.find((v) => v.id === state.vehicleSize)?.label;
  const selectedPackageLabel = PACKAGES.find((p) => p.id === state.packageType)?.label;

  if (loading) return <WrapLoadingScreen onDone={() => setLoading(false)} />;

  const stepIcons = [
    state.vehicleSize === "small" ? Car : Truck,
    Package, Plus, Paintbrush, ClipboardList,
  ];
  const stepColors = ["#00AEEF", "#EC008C", "#FFD700", "#00AEEF", "#EC008C"];

  return (
    <div className="min-h-screen pt-[144px] relative overflow-hidden" style={{ backgroundColor: "#f8fafc" }}>
      <CmykWipe playing={wipe} />
      <CmykWaves step={step} />

      {/* Sticky step progress bar */}
      <div className="border-b border-gray-100 sticky top-[144px] z-20" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-3 pb-4">
          {/* Step label — lives here so it never scrolls behind the bar */}
          <p
            className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5"
            style={{ color: stepColors[step] === "#FFD700" ? "#9a7c00" : stepColors[step] }}
          >
            Step {step + 1} of {STEPS.length}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {STEPS.map((s, i) => {
                const Icon = stepIcons[i];
                const isActive = i === step;
                const isDone = i < step;
                const isYellow = stepColors[i] === "#FFD700";
                return (
                  <div key={s} className="flex items-center gap-2">
                    <button
                      onClick={() => isDone && setStep(i)}
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: isDone ? "#0A0A0A" : isActive ? stepColors[i] : "#f3f4f6",
                        color: isDone ? "#fff" : isActive ? (isYellow ? "#000" : "#fff") : "#9ca3af",
                        cursor: isDone ? "pointer" : "default",
                      }}
                      title={s}
                    >
                      {isDone ? <Check size={13} /> : <Icon size={14} />}
                    </button>
                    {i < STEPS.length - 1 && (
                      <div className="w-6 h-px transition-colors duration-300" style={{ backgroundColor: isDone ? "#0A0A0A" : "#e5e7eb" }} />
                    )}
                  </div>
                );
              })}
            </div>
            {total > 0 && (
              <motion.div key={total} initial={{ scale: 1.05 }} animate={{ scale: 1 }} className="text-right">
                <p className="text-xs text-gray-400">Estimated Total</p>
                <p className="text-xl font-black text-brand-black">${total.toLocaleString()}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pt-14 pb-10">
        <AnimatePresence mode="wait">

          {/* Step 0 — Vehicle Size */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <StepHeader step={1} title="What Type of Vehicle?" subtitle="Select the sizing that matches your vehicle best." color="#00AEEF" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VEHICLE_SIZES.map((v) => (
                  <SelectCard
                    key={v.id}
                    selected={state.vehicleSize === v.id}
                    onClick={() => setState((s) => ({ ...s, vehicleSize: v.id as VehicleSize }))}
                    title={v.label}
                    description={v.description}
                  />
                ))}
              </div>

              {/* Other option */}
              <div className="mt-3 flex justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#EC008C] transition-colors border border-gray-200 hover:border-[#EC008C]/40 px-4 py-2 rounded-full"
                >
                  Something else? <ArrowRight size={11} />
                </Link>
              </div>

              {/* Vehicle Sizing Tool */}
              <VehicleSizingTool />
            </motion.div>
          )}

          {/* Step 1 — Package */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <StepHeader step={2} title="Choose your wrap package" subtitle={`Showing live pricing for: ${selectedVehicleLabel || "your vehicle"}. Select a package below.`} color="#EC008C" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PACKAGES.map((pkg) => {
                  const price = state.vehicleSize ? BASE_PRICES[pkg.id as PackageType][state.vehicleSize] : null;
                  const pkgColor = PACKAGE_COLORS[pkg.id as PackageType];
                  return (
                    <SelectCard
                      key={pkg.id}
                      selected={state.packageType === pkg.id}
                      onClick={() => setState((s) => ({ ...s, packageType: pkg.id as PackageType }))}
                      title={pkg.label}
                      description={pkg.description}
                      badge={price ? `$${price.toLocaleString()}` : undefined}
                      color={pkgColor}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2 — Add-ons */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <StepHeader step={3} title="Enhance your wrap" subtitle="Add-ons are optional. Select any upgrades or commercial additions for your project." color="#FFD700" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADD_ONS.map((addon) => {
                  const active = state.addOns.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`flex items-center justify-between p-5 rounded-xl border-2 text-left transition-all ${active ? "border-brand-black bg-gray-50" : "border-gray-100 hover:border-gray-200 bg-white"}`}
                    >
                      <div>
                        <p className="font-semibold text-sm text-brand-black">{addon.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">+${addon.price}</p>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${active ? "border-brand-black bg-brand-black" : "border-gray-300"}`}>
                        {active && <Check size={12} className="text-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 3 — Design */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <StepHeader step={4} title="Design level" subtitle={`Choose how much design work your ${selectedPackageLabel || "wrap"} needs. Some options are locked based on your package.`} color="#00AEEF" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DESIGN_OPTIONS.map((d) => {
                  const locked = isDesignLocked(d.id as DesignOption);
                  return (
                    <SelectCard
                      key={d.id}
                      selected={state.designOption === d.id}
                      onClick={() => { if (!locked) setState((s) => ({ ...s, designOption: d.id as DesignOption })); }}
                      title={d.label}
                      description={d.description}
                      badge={d.price === 0 ? "Included" : `+$${d.price}`}
                      badgeHighlight={d.price === 0}
                      disabled={locked}
                    />
                  );
                })}
              </div>
              {state.packageType === "base_decal" && (
                <p className="mt-3 text-xs text-gray-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00AEEF] inline-block" />
                  Advanced options are not available for Base Decal packages.
                </p>
              )}
              {state.packageType === "full" && (
                <p className="mt-3 text-xs text-gray-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] inline-block" />
                  Full Wraps require at minimum a layout design.
                </p>
              )}
            </motion.div>
          )}

          {/* Step 4 — Summary */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <StepHeader step={5} title="Your estimate" subtitle={`Standard installation included (~${state.vehicleSize && state.packageType ? INSTALL_HOURS[state.packageType][state.vehicleSize] : 0} hrs). Add extra hours below if needed.`} color="#EC008C" />
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-brand-black">Additional Install Hours</p>
                    <p className="text-sm text-gray-400">${INSTALL_HOURLY_RATE}/hr</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setState((s) => ({ ...s, extraInstallHours: Math.max(0, s.extraInstallHours - 1) }))} className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-brand-black transition-colors">
                      <Minus size={16} />
                    </button>
                    <span className="text-2xl font-black w-8 text-center">{state.extraInstallHours}</span>
                    <button onClick={() => setState((s) => ({ ...s, extraInstallHours: s.extraInstallHours + 1 }))} className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-brand-black transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                {state.extraInstallHours > 0 && (
                  <p className="text-sm text-gray-500">Extra install cost: +${(state.extraInstallHours * INSTALL_HOURLY_RATE).toLocaleString()}</p>
                )}
              </div>
              <div className="rounded-2xl border border-gray-100 overflow-hidden">
                <div className="bg-brand-black text-white px-6 py-4 relative">
                  <div className="absolute top-0 left-0 right-0 h-0.5 flex">
                    <div className="flex-1 bg-[#00AEEF]" />
                    <div className="flex-1 bg-[#EC008C]" />
                    <div className="flex-1 bg-[#FFD700]" />
                    <div className="flex-1 bg-white/20" />
                  </div>
                  <p className="text-sm font-medium text-gray-400 mb-1">Your Estimate</p>
                  <p className="text-4xl font-black">${total.toLocaleString()}</p>
                </div>
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <SummaryRow label="Vehicle" value={selectedVehicleLabel || "—"} />
                    <SummaryRow label="Package" value={selectedPackageLabel || "—"} />
                    {state.addOns.length > 0 && (
                      <SummaryRow label="Add-Ons" value={state.addOns.map((id) => ADD_ONS.find((a) => a.id === id)?.label).join(", ")} />
                    )}
                    <SummaryRow label="Design" value={DESIGN_OPTIONS.find((d) => d.id === state.designOption)?.label || "—"} />
                    <div className="h-px bg-gray-100 my-2" />
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-[#00AEEF]" />
                      <div className="flex justify-between flex-1">
                        <span className="text-sm text-gray-500">Est. Install Time</span>
                        <span className="text-sm font-semibold">{installHours} hrs</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-[#EC008C]" />
                      <div className="flex justify-between flex-1">
                        <span className="text-sm text-gray-500">Est. Turnaround</span>
                        <span className="text-sm font-semibold">{turnaround}</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/quote?total=${total}&vehicle=${state.vehicleSize}&package=${state.packageType}`}
                    className="flex items-center justify-center gap-2 w-full bg-[#EC008C] text-white font-bold text-base py-4 rounded-xl hover:bg-[#D0007A] transition-colors group"
                  >
                    Request This Quote
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <p className="text-center text-xs text-gray-400 mt-3">
                    This is an estimate — final pricing confirmed after consultation.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-brand-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} /> Back
          </button>
          {step < STEPS.length - 1 && (
            <button
              onClick={handleNext}
              disabled={!canNext()}
              className="flex items-center gap-2 bg-brand-black text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Continue <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepHeader({ title, subtitle }: { step: number; title: string; subtitle: string; color: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-black text-brand-black mb-2">{title}</h1>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
}

function SelectCard({
  selected, onClick, title, description, badge, badgeHighlight, color, disabled,
}: {
  selected: boolean; onClick: () => void; title: string; description: string;
  badge?: string; badgeHighlight?: boolean; color?: string; disabled?: boolean;
}) {
  const isYellow = color === "#FFD700";
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`relative p-6 rounded-xl border-2 text-left w-full transition-all duration-200 ${
        disabled ? "border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed"
          : selected ? "shadow-md"
          : "border-gray-100 bg-white hover:border-gray-300"
      }`}
      style={selected && !disabled ? { borderColor: color ?? "#0A0A0A", backgroundColor: color ? `${color}10` : "#f9fafb" } : {}}
    >
      {badge && (
        <span
          className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full ${badgeHighlight ? "bg-green-50 text-green-600" : selected ? "text-white" : "bg-gray-100 text-gray-600"}`}
          style={selected && !badgeHighlight ? { backgroundColor: color ?? "#0A0A0A" } : {}}
        >
          {badge}
        </span>
      )}
      <div
        className="w-5 h-5 rounded-full border-2 mb-4 flex items-center justify-center transition-all"
        style={selected ? { borderColor: color ?? "#0A0A0A", backgroundColor: color ?? "#0A0A0A" } : { borderColor: "#d1d5db" }}
      >
        {selected && <Check size={11} className={isYellow ? "text-black" : "text-white"} />}
      </div>
      <p className="font-bold text-brand-black mb-1">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-semibold text-brand-black text-right max-w-[60%]">{value || "—"}</span>
    </div>
  );
}
