import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SpecialtyPageContent from "@/components/SpecialtyPageContent";

export const metadata: Metadata = {
  title: "Specialty Services | M&T Printing Group",
  description:
    "Trailer wraps, box trucks, wall graphics, window perf, installation-only, and design services — M&T Printing Group handles it all.",
};

export default function SpecialtyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-[144px]">
        <SpecialtyPageContent />
      </main>
      <Footer />
    </>
  );
}
