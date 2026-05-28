"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Upload, X, Loader2 } from "lucide-react";
import { QuoteFormData } from "@/types";

const vehicleTypes = [
  "Small Vehicle / Car / SUV",
  "Pickup Truck",
  "Cargo Van",
  "Sprinter / Transit Van",
  "Box Truck",
  "Truck + Trailer",
  "Other",
];

export default function QuoteForm({
  defaultTotal,
  defaultVehicle,
  defaultPackage,
}: {
  defaultTotal?: number;
  defaultVehicle?: string;
  defaultPackage?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormData>({
    defaultValues: {
      vehicleType: defaultVehicle || "",
      estimatedTotal: defaultTotal,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files].slice(0, 5));
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: QuoteFormData) => {
    setSubmitting(true);
    setError(null);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, val]) => {
        if (val !== undefined && val !== null) formData.append(key, String(val));
      });
      if (defaultPackage) formData.append("packageType", defaultPackage);
      uploadedFiles.forEach((file) => formData.append("photos", file));

      const res = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center py-20"
      >
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h2 className="text-3xl font-black text-brand-black mb-3">Quote Received!</h2>
        <p className="text-gray-500 mb-8">
          We&apos;ll review your request and get back to you within one business day.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-brand-black text-white font-semibold px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
        >
          Back to Home
        </a>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Estimated total from calculator */}
      {defaultTotal && defaultTotal > 0 && (
        <div className="bg-brand-black text-white rounded-2xl p-5 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Estimated Total (from calculator)</p>
            <p className="text-3xl font-black">${defaultTotal.toLocaleString()}</p>
          </div>
          <div className="text-right text-sm text-gray-400">
            {defaultVehicle && <p className="capitalize">{defaultVehicle.replace("_", " ")}</p>}
            {defaultPackage && <p className="capitalize">{defaultPackage}</p>}
          </div>
        </div>
      )}

      {/* Two-column fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" error={errors.name?.message}>
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="John Smith"
            className={inputClass(!!errors.name)}
          />
        </Field>

        <Field label="Company Name" error={errors.company?.message}>
          <input
            {...register("company", { required: "Company is required" })}
            placeholder="Smith Services Inc."
            className={inputClass(!!errors.company)}
          />
        </Field>

        <Field label="Email Address" error={errors.email?.message}>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
            })}
            placeholder="john@company.com"
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field label="Phone Number" error={errors.phone?.message}>
          <input
            type="tel"
            {...register("phone", { required: "Phone is required" })}
            placeholder="+1 (555) 000-0000"
            className={inputClass(!!errors.phone)}
          />
        </Field>
      </div>

      {/* Vehicle type */}
      <Field label="Vehicle Type" error={errors.vehicleType?.message}>
        <select
          {...register("vehicleType", { required: "Please select a vehicle type" })}
          className={inputClass(!!errors.vehicleType)}
        >
          <option value="">Select vehicle type…</option>
          {vehicleTypes.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </Field>

      {/* Notes */}
      <Field label="Project Notes" error={errors.notes?.message}>
        <textarea
          {...register("notes")}
          placeholder="Tell us about your project — fleet size, branding goals, timeline, any special requirements…"
          rows={5}
          className={`${inputClass(false)} resize-none`}
        />
      </Field>

      {/* File upload */}
      <div>
        <label className="block text-sm font-semibold text-brand-black mb-2">
          Vehicle Photos{" "}
          <span className="text-gray-400 font-normal">(optional, up to 5)</span>
        </label>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-300 transition-colors">
          <Upload size={24} className="mx-auto text-gray-300 mb-2" />
          <p className="text-sm text-gray-500 mb-3">
            Drag & drop photos, or{" "}
            <label className="text-[#00AEEF] cursor-pointer hover:underline">
              browse
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="sr-only"
              />
            </label>
          </p>
          <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB each</p>
        </div>

        {/* Uploaded files */}
        <AnimatePresence>
          {uploadedFiles.length > 0 && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 space-y-2"
            >
              {uploadedFiles.map((file, i) => (
                <motion.li
                  key={`${file.name}-${i}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5 text-sm"
                >
                  <span className="text-gray-700 truncate max-w-[80%]">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                  >
                    <X size={15} />
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 bg-brand-black text-white font-bold text-base py-4 rounded-xl hover:bg-gray-800 disabled:opacity-60 transition-all"
      >
        {submitting ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send size={18} /> Send Quote Request
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        We respond within 1 business day. No spam, no pressure.
      </p>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-4 py-3 rounded-xl border text-sm text-brand-black placeholder:text-gray-400 outline-none transition-all bg-white ${
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-gray-200 focus:border-brand-black focus:ring-2 focus:ring-gray-100"
  }`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-brand-black mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
