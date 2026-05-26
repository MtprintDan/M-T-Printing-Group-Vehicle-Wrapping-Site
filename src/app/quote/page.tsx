import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuotePageContent from "@/components/QuotePageContent";

export const metadata: Metadata = {
  title: "Request a Quote | M&T Printing Group",
  description:
    "Get a detailed vehicle wrap quote for your fleet. Fill out the form and we'll respond within one business day.",
};

export default function QuotePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-20">
        <Suspense fallback={<div className="py-20 text-center text-gray-400">Loading…</div>}>
          <QuotePageContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
