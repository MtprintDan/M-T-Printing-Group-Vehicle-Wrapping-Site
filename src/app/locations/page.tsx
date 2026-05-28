import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationsPageContent from "@/components/LocationsPageContent";

export const metadata: Metadata = {
  title: "Our Locations | M&T Printing Group",
  description:
    "Find an M&T Printing Group vehicle wrap location near you. Serving commercial fleet operators across southern Ontario with 4 locations.",
};

export default function LocationsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-[144px]">
        <LocationsPageContent />
      </main>
      <Footer />
    </>
  );
}
