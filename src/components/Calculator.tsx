"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, ChevronLeft, ArrowRight, Clock, Calendar, Plus, Minus } from "lucide-react";
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

function computeTotal(state: CalculatorState): number {
  if (!state.vehicleSize || !state.packageType) return 0;
  const base = BASE_PRICES[state.packageType][state.vehicleSize];
  const addOnTotal = ADD_ONS.filter((a) => state.addOns.includes(a.id)).reduce(
    (sum, a) => sum + a.price,
    0
  );
  const designPrice = state.designOption
    ? DESIGN_OPTIONS.find((d) => d.id === state.designOption)?.price ?? 0
    : 0;
  const installExtra = state.extraInstallHours * INSTALL_HOURLY_RATE;
  return base + addOnTotal + designPrice + installExtra;
}

function computeInstallHours(state: CalculatorState): number {
  if (!state.vehicleSize || !state.packageType) return 0;
  return INSTALL_HOURS[state.packageType][state.vehicleSize] + state.extraInstallHours;
}

const STEPS = ["Vehicle", "Package", "Add-Ons", "Design", "Install"] as const;

export default function Calculator() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<CalculatorState>({
    vehicleSize: null,
    packageType: null,
    addOns: [],
    designOption: null,
    extraInstallHours: 0,
  });

  const total = computeTotal(state);
  const installHours = computeInstallHours(state);
  const turnaround =
    state.packageType ? TURNAROUND_DAYS[state.packageType] : "—";

  const canNext = () => {
    if (step === 0) return !!state.vehicleSize;
    if (step === 1) return !!state.packageType;
    if (step === 2) return true; // Add-ons optional
    if (step === 3) return !!state.designOption;
    return true;
  };

  const toggleAddOn = (id: string) => {
    setState((s) => ({
      ...s,
      addOns: s.addOns.includes(id) ? s.addOns.filter((a) => a !== id) : [...s.addOns, id],
    }));
  };

  const selectedVehicleLabel = VEHICLE_SIZES.find((v) => v.id === state.vehicleSize)?.label;
  const selectedPackageLabel = PACKAGES.find((p) => p.id === state.packageType)?.label;

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Header bar */}
      <div className="border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <button
                  onClick={() => i < step && setStep(i)}
                  className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                    i < step
                      ? "bg-brand-black text-white cursor-pointer"
                      : i === step
                      ? "bg-[#00AEEF] text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {i < step ? <Check size={12} /> : i + 1}
                </button>
                {i < STEPS.length - 1 && (
                  <div className={`w-8 h-px ${i < step ? "bg-brand-black" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>

          {/* Live total */}
          {total > 0 && (
            <motion.div
              key={total}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className="text-right"
            >
              <p className="text-xs text-gray-400">Estimated Total</p>
              <p className="text-xl font-black text-brand-black">
                ${total.toLocaleString()}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <AnimatePresence mode="wait">
          {/* Step 0 — Vehicle Size */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <StepHeader
                step={1}
                title="What type of vehicle?"
                subtitle="Select the size that best matches your vehicle."
              />
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
            </motion.div>
          )}

          {/* Step 1 — Package */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <StepHeader
                step={2}
                title="Choose your wrap package"
                subtitle={`Pricing for ${selectedVehicleLabel || "your vehicle"}`}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {PACKAGES.map((pkg) => {
                  const price = state.vehicleSize
                    ? BASE_PRICES[pkg.id as PackageType][state.vehicleSize]
                    : null;
                  return (
                    <SelectCard
                      key={pkg.id}
                      selected={state.packageType === pkg.id}
                      onClick={() =>
                        setState((s) => ({ ...s, packageType: pkg.id as PackageType }))
                      }
                      title={pkg.label}
                      description={pkg.description}
                      badge={price ? `$${price.toLocaleString()}` : undefined}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Step 2 — Add-ons */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <StepHeader
                step={3}
                title="Any add-ons?"
                subtitle="Enhance your wrap with optional upgrades. All are optional."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADD_ONS.map((addon) => {
                  const active = state.addOns.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`flex items-center justify-between p-5 rounded-xl border-2 text-left transition-all ${
                        active
                          ? "border-brand-black bg-gray-50"
                          : "border-gray-100 hover:border-gray-200 bg-white"
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-sm text-brand-black">{addon.label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">+${addon.price}</p>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          active ? "border-brand-black bg-brand-black" : "border-gray-300"
                        }`}
                      >
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
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <StepHeader
                step={4}
                title="Graphic design level"
                subtitle="What level of design work does your project need?"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DESIGN_OPTIONS.map((d) => (
                  <SelectCard
                    key={d.id}
                    selected={state.designOption === d.id}
                    onClick={() =>
                      setState((s) => ({ ...s, designOption: d.id as DesignOption }))
                    }
                    title={d.label}
                    description={d.description}
                    badge={d.price === 0 ? "Included" : `+$${d.price}`}
                    badgeHighlight={d.price === 0}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4 — Install hours */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <StepHeader
                step={5}
                title="Additional install time"
                subtitle={`Standard install: ~${state.vehicleSize && state.packageType ? INSTALL_HOURS[state.packageType][state.vehicleSize] : 0} hours included. Add extra hours if needed.`}
              />

              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold text-brand-black">Additional Install Hours</p>
                    <p className="text-sm text-gray-400">${INSTALL_HOURLY_RATE}/hr</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        setState((s) => ({
                          ...s,
                          extraInstallHours: Math.max(0, s.extraInstallHours - 1),
                        }))
                      }
                      className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-brand-black transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-2xl font-black w-8 text-center">
                      {state.extraInstallHours}
                    </span>
                    <button
                      onClick={() =>
                        setState((s) => ({
                          ...s,
                          extraInstallHours: s.extraInstallHours + 1,
                        }))
                      }
                      className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-brand-black transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                {state.extraInstallHours > 0 && (
                  <p className="text-sm text-gray-500">
                    Extra install cost: +${(state.extraInstallHours * INSTALL_HOURLY_RATE).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Summary */}
              <div className="rounded-2xl border border-gray-100 overflow-hidden">
                <div className="bg-brand-black text-white px-6 py-4">
                  <p className="text-sm font-medium text-gray-400 mb-1">Your Estimate</p>
                  <p className="text-4xl font-black">${total.toLocaleString()}</p>
                </div>
                <div className="p-6">
                  <div className="space-y-3 mb-6">
                    <SummaryRow label="Vehicle" value={selectedVehicleLabel || "—"} />
                    <SummaryRow label="Package" value={selectedPackageLabel || "—"} />
                    {state.addOns.length > 0 && (
                      <SummaryRow
                        label="Add-Ons"
                        value={state.addOns
                          .map((id) => ADD_ONS.find((a) => a.id === id)?.label)
                          .join(", ")}
                      />
                    )}
                    <SummaryRow
                      label="Design"
                      value={
                        DESIGN_OPTIONS.find((d) => d.id === state.designOption)?.label || "—"
                      }
                    />
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
                    className="flex items-center justify-center gap-2 w-full bg-[#EC008C] text-white font-bold text-base py-4 rounded-xl hover:bg-[#D0007D] transition-colors group"
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

        {/* Navigation */}
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
              onClick={() => setStep((s) => s + 1)}
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

function StepHeader({
  step,
  title,
  subtitle,
}: {
  step: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#00AEEF] mb-2">
        Step {step} of {STEPS.length}
      </p>
      <h1 className="text-3xl font-black text-brand-black mb-2">{title}</h1>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
}

function SelectCard({
  selected,
  onClick,
  title,
  description,
  badge,
  badgeHighlight,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  badge?: string;
  badgeHighlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative p-6 rounded-xl border-2 text-left w-full transition-all duration-200 ${
        selected
          ? "border-brand-black bg-gray-50 shadow-md"
          : "border-gray-100 bg-white hover:border-gray-300"
      }`}
    >
      {badge && (
        <span
          className={`absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full ${
            badgeHighlight
              ? "bg-green-50 text-green-600"
              : selected
              ? "bg-brand-black text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {badge}
        </span>
      )}
      <div
        className={`w-5 h-5 rounded-full border-2 mb-4 flex items-center justify-center transition-all ${
          selected ? "border-brand-black bg-brand-black" : "border-gray-300"
        }`}
      >
        {selected && <Check size={11} className="text-white" />}
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
      <span className="text-sm font-semibold text-brand-black text-right max-w-[60%]">
        {value || "—"}
      </span>
    </div>
  );
}


