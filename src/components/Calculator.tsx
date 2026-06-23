"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, ChevronRight, ChevronLeft, ArrowRight,
  Clock, Calendar, Car, Truck,
  Package, Paintbrush, ClipboardList, ChevronDown, Ruler, Droplets,
} from "lucide-react";

import {
  CalculatorState,
  VehicleSize,
  PackageType,
  DesignChoice,
  VEHICLE_SIZES,
  PACKAGES,
  ADD_ONS,
  WINDOW_TINT_FILMS,
  DESIGN_OPTIONS,
  BASE_PRICES,
  INSTALL_HOURS,
  INSTALL_HOURS_RANGE,
  TURNAROUND_DAYS,
} from "@/types";

/* ── Design time helpers ─────────────────────────────────────────── */
const BASE_DESIGN_MINUTES: Record<DesignChoice, number> = {
  supplied: 30,
  base_layout: 60,
  full_graphic: 180,
  premium: 300,
};

const SIZE_ADDON_MINUTES: Record<VehicleSize, number> = {
  small: 0,
  medium: 30,
  large: 60,
  truck_trailer: 90,
  enclosed_trailer: 120,
};

function computeDesignMinutes(d: DesignChoice | null, v: VehicleSize | null): number {
  if (!d) return 0;
  const base = BASE_DESIGN_MINUTES[d];
  const addon = (d !== "supplied" && v) ? SIZE_ADDON_MINUTES[v] : 0;
  return base + addon;
}

function formatMinutes(mins: number, isPremium?: boolean): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m} Min`;
  if (m === 0) return isPremium ? `${h}+ Hours` : `${h} Hour${h > 1 ? "s" : ""}`;
  return `${h} Hr ${m} Min`;
}

/* ── CMYK Wave Background ─────────────────────────────────────── */
function CmykWaves({ step }: { step: number }) {
  const colors = ["#00AEEF", "#EC008C", "#FFD700", "#0A0A0A"];
  const c0 = colors[step % 4];
  const c1 = colors[(step + 1) % 4];
  const c2 = colors[(step + 2) % 4];
  const intensity = Math.min((step + 1) * 0.3, 1.0);
  const wave0 = Math.min(0.07 * intensity, 0.18);
  const wave1 = Math.min(0.05 * intensity, 0.18);
  const wave2 = Math.min(0.06 * intensity, 0.18);
  const blob0 = `${Math.round(0x18 * intensity).toString(16).padStart(2, "0")}`;
  const blob1 = `${Math.round(0x15 * intensity).toString(16).padStart(2, "0")}`;
  const blob2 = `${Math.round(0x10 * intensity).toString(16).padStart(2, "0")}`;
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg className="absolute -bottom-8 left-0 right-0 w-full" viewBox="0 0 1200 200" preserveAspectRatio="none" fill="none">
        <path d="M0 130 C200 70 400 170 600 110 C800 50 1000 150 1200 90 L1200 200 L0 200 Z" fill={c0} opacity={wave0} />
        <path d="M0 155 C300 110 600 175 900 130 C1050 105 1150 145 1200 135 L1200 200 L0 200 Z" fill={c1} opacity={wave1} />
      </svg>
      <svg className="absolute -top-8 right-0 w-2/3" viewBox="0 0 800 160" preserveAspectRatio="none" fill="none">
        <path d="M800 70 C650 25 500 110 350 60 C200 10 100 85 0 45 L0 0 L800 0 Z" fill={c2} opacity={wave2} />
      </svg>
      <svg className="absolute top-1/3 -left-16 w-1/2" viewBox="0 0 600 200" preserveAspectRatio="none" fill="none">
        <ellipse cx="300" cy="100" rx="300" ry="80" fill={c0} opacity={Math.min(0.04 * intensity, 0.1)} />
      </svg>
      <motion.div
        animate={{ scale: [1, 1.25, 1], x: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full"
        style={{ background: `radial-gradient(circle, ${c0}${blob0} 0%, transparent 70%)` }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], x: [0, -15, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full"
        style={{ background: `radial-gradient(circle, ${c1}${blob1} 0%, transparent 70%)` }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full"
        style={{ background: `radial-gradient(circle, ${c2}${blob2} 0%, transparent 70%)` }}
      />
    </div>
  );
}

function WrapLoadingScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-6 px-4">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#00AEEF] mb-2">M&amp;T Printing Group</p>
        <h2 className="text-xl font-black text-white">Vinyl Wrap Estimator</h2>
      </div>
      <div className="w-64 bg-[#1a1a1a] rounded-full overflow-hidden" style={{ height: "3px" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "linear-gradient(to right, #00AEEF, #EC008C, #FFD700)" }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </div>
      <p className="text-xs text-gray-600 tracking-widest uppercase">Loading</p>
    </div>
  );
}

const PACKAGE_COLORS: Record<PackageType, string> = {
  base_decal: "#00AEEF",
  partial:    "#EC008C",
  full:       "#FFD700",
};

const VEHICLE_PREVIEW_PREFIX: Record<VehicleSize, string> = {
  small: "standard",
  medium: "medium",
  large: "large",
  truck_trailer: "oversized",
  enclosed_trailer: "trailer",
};

const PACKAGE_PREVIEW_SUFFIX: Record<PackageType, string> = {
  base_decal: "base",
  partial: "partial",
  full: "full",
};

function getWrapPreviewSrc(vehicleSize: VehicleSize | null, packageType: PackageType | null): string | null {
  if (!vehicleSize || !packageType) return null;
  return `/wrap_examples/${VEHICLE_PREVIEW_PREFIX[vehicleSize]}_${PACKAGE_PREVIEW_SUFFIX[packageType]}.png`;
}

function computeTotal(state: CalculatorState): number {
  if (!state.vehicleSize || !state.packageType) return 0;
  const base = BASE_PRICES[state.packageType][state.vehicleSize];
  const addOnTotal = ADD_ONS
    .filter(a => state.addOns.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const windowTintCost = state.windowTint && state.vehicleSize
    ? (WINDOW_TINT_FILMS.find(f => f.id === state.windowTint?.film)?.prices[state.vehicleSize] ?? 0)
    : 0;
  const designCost = state.designOption
    ? (DESIGN_OPTIONS.find(d => d.id === state.designOption)?.price ?? 0)
    : 0;
  return base + addOnTotal + windowTintCost + designCost;
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

/* ── Vehicle Preview Card ────────────────────────────────────── */
function VehiclePreviewCard({
  state,
  showVehicleLabel = true,
  showDesign = false,
  addOnCount = 0,
}: {
  state: CalculatorState;
  showVehicleLabel?: boolean;
  showDesign?: boolean;
  addOnCount?: number;
}) {
  const vehicle = VEHICLE_SIZES.find(v => v.id === state.vehicleSize);
  const pkgColor = state.packageType ? PACKAGE_COLORS[state.packageType] : "#374151";
  const isYellow = pkgColor === "#FFD700";
  const designLabel = DESIGN_OPTIONS.find(d => d.id === state.designOption)?.label;
  const totalAddOns = addOnCount + (state.windowTint ? 1 : 0);

  return (
    <div
      className="relative rounded-xl border-2 overflow-hidden transition-all duration-300"
      style={{
        borderColor: state.packageType ? pkgColor : "#374151",
        boxShadow: state.packageType
          ? `0 0 0 1px ${pkgColor}22, 0 4px 20px -4px ${pkgColor}44`
          : "0 1px 3px rgba(0,0,0,0.3)",
      }}
    >
      {showVehicleLabel && vehicle && (
        <div className="absolute top-2 left-2 z-10 bg-black/70 backdrop-blur-sm text-white px-2 py-1.5 rounded-xl leading-tight">
          <p className="text-[10px] font-bold leading-none">{vehicle.label}</p>
          <p className="text-[9px] text-gray-300 mt-0.5 leading-none">{vehicle.sqft}</p>
          {state.packageType && (
            <p className="text-[9px] mt-0.5 leading-none" style={{ color: PACKAGE_COLORS[state.packageType] }}>
              {PACKAGES.find(p => p.id === state.packageType)?.label}
            </p>
          )}
        </div>
      )}

      <div className="bg-[#1a1a1a] flex items-center justify-center px-4 py-5 min-h-[120px]">
        {(() => {
          const previewSrc = getWrapPreviewSrc(state.vehicleSize, state.packageType);
          if (previewSrc) {
            return (
              <img
                src={previewSrc}
                alt="Package preview"
                className="h-24 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = vehicle?.image || "";
                }}
              />
            );
          }
          if (vehicle) {
            return <img src={vehicle.image} alt={vehicle.label} className="h-24 object-contain" />;
          }
          return (
            <div className="h-24 w-full flex items-center justify-center">
              <p className="text-xs text-gray-600">Select a vehicle</p>
            </div>
          );
        })()}
      </div>

      {/* "+" add-on indicators — between image area and package bar */}
      {totalAddOns > 0 && (
        <div className="bg-[#111] border-t border-white/5 flex items-center justify-center gap-1 py-1.5 flex-wrap">
          {Array.from({ length: Math.min(totalAddOns, 10) }).map((_, i) => (
            <span key={i} className="text-base font-black text-[#00AEEF] leading-none drop-shadow">+</span>
          ))}
        </div>
      )}

      {state.packageType && (
        <div
          className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-center"
          style={{
            backgroundColor: pkgColor,
            color: isYellow ? "#000" : "#fff",
          }}
        >
          {PACKAGES.find(p => p.id === state.packageType)?.label}
        </div>
      )}

      {showDesign && designLabel && (
        <div className="px-3 py-1 bg-[#1a1a1a] text-[10px] font-medium text-gray-400 text-center border-t border-white/10">
          {designLabel}
        </div>
      )}
    </div>
  );
}

/* ── Window Tint Section ─────────────────────────────────────── */
function WindowTintSection({
  state,
  setState,
}: {
  state: CalculatorState;
  setState: React.Dispatch<React.SetStateAction<CalculatorState>>;
}) {
  const [open, setOpen] = useState(!!state.windowTint);
  const selectedFilm = state.windowTint
    ? WINDOW_TINT_FILMS.find(f => f.id === state.windowTint?.film)
    : null;

  const selectFilm = (filmId: string) => {
    const film = WINDOW_TINT_FILMS.find(f => f.id === filmId)!;
    setState(s => ({
      ...s,
      windowTint: s.windowTint?.film === filmId
        ? null
        : { film: filmId, shade: film.shades[0] || "" },
    }));
  };

  const selectShade = (shade: string) => {
    setState(s => ({
      ...s,
      windowTint: s.windowTint ? { ...s.windowTint, shade } : null,
    }));
  };

  const priceLabel = selectedFilm && state.vehicleSize
    ? `+$${selectedFilm.prices[state.vehicleSize].toLocaleString()}`
    : null;

  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-[#111111] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <Droplets size={15} className="text-[#00AEEF] shrink-0" />
          <span className="text-sm font-semibold text-white">Professional Window Tint</span>
          {state.windowTint && (
            <span className="text-[10px] bg-[#00AEEF]/20 text-[#00AEEF] px-2 py-0.5 rounded-full font-semibold">
              {selectedFilm?.name}{state.windowTint.shade ? ` · ${state.windowTint.shade}` : ""}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {priceLabel && (
            <span className="text-sm font-bold text-white">{priceLabel}</span>
          )}
          <ChevronDown
            size={15}
            className={`text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </div>
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
            <div className="px-5 pb-5 border-t border-white/10">
              {/* Film options */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-4 mb-3">
                Select Film
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {WINDOW_TINT_FILMS.map((film) => {
                  const filmPrice = state.vehicleSize ? film.prices[state.vehicleSize] : null;
                  const selected = state.windowTint?.film === film.id;
                  return (
                    <button
                      key={film.id}
                      onClick={() => selectFilm(film.id)}
                      className={`flex flex-col gap-1 p-3.5 rounded-xl border-2 text-left transition-all ${
                        selected
                          ? "border-[#00AEEF] bg-[#00AEEF]/10"
                          : "border-white/10 hover:border-white/25 bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white leading-snug">{film.name}</span>
                        {selected && (
                          <div className="w-4 h-4 rounded-full bg-[#00AEEF] flex items-center justify-center shrink-0 ml-1">
                            <Check size={9} className="text-white" />
                          </div>
                        )}
                      </div>
                      {film.heatRejection && (
                        <span className="text-[10px] text-[#00AEEF] font-medium">{film.heatRejection}</span>
                      )}
                      {filmPrice && (
                        <span className="text-xs text-gray-400">
                          +${filmPrice.toLocaleString()}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Shade selection */}
              {state.windowTint && selectedFilm && selectedFilm.shades.length > 0 && (
                <div className="mt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2.5">
                    Select Shade
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedFilm.shades.map((shade) => {
                      const shadeSelected = state.windowTint?.shade === shade;
                      return (
                        <button
                          key={shade}
                          onClick={() => selectShade(shade)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
                            shadeSelected
                              ? "border-[#00AEEF] bg-[#00AEEF] text-white"
                              : "border-white/15 bg-white/5 text-gray-400 hover:border-white/30"
                          }`}
                        >
                          {shade}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Remove tint */}
              {state.windowTint && (
                <button
                  onClick={() => setState(s => ({ ...s, windowTint: null }))}
                  className="mt-4 text-xs text-gray-500 hover:text-red-400 transition-colors underline underline-offset-2"
                >
                  Remove Window Tint
                </button>
              )}
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
    windowTint: null,
    designOption: null,
  });

  const total = computeTotal(state);
  const turnaround = state.packageType ? TURNAROUND_DAYS[state.packageType] : "—";
  const installHoursLabel = state.packageType ? INSTALL_HOURS[state.packageType] : "—";

  const canNext = () => {
    if (step === 0) return !!state.vehicleSize;
    if (step === 1) return !!state.packageType;
    if (step === 2) return true;
    if (step === 3) return !!state.designOption;
    return true;
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

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

  const selectedVehicleLabel = VEHICLE_SIZES.find((v) => v.id === state.vehicleSize)?.label;
  const selectedPackageLabel = PACKAGES.find((p) => p.id === state.packageType)?.label;

  if (loading) return <WrapLoadingScreen onDone={() => setLoading(false)} />;

  const stepIcons = [
    state.vehicleSize === "small" ? Car : state.vehicleSize === "enclosed_trailer" ? Truck : Truck,
    Package, Ruler, Paintbrush, ClipboardList,
  ];
  const stepColors = ["#00AEEF", "#EC008C", "#FFD700", "#00AEEF", "#EC008C"];

  return (
    <div className="min-h-screen pt-[144px] relative" style={{ backgroundColor: "#0A0A0A" }}>
      <CmykWipe playing={wipe} />
      <CmykWaves step={step} />

      {/* Sticky step progress bar */}
      <div className="border-b border-white/10 sticky top-[144px] z-20" style={{ backgroundColor: "#0A0A0A" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-3 pb-4">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5"
            style={{ color: stepColors[step] }}
          >
            Step {step + 1} of {STEPS.length}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {STEPS.map((s, i) => {
                const Icon = stepIcons[i];
                const isActive = i === step;
                const isDone = i < step;
                const isYellow = stepColors[i] === "#FFD700";
                return (
                  <div key={s} className="flex items-center gap-1">
                    <button
                      onClick={() => isDone && setStep(i)}
                      className="flex flex-col items-center gap-1 group"
                      style={{ cursor: isDone ? "pointer" : "default" }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                        style={{
                          backgroundColor: isDone ? "#ffffff" : isActive ? stepColors[i] : "#1f2937",
                          color: isDone ? "#000" : isActive ? (isYellow ? "#000" : "#fff") : "#4b5563",
                        }}
                      >
                        {isDone ? <Check size={12} /> : <Icon size={13} />}
                      </div>
                      <span
                        className="text-[9px] font-semibold uppercase tracking-wide hidden sm:block leading-none"
                        style={{
                          color: isActive
                            ? stepColors[i]
                            : isDone ? "#9ca3af" : "#374151",
                        }}
                      >
                        {s}
                      </span>
                    </button>
                    {i < STEPS.length - 1 && (
                      <div
                        className="w-5 h-px mb-3 transition-colors duration-300"
                        style={{ backgroundColor: isDone ? "#ffffff" : "#374151" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {total > 0 && (
              <motion.div key={total} initial={{ scale: 1.05 }} animate={{ scale: 1 }} className="text-right">
                <p className="text-xs text-gray-500">Estimated Total</p>
                <p className="text-xl font-black text-white">${total.toLocaleString()}</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className={`relative ${step === 0 ? "max-w-5xl" : "max-w-3xl"} mx-auto px-4 sm:px-6 pt-10 pb-10`}>
        <AnimatePresence mode="wait">

          {/* Step 0 — Vehicle Size */}
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <StepHeader title="Select Your Vehicle" subtitle="Choose the option that best matches your vehicle size." />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {VEHICLE_SIZES.map((v) => {
                  const selected = state.vehicleSize === v.id;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setState((s) => ({ ...s, vehicleSize: v.id as VehicleSize }))}
                      className={`relative p-4 rounded-xl border-2 text-left w-full transition-all duration-200 flex flex-col items-center text-center ${
                        selected
                          ? "border-white bg-white/10 shadow-md"
                          : "border-white/10 bg-[#111111] hover:border-white/30"
                      }`}
                    >
                      <div className="w-full bg-[#1a1a1a] rounded-lg mb-3 flex items-center justify-center p-2" style={{ minHeight: "280px" }}>
                        <img
                          src={v.image}
                          alt={v.label}
                          className="w-full h-60 object-contain"
                        />
                      </div>
                      <p className="font-bold text-sm text-white mb-0.5">{v.label}</p>
                      <p className="text-xs text-gray-500 leading-snug">{v.sqft}</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex justify-center">
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#EC008C] transition-colors border border-white/10 hover:border-[#EC008C]/40 px-4 py-2 rounded-full"
                >
                  Something else? <ArrowRight size={11} />
                </Link>
              </div>
            </motion.div>
          )}

          {/* Step 1 — Package */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <StepHeader title="Select Your Package" subtitle={`Showing live pricing for: ${selectedVehicleLabel || "your vehicle"}. Select a package below.`} />

              {state.vehicleSize && (
                <div className="mb-6">
                  <VehiclePreviewCard state={state} showVehicleLabel={true} />
                </div>
              )}

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
              <StepHeader title="Additions" subtitle="All additions are optional." />

              {state.vehicleSize && (
                <div className="mb-6">
                  <VehiclePreviewCard
                    state={state}
                    showVehicleLabel={true}
                    addOnCount={state.addOns.length}
                  />
                </div>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ADD_ONS.map((addon) => {
                  const active = state.addOns.includes(addon.id);
                  const isDisabled = addon.category === "base_only" && (state.packageType === "partial" || state.packageType === "full");
                  return (
                    <button
                      key={addon.id}
                      onClick={() => !isDisabled && toggleAddOn(addon.id)}
                      disabled={isDisabled}
                      className={`flex flex-col justify-between p-4 rounded-xl border-2 text-left transition-all ${
                        isDisabled
                          ? "border-white/5 bg-white/[0.02] opacity-40 cursor-not-allowed"
                          : active
                          ? "border-white bg-white/10"
                          : "border-white/10 hover:border-white/30 bg-[#111111]"
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-sm text-white leading-snug">{addon.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">+${addon.price}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 mt-2 flex items-center justify-center self-end transition-all ${active && !isDisabled ? "border-white bg-white" : "border-white/20"}`}>
                        {active && !isDisabled && <Check size={10} className="text-black" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Window Tint — expandable section */}
              <WindowTintSection state={state} setState={setState} />
            </motion.div>
          )}

          {/* Step 3 — Design */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <StepHeader title="Design Creation" subtitle="Select your design service. Greyed options are unavailable for your package." />

              {state.vehicleSize && (
                <div className="mb-6">
                  <VehiclePreviewCard
                    state={state}
                    showVehicleLabel={true}
                    showDesign={true}
                    addOnCount={state.addOns.length}
                  />
                </div>
              )}

              {state.packageType && (
                <div className="mb-5 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5">
                  <Clock size={14} className="text-gray-400 shrink-0" />
                  <p className="text-xs font-medium text-gray-300">
                    Estimated Design Time: <span className="font-bold text-white">{state.designOption ? formatMinutes(computeDesignMinutes(state.designOption, state.vehicleSize), state.designOption === "premium") : "Select a design option"}</span>
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DESIGN_OPTIONS.map((d) => {
                  const available = !state.packageType || d.availableFor.includes(state.packageType);
                  const selected = state.designOption === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => available && setState(s => ({ ...s, designOption: d.id as DesignChoice }))}
                      disabled={!available}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all ${
                        !available ? "border-white/5 bg-white/5 opacity-40 cursor-not-allowed"
                          : selected ? "border-white bg-white/10 shadow-sm"
                          : "border-white/10 hover:border-white/30 bg-[#111111]"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1.5">
                        <p className="font-bold text-sm text-white">{d.label}</p>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ml-1 shrink-0 ${
                          d.price === 0 ? "bg-green-900/50 text-green-400" : selected ? "bg-white text-black" : "bg-white/10 text-gray-300"
                        }`}>
                          {d.price === 0 ? "Included" : `+$${d.price}`}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">{d.blurb}</p>
                      {selected && available && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-white flex items-center justify-center">
                          <Check size={9} className="text-black" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 text-xs text-gray-500">
                * Design pricing is added to your package total.
              </p>
            </motion.div>
          )}

          {/* Step 4 — Summary */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
              <StepHeader title="Your Custom Estimate" subtitle="Installation is included in all package pricing." />

              {state.vehicleSize && (
                <div className="mb-6">
                  <VehiclePreviewCard
                    state={state}
                    showVehicleLabel={true}
                    showDesign={true}
                    addOnCount={state.addOns.length}
                  />
                </div>
              )}

              <div className="rounded-2xl border border-white/10 overflow-hidden">
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
                <div className="p-6 bg-[#111111]">
                  <div className="space-y-3 mb-6">
                    <SummaryRow label="Vehicle" value={selectedVehicleLabel || "—"} />
                    <SummaryRow label="Package" value={selectedPackageLabel || "—"} />
                    {state.addOns.length > 0 && (
                      <SummaryRow label="Add-Ons" value={state.addOns.map((id) => ADD_ONS.find((a) => a.id === id)?.label).join(", ")} />
                    )}
                    {state.windowTint && (() => {
                      const film = WINDOW_TINT_FILMS.find(f => f.id === state.windowTint?.film);
                      return (
                        <SummaryRow
                          label="Window Tint"
                          value={`${film?.name ?? ""}${state.windowTint.shade ? ` (${state.windowTint.shade})` : ""}`}
                        />
                      );
                    })()}
                    <SummaryRow label="Design Option" value={DESIGN_OPTIONS.find((d) => d.id === state.designOption)?.label || "—"} />
                    <div className="h-px bg-white/10 my-2" />
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-[#00AEEF]" />
                      <div className="flex justify-between flex-1">
                        <span className="text-sm text-gray-400">Est. Install Time</span>
                        <span className="text-sm font-semibold text-white">{installHoursLabel}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-[#EC008C]" />
                      <div className="flex justify-between flex-1">
                        <span className="text-sm text-gray-400">Est. Turnaround</span>
                        <span className="text-sm font-semibold text-white">{turnaround}</span>
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
                  <p className="text-center text-xs text-gray-500 mt-3">
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
            className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={18} /> Back
          </button>
          {step < STEPS.length - 1 && (
            <button
              onClick={handleNext}
              disabled={!canNext()}
              className="flex items-center gap-2 bg-white text-brand-black font-semibold text-sm px-6 py-3 rounded-full hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Continue <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-black text-white mb-2">{title}</h1>
      <p className="text-gray-400">{subtitle}</p>
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
        disabled ? "border-white/5 bg-white/[0.02] opacity-40 cursor-not-allowed"
          : selected ? "shadow-md"
          : "border-white/10 bg-[#111111] hover:border-white/30"
      }`}
      style={selected && !disabled ? { borderColor: color ?? "#ffffff", backgroundColor: color ? `${color}14` : "#1a1a1a" } : {}}
    >
      {badge && (
        <span
          className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full ${badgeHighlight ? "bg-green-900/50 text-green-400" : selected ? "text-white" : "bg-white/10 text-gray-300"}`}
          style={selected && !badgeHighlight ? { backgroundColor: color ?? "#ffffff", color: isYellow ? "#000" : "#fff" } : {}}
        >
          {badge}
        </span>
      )}
      <div
        className="w-5 h-5 rounded-full border-2 mb-4 flex items-center justify-center transition-all"
        style={selected ? { borderColor: color ?? "#ffffff", backgroundColor: color ?? "#ffffff" } : { borderColor: "#374151" }}
      >
        {selected && <Check size={11} className={isYellow ? "text-black" : "text-white"} />}
      </div>
      <p className="font-bold text-white mb-1">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </button>
  );
}

function SummaryRow({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm font-semibold text-white text-right max-w-[60%]">{value || "—"}</span>
    </div>
  );
}
