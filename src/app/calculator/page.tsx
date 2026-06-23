import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Calculator from "@/components/Calculator";

export const metadata: Metadata = {
  title: "Pricing Calculator | M&T Printing Group",
  description:
    "Build your custom vehicle wrap quote in minutes. Select your vehicle, package, and add-ons for an instant estimate.",
};

export default function CalculatorPage() {
  return (
    <>
      <Navbar />
      <main>
        <Calculator />
      </main>
      <Footer />
    </>
  );
}
