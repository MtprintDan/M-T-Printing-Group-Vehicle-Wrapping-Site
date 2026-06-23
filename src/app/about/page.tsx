import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutPageContent from "@/components/AboutPageContent";

export const metadata: Metadata = {
  title: "About | M&T Printing Group",
  description:
    "Learn about M&T Printing Group — Ontario's top print provider for over 56 years, delivering premium vehicle wraps and fleet branding solutions.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-[144px]">
        <AboutPageContent />
      </main>
      <Footer />
    </>
  );
}
