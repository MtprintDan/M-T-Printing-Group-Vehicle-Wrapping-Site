import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WrapProcessContent from "@/components/WrapProcessContent";

export const metadata: Metadata = {
  title: "The Wrap Process | M&T Printing Group",
  description:
    "Learn how our professional vehicle wrap process works — from your initial quote request to certified installation and final delivery.",
};

export default function WrapProcessPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-[144px]">
        <WrapProcessContent />
      </main>
      <Footer />
    </>
  );
}
