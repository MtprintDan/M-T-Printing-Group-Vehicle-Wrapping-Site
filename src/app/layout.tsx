import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "M&T Printing Group | Fleet Vehicle Wraps",
  description:
    "Professional vehicle graphics and fleet branding starting under $699. Serving commercial fleets across the region with premium vinyl wraps and signage.",
  keywords:
    "vehicle wraps, fleet graphics, vinyl wraps, commercial vehicle branding, truck wraps, van wraps",
  openGraph: {
    title: "M&T Printing Group | Fleet Vehicle Wraps",
    description: "Fleet Branding Made Simple. Professional vehicle graphics starting under $699.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
