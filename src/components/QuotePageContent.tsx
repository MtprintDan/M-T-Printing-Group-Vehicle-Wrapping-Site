"use client";

import { useSearchParams } from "next/navigation";
import QuoteForm from "./QuoteForm";

export default function QuotePageContent() {
  const params = useSearchParams();
  const total = params.get("total") ? Number(params.get("total")) : undefined;
  const vehicle = params.get("vehicle") || undefined;
  const pkg = params.get("package") || undefined;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#EC008C] mb-3">
          Get a Quote
        </p>
        <h1 className="text-4xl font-black text-brand-black mb-3">
          Tell us about your project
        </h1>
        <p className="text-gray-500 text-lg font-light">
          Fill out the form below and we&apos;ll send you a detailed quote within one business day.
        </p>
      </div>

      <QuoteForm
        defaultTotal={total}
        defaultVehicle={vehicle}
        defaultPackage={pkg}
      />
    </div>
  );
}
