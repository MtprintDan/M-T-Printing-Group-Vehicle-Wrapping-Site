import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import PricingOverview from "@/components/sections/PricingOverview";
import VehicleSizeSearch from "@/components/sections/VehicleSizeSearch";
import GallerySection from "@/components/sections/GallerySection";
import SpecialtyServices from "@/components/sections/SpecialtyServices";
import Industries from "@/components/sections/Industries";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <PricingOverview />
        <VehicleSizeSearch />
        <GallerySection />
        <SpecialtyServices />
        <Industries />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
